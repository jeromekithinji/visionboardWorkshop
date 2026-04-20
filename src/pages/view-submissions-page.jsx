import { useEffect, useState } from 'react'
import './view-submissions-page.css'

export function ViewSubmissionsPage () {
  const [submissions, setSubmissions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const handleDownloadSpreadsheet = () => {
    if (!submissions.length) {
      return
    }

    const headers = [
      'ID',
      'Full Name',
      'Email Address',
      'Phone Number',
      'Submitted At',
    ]

    const rows = submissions.map((submission) => [
      submission.id,
      submission.full_name,
      submission.email_address,
      submission.phone_number || '',
      new Date(submission.created_at).toLocaleString(),
    ])

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(','),
      )
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const timestamp = new Date().toISOString().replaceAll(':', '-')
    const link = document.createElement('a')
    link.href = url
    link.download = `visionBoard-Submisssions-${timestamp}.csv`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  useEffect(() => {
    document.title = 'Workshop Form Submissions'

    const fetchSubmissions = async () => {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch('/api/registrations')

        if (!response.ok) {
          throw new Error('Could not load submissions')
        }

        const contentType = response.headers.get('content-type') || ''
        if (!contentType.includes('application/json')) {
          const raw = await response.text()
          throw new Error(
            `Expected JSON response but received ${contentType || 'unknown'}: ${raw.slice(0, 80)}...`,
          )
        }

        const data = await response.json()
        setSubmissions(data.submissions || [])
      } catch (err) {
        setError(err.message || 'Could not load submissions')
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubmissions()
  }, [])

  return (
    <main className='submissions-page'>
      <div className='submissions-header'>
        <h1>Workshop Registrations</h1>
        <button
          type='button'
          className='download-button'
          onClick={handleDownloadSpreadsheet}
          disabled={!submissions.length}
        >
          Download Spreadsheet
        </button>
      </div>
      {isLoading && <p className='submissions-status'>Loading submissions...</p>}
      {error && !isLoading && <p className='submissions-error'>{error}</p>}
      {!isLoading && !error && (
        <div className='submissions-table-wrap'>
          <table className='submissions-table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {submissions.length === 0 && (
                <tr>
                  <td colSpan='5'>No submissions yet.</td>
                </tr>
              )}
              {submissions.map((submission) => (
                <tr key={submission.id}>
                  <td>{submission.id}</td>
                  <td>{submission.full_name}</td>
                  <td>{submission.email_address}</td>
                  <td>{submission.phone_number || '-'}</td>
                  <td>{new Date(submission.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}

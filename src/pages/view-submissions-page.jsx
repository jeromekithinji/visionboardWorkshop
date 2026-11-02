import { useEffect, useState } from 'react'
import './view-submissions-page.css'

const workshopGroups = [
  {
    label: 'August Workshop',
    matcher: 'August',
  },
  {
    label: 'December Workshop',
    matcher: 'December',
  },
]

const headers = [
  'ID',
  'Full Name',
  'Email Address',
  'Phone Number',
  'Workshop Day',
  'Submitted At',
]

function getSubmissionRow (submission) {
  return [
    submission.id,
    submission.full_name,
    submission.email_address,
    submission.phone_number || '',
    submission.workshop_day || '',
    new Date(submission.created_at).toLocaleString(),
  ]
}

function escapeXml (value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function getWorksheetXml (group) {
  const rows = [headers, ...group.submissions.map(getSubmissionRow)]
    .map((row) => `
      <Row>
        ${row
          .map((value) => `
            <Cell>
              <Data ss:Type="String">${escapeXml(value)}</Data>
            </Cell>
          `)
          .join('')}
      </Row>
    `)
    .join('')

  return `
    <Worksheet ss:Name="${escapeXml(group.label)}">
      <Table>${rows}</Table>
    </Worksheet>
  `
}

function getWorkbookXml (submissionGroups) {
  return `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook
  xmlns="urn:schemas-microsoft-com:office:spreadsheet"
  xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
>
  ${submissionGroups.map(getWorksheetXml).join('')}
</Workbook>`
}

export function ViewSubmissionsPage () {
  const [submissions, setSubmissions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const groupedSubmissions = workshopGroups.map((group) => ({
    ...group,
    submissions: submissions.filter((submission) =>
      submission.workshop_day?.includes(group.matcher),
    ),
  }))

  const otherSubmissions = submissions.filter((submission) => {
    const workshopDay = submission.workshop_day || ''
    return !workshopGroups.some((group) => workshopDay.includes(group.matcher))
  })

  const submissionGroups = otherSubmissions.length
    ? [
        ...groupedSubmissions,
        {
          label: 'Other Workshops',
          submissions: otherSubmissions,
        },
      ]
    : groupedSubmissions

  const renderSubmissionRows = (groupSubmissions) => {
    if (!groupSubmissions.length) {
      return (
        <tr>
          <td colSpan='6'>No registrations yet.</td>
        </tr>
      )
    }

    return groupSubmissions.map((submission) => (
      <tr key={submission.id}>
        <td>{submission.id}</td>
        <td>{submission.full_name}</td>
        <td>{submission.email_address}</td>
        <td>{submission.phone_number || '-'}</td>
        <td>{submission.workshop_day || '-'}</td>
        <td>{new Date(submission.created_at).toLocaleString()}</td>
      </tr>
    ))
  }

  const handleDownloadSpreadsheet = () => {
    if (!submissions.length) {
      return
    }

    const workbookXml = getWorkbookXml(submissionGroups)
    const blob = new Blob([workbookXml], {
      type: 'application/vnd.ms-excel;charset=utf-8;',
    })
    const url = URL.createObjectURL(blob)
    const timestamp = new Date().toISOString().replaceAll(':', '-')
    const link = document.createElement('a')

    link.href = url
    link.download = `visionBoard-Submisssions-${timestamp}.xls`
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
        const response = await fetch('/api/registrations/view?format=json')

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
        <div className='submissions-groups'>
          {submissionGroups.map((group) => (
            <details className='submissions-group' key={group.label} open>
              <summary>
                <span>{group.label}</span>
                <span>{group.submissions.length} registrations</span>
              </summary>
              <div className='submissions-table-wrap'>
                <table className='submissions-table'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Full Name</th>
                      <th>Email Address</th>
                      <th>Phone Number</th>
                      <th>Workshop Day</th>
                      <th>Submitted At</th>
                    </tr>
                  </thead>
                  <tbody>{renderSubmissionRows(group.submissions)}</tbody>
                </table>
              </div>
            </details>
          ))}
        </div>
      )}
    </main>
  )
}

import { escapeHtml, getRegistrations } from '../_registrations-shared.js'

export default async function handler (req, res) {
	if (req.method !== 'GET') {
		res.setHeader('Allow', 'GET')
		res.status(405).send('Method not allowed')
		return
	}

	try {
		const submissions = await getRegistrations()

		if (req.query?.format === 'json') {
			res.status(200).json({ submissions })
			return
		}

		const rows = submissions
			.map((row) => `
        <tr>
          <td>${row.id}</td>
          <td>${escapeHtml(row.full_name)}</td>
          <td>${escapeHtml(row.email_address)}</td>
          <td>${escapeHtml(row.phone_number || '-')}</td>
          <td>${new Date(row.created_at).toLocaleString()}</td>
        </tr>
      `)
			.join('')

		res.setHeader('Content-Type', 'text/html; charset=utf-8')
		res.status(200).send(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Workshop Registrations</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; background: #f7f7fa; color: #1f1f2f; }
            h1 { margin: 0 0 14px; }
            table { border-collapse: collapse; width: 100%; background: white; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            th { background: #171a3b; color: #fff; }
            tr:nth-child(even) { background: #f8f8ff; }
          </style>
        </head>
        <body>
          <h1>Workshop Registrations</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Submitted At</th>
              </tr>
            </thead>
            <tbody>${rows || '<tr><td colspan="5">No submissions yet.</td></tr>'}</tbody>
          </table>
        </body>
      </html>
    `)
	} catch (error) {
		console.error('Failed to render registrations page', error)
		res.status(500).send('Could not render registrations')
	}
}


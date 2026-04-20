import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { ensureRegistrationsTable, pool } from './db.js'

dotenv.config()

const app = express()
const port = Number(process.env.PORT) || 4000

function escapeHtml (value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/registrations', async (req, res) => {
  const { fullName, emailAddress, phoneNumber } = req.body ?? {}

  if (!fullName || !emailAddress) {
    res.status(400).json({
      message: 'fullName and emailAddress are required',
    })
    return
  }

  try {
    const result = await pool.query(
      `
      INSERT INTO registrations (full_name, email_address, phone_number)
      VALUES ($1, $2, $3)
      RETURNING id, full_name, email_address, phone_number, created_at
      `,
      [fullName.trim(), emailAddress.trim(), phoneNumber?.trim() || null],
    )

    res.status(201).json({
      message: 'Registration submitted successfully',
      registration: result.rows[0],
    })
  } catch (error) {
    console.error('Failed to create registration', error)
    res.status(500).json({
      message: 'Could not submit registration',
    })
  }
})

app.get('/api/registrations', async (_req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT id, full_name, email_address, phone_number, created_at
      FROM registrations
      ORDER BY created_at DESC
      `,
    )

    res.json({
      submissions: result.rows,
    })
  } catch (error) {
    console.error('Failed to fetch registrations', error)
    res.status(500).json({
      message: 'Could not fetch registrations',
    })
  }
})

app.get('/api/registrations/view', async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT id, full_name, email_address, phone_number, created_at
      FROM registrations
      ORDER BY created_at DESC
      `,
    )

    if (req.query.format === 'json') {
      res.json({
        submissions: result.rows,
      })
      return
    }

    const rows = result.rows
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

    res.type('html').send(`
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
})

async function startServer () {
  await ensureRegistrationsTable()
  app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`)
  })
}

startServer().catch((error) => {
  console.error('Failed to start API server', error)
  process.exit(1)
})

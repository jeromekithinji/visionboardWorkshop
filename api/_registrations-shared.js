import { ensureRegistrationsTable, pool } from './_db.js'

export function escapeHtml (value) {
	return String(value)
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#039;')
}

export async function getRegistrations () {
	await ensureRegistrationsTable()
	const result = await pool.query(
		`
      SELECT id, full_name, email_address, phone_number, workshop_day, created_at
      FROM registrations
      ORDER BY created_at DESC
      `,
	)
	return result.rows
}

export async function createRegistration ({
	fullName,
	emailAddress,
	phoneNumber,
	workshopDay,
}) {
	await ensureRegistrationsTable()
	const result = await pool.query(
		`
      INSERT INTO registrations (
        full_name,
        email_address,
        phone_number,
        workshop_day
      )
      VALUES ($1, $2, $3, $4)
      RETURNING id, full_name, email_address, phone_number, workshop_day, created_at
      `,
		[
			fullName.trim(),
			emailAddress.trim(),
			phoneNumber?.trim() || null,
			workshopDay.trim(),
		],
	)
	return result.rows[0]
}


import pg from 'pg'

const { Pool } = pg

if (!process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL is required to connect to Neon Postgres')
}

const globalForDb = globalThis

export const pool =
	globalForDb.__neonPool ||
	new Pool({
		connectionString: process.env.DATABASE_URL,
		ssl: {
			rejectUnauthorized: false,
		},
	})

if (!globalForDb.__neonPool) {
	globalForDb.__neonPool = pool
}

export async function ensureRegistrationsTable () {
	await pool.query(`
		CREATE TABLE IF NOT EXISTS registrations (
			id BIGSERIAL PRIMARY KEY,
			full_name TEXT NOT NULL,
			email_address TEXT NOT NULL,
			phone_number TEXT,
			created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
		);
	`)
}


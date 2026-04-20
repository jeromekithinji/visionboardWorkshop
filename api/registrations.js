import { createRegistration, getRegistrations } from './_registrations-shared.js'

export default async function handler (req, res) {
	if (req.method === 'POST') {
		const { fullName, emailAddress, phoneNumber } = req.body ?? {}

		if (!fullName || !emailAddress) {
			res.status(400).json({
				message: 'fullName and emailAddress are required',
			})
			return
		}

		try {
			const registration = await createRegistration({
				fullName,
				emailAddress,
				phoneNumber,
			})
			res.status(201).json({
				message: 'Registration submitted successfully',
				registration,
			})
			return
		} catch (error) {
			console.error('Failed to create registration', error)
			res.status(500).json({
				message: 'Could not submit registration',
			})
			return
		}
	}

	if (req.method === 'GET') {
		try {
			const submissions = await getRegistrations()
			res.status(200).json({ submissions })
			return
		} catch (error) {
			console.error('Failed to fetch registrations', error)
			res.status(500).json({
				message: 'Could not fetch registrations',
			})
			return
		}
	}

	res.setHeader('Allow', 'GET, POST')
	res.status(405).json({ message: 'Method not allowed' })
}


import crypto from 'crypto'

export default async (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  try {
    const AUDIENCE_ID = process.env.NEXT_PUBLIC_REACT_APP_MAILCHIMP_LIST_ID
    const API_KEY = process.env.NEXT_PUBLIC_REACT_APP_MAILCHIMP_API_KEY

    const DATACENTER = API_KEY.split('-')[1]

    const subscriberHash = crypto.createHash('md5').update(email).digest('hex')

    const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${subscriberHash}`

    const response = await fetch(url, {
      body: JSON.stringify({
        email: email,
        status_if_new: 'subscribed',
      }),
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `apikey ${API_KEY}`,
      },
    })
    if (response.status >= 400) {
      return res.status(response.status).json({
        error: JSON.stringify(response.statusText),
      })
    }

    return res.status(201).json({ error: '' })
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() })
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
}

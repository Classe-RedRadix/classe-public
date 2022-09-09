import { saveContactRequest } from '../../../firebase/client'

export default async (req, res) => {
  try {
    const result = await saveContactRequest(req.body)

    if (result.success) {
      res.status(204).send()
      return
    }

    res.status(500).json({
      success: false,
      error: result.error,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    })
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
}

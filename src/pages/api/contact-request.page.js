import { saveContactRequest } from '../../../firebase/client'

export default (req, res) => {
  try {
    saveContactRequest(req.body)

    res.status(200).json({
      error: false,
      message: 'Contact request saved successfully',
    })
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    })
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
}

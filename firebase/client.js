import { initializeApp, getApps } from 'firebase/app'
import { getAuth, signInAnonymously } from 'firebase/auth'
import { getFirestore, collection, doc, addDoc } from 'firebase/firestore'

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: String(process.env.MESSAGING_SENDER_ID),
  appId: process.env.APP_ID,
}

// Initialize the app only if there's no previous instance of it. This is to
// prevent live reloading errors during development
getApps().length === 0 && initializeApp(config)

const auth = getAuth()

const firestore = getFirestore()

/**
 * Saves a contact request into Firestore. It also checks if the user is
 * logged in anonymously and, if it's not, signs it in so the contact request
 * can be stored correctly.
 *
 * @param { Object } details Contact details
 * @param { string } details.name - User name
 * @param { string[] } details.interestedIn - Things that the user is interested in
 * @param { string } details.email - User email
 * @param { string } details.subscribeToNewsletter - Specify if the user wants to enroll to the newsletter
 * @param { boolean } details.viewed - Indicate if the request has been seen in the dashboard (always false)
 * @param { Date } details.createdAt - Date when the request has been created
 *
 * @returns a promise with the contact request result
 */
const saveContactRequest = async details => {
  // We only sign in the user anonymously if there's no user
  // The anonymous authentication token never expires:
  //  https://stackoverflow.com/questions/41733137/firebase-auth-anonymous-login#comment70661655_41733137
  if (auth.currentUser === null) {
    // We must sign the requests anonymously to successfully store the contact requests
    // as a security measure.
    // Once the user is signed in, there's no need to do anything else.
    await signInAnonymously(auth)
  }

  try {
    // TODO Hot-implementation due to time, review it
    const emailTrigger = {
      to: ['admin@classe.dev'],
      message: {
        subject: 'Nueva solicitud de información Cursos Classe',
        html: `<ul>
            <li><b>Nombre</b>: ${details.name}</li>
            <li><b>E-mail</b>: ${details.email}</li>
            <li><b>Intereses</b>: ${details.interestedIn.join(', ')}</li>
            <li><b>Tipo de usuario</b>: ${details.userType}</li>
          </ul>`,
      },
    }
    const docRef = await addDoc(collection(firestore, 'contactRequests'), {
      ...details,
      ...emailTrigger,
    })

    if (docRef.id) {
      return Promise.resolve({ success: true })
    }

    const error = new Error('Something unexpected happened')

    return Promise.reject({ success: false, error })
  } catch (error) {
    return Promise.reject({ success: false, error })
  }
}

export { saveContactRequest }

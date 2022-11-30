import { CONTACT_PAGE } from '../constants'
import { withKonami, withMenu } from '../hocs'

const Contact = withKonami(({ interestedIn }) => {
  return withMenu(CONTACT_PAGE, {
    useMenuConfig: { defaultIsContactOpen: true },
    useContactFormConfig: { interestedIn },
  })
})

Contact.getInitialProps = async ({ query }) => {
  // if `interestedIn !== undefined` means that the user came here by clicking on
  // a course's `Contact us` link
  const interestedIn = query['interested-in']

  return {
    interestedIn,
  }
}

export default Contact

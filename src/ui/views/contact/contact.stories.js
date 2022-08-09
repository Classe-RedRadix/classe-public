import React from 'react'
import Contact from './Contact'
import useScrambleText from '../../../hooks/useScrambleText'
import { COURSES } from '../../../data'

export default {
  title: 'Views/Contact',
  component: Contact,
}

export const contact = () => {
  useScrambleText()

  return (
    <Contact
      isBlack
      courses={COURSES}
      contactFormParams={{
        email: '',
        onEmailChange: () => {},
        userType: '',
        onUserTypeChange: () => {},
        interestedInOptions: [],
        onInterestedInOptionChange: () => {},
        name: '',
        onNameChange: () => {},
        saveToFirebase: () => {},
        clearForm: () => {},
      }}
    />
  )
}

import { useRouter } from 'next/router'
import { useState } from 'react'

import { Cookies } from '../../ui/views'
import { COURSES } from '../../data'
import {
  useBackgroundChange,
  useScrambleText,
  useContactForm,
} from '../../hooks'

const CookiesView = () => {
  const router = useRouter()
  const interestedIn = router.query['interested-in']

  const [isBlack, setIsBlack] = useState(false)
  const [isFluor, setIsFluor] = useState(false)

  const {
    email,
    onEmailChange,
    userType,
    onUserTypeChange,
    interestedInOptions,
    onInterestedInOptionChange,
    name,
    onNameChange,
    termsAndConditions,
    toggleTermsAndConditions,
    saveToFirebase: saveContactFormToFirebase,
    errors,
    clearForm,
  } = useContactForm(interestedIn)

  useBackgroundChange(setIsBlack, setIsFluor)
  useScrambleText()

  const onContactFormSuccess = () => {
    // TODO: handle success contact saving into Firebase
  }
  const handleContactFormSubmit = event => {
    event.preventDefault()

    try {
      saveContactFormToFirebase({ onSuccess: onContactFormSuccess })
    } catch (error) {}
  }

  // NOTE: we are using a shared contact form state. If the home contact form
  // changes, so it will the modal contact form, and vice versa
  const contactFormParams = {
    email,
    onEmailChange,
    userType,
    onUserTypeChange,
    interestedInOptions,
    onInterestedInOptionChange,
    name,
    termsAndConditions,
    errors,
    toggleTermsAndConditions,
    onNameChange,
    saveToFirebase: saveContactFormToFirebase,
    clearForm,
  }

  return (
    <Cookies
      isBlack={isBlack}
      isFluor={isFluor}
      onContactFormSubmit={handleContactFormSubmit}
      contactFormParams={contactFormParams}
      courses={COURSES}
    />
  )
}

export default CookiesView

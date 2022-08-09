import React, { useState } from 'react'

import CookiesPolicy from './Cookies'
import { useBackgroundChange, useScrambleText } from '../../../hooks'

import { COURSES } from '../../../data'

export default {
  title: 'Views/Legal/Cookies Policy',
  component: CookiesPolicy,
}

export const _CookiesPolicy = () => {
  const [isBlack, setIsBlack] = useState(false)
  const [isFluor, setIsFluor] = useState(false)

  useBackgroundChange(setIsBlack, setIsFluor)
  useScrambleText()
  return (
    <CookiesPolicy
      isBlack={isBlack}
      isFluor={isFluor}
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
      courses={COURSES}
    ></CookiesPolicy>
  )
}

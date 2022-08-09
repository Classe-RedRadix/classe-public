import React, { useState } from 'react'

import LegalTerms from './LegalTerms'
import { useBackgroundChange, useScrambleText } from '../../../hooks'

import { COURSES } from '../../../data'

export default {
  title: 'Views/Legal/Legal Terms',
  component: LegalTerms,
}

export const _LegalTerms = () => {
  const [isBlack, setIsBlack] = useState(false)
  const [isFluor, setIsFluor] = useState(false)

  useBackgroundChange(setIsBlack, setIsFluor)
  useScrambleText()
  return (
    <LegalTerms
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
    ></LegalTerms>
  )
}

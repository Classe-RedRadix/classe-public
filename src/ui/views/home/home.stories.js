import React, { useState } from 'react'
import Home from './Home'
import {
  useTranslations,
  useViewportHeight,
  useDetectMobile,
  useBackgroundChange,
  useScrambleText,
} from '../../../hooks'

import CompanyLogo from '/public/images/logos/hugo-boss.svg'
import { COURSES } from '../../../data'

export default {
  title: 'Views/Home',
  component: Home,
}

export const home = () => {
  const t = useTranslations()
  const [isLock, setIsLock] = useState(false)
  const [isBlack, setIsBlack] = useState(false)
  const [isFluor, setIsFluor] = useState(false)
  useViewportHeight()
  useDetectMobile()
  useBackgroundChange(setIsBlack, setIsFluor)
  useScrambleText()

  const fakeLogosArray = new Array(15).fill(null)
  const logos = fakeLogosArray.map(() => <CompanyLogo viewBox="0 0 125 45" />)

  const fakeFaqsArray = new Array(7).fill(null)
  const faqsList = fakeFaqsArray.map(() => ({
    title: '¿Lorem ipsum dolor sit amet, consectetur adipiscing eli?',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur nulla sed libero dui. Ac molestie diam egestas magnis auctor vitae. Magna scelerisque blandit sed vulputate accumsan pulvinar enim scelerisque. Malesuada.',
  }))

  const dates = [
    {
      day: '01',
      month: 'Enero',
      courses: [
        {
          title: 'Js Pro',
          start: '16',
          finish: '27',
          to: '/',
          id: 'js-pro',
        },
        {
          title: 'Data',
          start: '16',
          finish: '27',
          to: '/',
          id: 'data',
        },
      ],
    },
    {
      day: '19',
      month: 'Agosto',
      courses: [
        {
          title: 'Redux',
          start: '16',
          finish: '27',
          to: '/',
          id: 'redux',
        },
      ],
    },
  ]

  return (
    <Home
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
      isBlack={isBlack}
      isFluor={isFluor}
      isLock={isLock}
      courses={COURSES}
      dates={dates}
      logos={logos}
      faqsList={faqsList}
    />
  )
}

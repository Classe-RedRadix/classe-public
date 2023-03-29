import { useRouter } from 'next/router'
import { useState } from 'react'

import BME from '/public/images/logos/bme.svg'
import Coches from '/public/images/logos/coches.svg'
import EDreams from '/public/images/logos/edreams.svg'
import ElConfidencial from '/public/images/logos/el-confidencial.svg'
import GrupoSM from '/public/images/logos/grupo-sm.svg'
import ING from '/public/images/logos/ing.svg'
import LastMinute from '/public/images/logos/last-minute.svg'
import LibertySeguros from '/public/images/logos/liberty-seguros.svg'
import OxfordUniversity from '/public/images/logos/oxford-university.svg'
import PharmaAdvisors from '/public/images/logos/pharma-advisors.svg'
import SecuritasDirect from '/public/images/logos/securitas-direct.svg'
import Solera from '/public/images/logos/solera.svg'
import Telefonica from '/public/images/logos/telefonica.svg'
import Ticketea from '/public/images/logos/ticketea.svg'
import UnidadEditorial from '/public/images/logos/unidad-editorial.svg'

import { COURSES } from '../data'

import {
  useViewportHeight,
  useDetectMobile,
  useBackgroundChange,
  useScrambleText,
  useContactForm,
  useTranslations,
} from '../hooks'
import { withKonami } from '../hocs'
import { Home as HomeUI } from '../ui/views'

const Home = () => {
  const router = useRouter()
  const interestedIn = router.query['interested-in']

  const [isLock, setIsLock] = useState(false)
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
    saveToMailChimp,
  } = useContactForm(interestedIn)

  useViewportHeight()
  useDetectMobile()
  useBackgroundChange(setIsBlack, setIsFluor)
  useScrambleText()

  const formatMessage = useTranslations()

  const courses = COURSES.map(course => ({
    title: formatMessage(course.information.title),
    href: `/cursos/${course.id}`,
  }))

  const logos = [
    BME,
    UnidadEditorial,
    ING,
    Solera,
    EDreams,
    PharmaAdvisors,
    LastMinute,
    LibertySeguros,
    Coches,
    SecuritasDirect,
    GrupoSM,
    Telefonica,
    Ticketea,
    ElConfidencial,
    OxfordUniversity,
  ]

  const faqsList = [
    {
      title: formatMessage('faqs:faq1-title'),
      description: formatMessage('faqs:faq1-description'),
    },
    {
      title: formatMessage('faqs:faq2-title'),
      description: formatMessage('faqs:faq2-description'),
    },
    {
      title: formatMessage('faqs:faq3-title'),
      description: formatMessage('faqs:faq3-description'),
    },
    {
      title: formatMessage('faqs:faq4-title'),
      description: formatMessage('faqs:faq4-description'),
    },
    {
      title: formatMessage('faqs:faq5-title'),
      description: formatMessage('faqs:faq5-description'),
    },
    {
      title: formatMessage('faqs:faq6-title'),
      description: formatMessage('faqs:faq6-description'),
    },
    {
      title: formatMessage('faqs:faq7-title'),
      description: formatMessage('faqs:faq7-description'),
    },
    {
      title: formatMessage('faqs:faq8-title'),
      description: formatMessage('faqs:faq8-description'),
    },
    {
      title: formatMessage('faqs:faq9-title'),
      description: formatMessage('faqs:faq9-description'),
    },
    {
      title: formatMessage('faqs:faq10-title'),
      description: formatMessage('faqs:faq10-description'),
    },
    {
      title: formatMessage('faqs:faq11-title'),
      description: formatMessage('faqs:faq11-description'),
    },
  ]

  const dates = [
    {
      day: '01',
      month: 'Enero',
      courses: [
        {
          title: 'Js Pro',
          start: '16',
          finish: '27',
          to: '/contacto?interested-in=js-pro',
          id: 'js-pro',
        },
        {
          title: 'Data',
          start: '16',
          finish: '27',
          to: '/contacto?interested-in=data',
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
          to: '/contacto?interested-in=redux',
          id: 'redux',
        },
      ],
    },
  ]

  const onContactFormSuccess = () => {
    // TODO: handle success contact saving into Firebase
  }

  const handleContactFormSubmit = event => {
    event.preventDefault()

    try {
      saveToMailChimp()
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
    <HomeUI
      isBlack={isBlack}
      isFluor={isFluor}
      isLock={isLock}
      courses={COURSES}
      dates={dates}
      logos={logos}
      faqsList={faqsList}
      onContactFormSubmit={handleContactFormSubmit}
      contactFormParams={contactFormParams}
    />
  )
}

export default withKonami(Home)

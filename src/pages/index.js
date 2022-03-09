import { useState } from 'react'
import { useRouter } from 'next/router'

import CompanyLogo from '/public/images/demo-company.svg'

import InfoHead from 'InfoHead'
import { COURSES } from '../data'
import { Home as HomeUI } from '../ui/views'
import {
  useViewportHeight,
  useDetectMobile,
  useBackgroundChange,
  useScrambleText,
  useContactForm,
  useKonami,
  useTranslations,
  useSchema,
  useBreadcrumbListSchema,
} from '../hooks'

const Home = () => {
  const router = useRouter()
  const interestedIn = router.query['interested-in']

  const [isLock, setIsLock] = useState(false)
  const [isBlack, setIsBlack] = useState(false)
  const [isFluor, setIsFluor] = useState(false)

  useKonami()

  const {
    email,
    onEmailChange,
    userType,
    onUserTypeChange,
    interestedInOptions,
    onInterestedInOptionChange,
    name,
    onNameChange,
    saveToFirebase: saveContactFormToFirebase,
  } = useContactForm(interestedIn)

  useViewportHeight()
  useDetectMobile()
  useBackgroundChange(setIsBlack, setIsFluor)
  useScrambleText()

  const courses = COURSES.map(course => ({
    title: course.information.title,
    href: `/courses/${course.id}`,
  }))

  const fakeLogosArray = new Array(15).fill(null)
  const logos = fakeLogosArray.map(() => <img src={CompanyLogo} />)
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
          to: '/contact?interested-in=js-pro',
          id: 'js-pro',
        },
        {
          title: 'Data',
          start: '16',
          finish: '27',
          to: '/contact?interested-in=data',
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
          to: '/contact?interested-in=redux',
          id: 'redux',
        },
      ],
    },
  ]

  const formatMessage = useTranslations()
  const { educationalOrganizationSchema, webSiteSchema } = useSchema()
  const { breadcrumbListSchema } = useBreadcrumbListSchema([
    {
      name: formatMessage('schema-breadcrumb-list:home-name'),
      url: formatMessage('url:root'),
    },
  ])

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
    onNameChange,
    saveToFirebase: saveContactFormToFirebase,
  }

  console.log(educationalOrganizationSchema, webSiteSchema)

  return (
    <>
      <InfoHead
        title={formatMessage('info-head-home:title')}
        description={formatMessage('info-head-home:description')}
        url={formatMessage('url:root')}
      >
        <script type="application/ld+json">
          [ {`${educationalOrganizationSchema}`}, {`${webSiteSchema}`},{' '}
          {`${breadcrumbListSchema}`}]
        </script>
      </InfoHead>
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
    </>
  )
}

export default Home

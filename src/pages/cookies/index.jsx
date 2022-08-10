import { useRouter } from 'next/router'
import { useState } from 'react'

import InfoHead from '../../InfoHead'

import CookiesPolicy from '../../ui/views/cookies/Cookies'
import { COURSES } from '../../data'
import {
  useBackgroundChange,
  useScrambleText,
  useContactForm,
  useTranslations,
  useBreadcrumbListSchema,
} from '../../hooks'
const CookiesPolicyView = () => {
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
  } = useContactForm(interestedIn)

  useBackgroundChange(setIsBlack, setIsFluor)
  useScrambleText()

  const formatMessage = useTranslations()

  const { breadcrumbListSchema } = useBreadcrumbListSchema([
    {
      name: formatMessage('schema-breadcrumb-list:cookies-policy-name'),
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
    termsAndConditions,
    errors,
    toggleTermsAndConditions,
    onNameChange,
    saveToFirebase: saveContactFormToFirebase,
  }

  return (
    <>
      <InfoHead
        title={formatMessage('info-head-cookies-policy:title')}
        description={formatMessage('info-head-cookies-policy:description')}
        url={formatMessage('url:root')}
        noindex
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `${breadcrumbListSchema}`,
          }}
        />
      </InfoHead>
      <CookiesPolicy
        isBlack={isBlack}
        isFluor={isFluor}
        onContactFormSubmit={handleContactFormSubmit}
        contactFormParams={contactFormParams}
        courses={COURSES}
      />
    </>
  )
}

export default CookiesPolicyView

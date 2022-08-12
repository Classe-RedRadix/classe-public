import { useRouter } from 'next/router'
import { useState } from 'react'

import InfoHead from '../../InfoHead'

import { LegalTerms } from '../../ui/views'
import { COURSES } from '../../data'
import {
  useBackgroundChange,
  useScrambleText,
  useContactForm,
  useTranslations,
  useBreadcrumbListSchema,
} from '../../hooks'

const LegalTermsView = () => {
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
      name: formatMessage('schema-breadcrumb-list:legal-terms-name'),
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
        title={formatMessage('info-head-legal-terms:title')}
        description={formatMessage('info-head-legal-terms:description')}
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
      <LegalTerms
        isBlack={isBlack}
        isFluor={isFluor}
        onContactFormSubmit={handleContactFormSubmit}
        contactFormParams={contactFormParams}
        courses={COURSES}
      />
    </>
  )
}

export default LegalTermsView

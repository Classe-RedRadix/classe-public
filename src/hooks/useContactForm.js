import { useState, useEffect } from 'react'

import { useTranslations } from '../hooks'

import { COURSES } from '../data'

import useInput from './useInput'
import useRadio from './useRadio'
import useCheckbox from './useCheckbox'

/**
 * The contact forms are vary similar. Since they use almost the same fields,
 * we provide a custom hook that exposes all the contact form values, input
 * handlers and a method to store the contact form easily into Firebase.
 */
const useContactForm = interestedInCourseId => {
  const formatMessage = useTranslations()

  // Form values
  const [name, onNameChange, setName] = useInput()
  const [email, onEmailChange, setEmail] = useInput()
  const [userType, onUserTypeChange, setUserType] = useRadio('company')
  const [interestedInOptions, setInterestedInOptions] = useState(() =>
    COURSES.map(course => ({
      checked: course.id === interestedInCourseId,
      id: course.id,
      label: formatMessage(course.information.title),
    })),
  )

  // NOTE: we are not sending this value, it's just a form control
  const [termsAndConditions, toggleTermsAndConditions, setTermsAndConditions] =
    useCheckbox(false)

  // States to know the request status
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState(null)
  const [isSaved, setIsSaved] = useState(false)
  const [errors, setErrors] = useState({})

  const clearForm = () => {
    setName('')
    setEmail('')
    setUserType('company')
    setInterestedInOptions(
      COURSES.map(course => ({
        checked: course.id === interestedInCourseId,
        id: course.id,
        label: formatMessage(course.information.title),
      })),
    )
    setTermsAndConditions(false)
    setIsLoading(false)
    setIsError(false)
    setError(null)
    setIsSaved(false)
    setErrors({})
  }

  const removeError = key => {
    if (key in errors) {
      setErrors(prev => {
        const validationErrors = { ...prev }
        delete validationErrors[key]
        return validationErrors
      })
    }
  }

  const onInterestedInOptionChange = interestedInOption => {
    setInterestedInOptions(interestedInOptions =>
      interestedInOptions.map(option =>
        Object.assign({}, option, {
          checked:
            option.id === interestedInOption.id
              ? !option.checked
              : option.checked,
        }),
      ),
    )

    removeError('optionNoSelected')
  }

  useEffect(() => {
    if (name.trimRight() !== '') {
      removeError('nameNoSelected')
    }
  }, [name])

  useEffect(() => {
    if (email.trimRight() !== '') {
      removeError('emailNoSelected')
    }
  }, [email])

  useEffect(() => {
    if (termsAndConditions) {
      removeError('termsNoSelected')
    }
  }, [termsAndConditions])

  /**
   *
   * @param {Object} config - Additional config
   * @callback config.onSuccess - Executed after storing the contact details
   * @callback config.onError - Executed if the storing throws an error
   * @callback config.isMenuContact - Indicates if we are saving the full form
   */
  const saveToFirebase = async ({
    onSuccess,
    onError,
    isMenuContact = false,
  }) => {
    setErrors({})

    const validationErrors = {}

    // NOTE: since in the home contact form the user only indicates what type
    // of user is (student or company) and that the home contact form and the
    // modal contact form are using the same form state, we have to indicate
    // if we want to validate the "interested in" options and the user name.
    // That's why the `isMenuContact` param is added.
    // TODO: add error messages to `../config/translations/es.json`.
    if (isMenuContact) {
      if (interestedInOptions.filter(option => option.checked).length === 0) {
        validationErrors.optionNoSelected =
          'Selecciona al menos un curso de tu interés'
      }

      if (name.trimRight() === '') {
        validationErrors.nameNoSelected = 'El nombre no puede estar vacío'
      }
    }

    if (email.trimRight() === '') {
      validationErrors.emailNoSelected = 'Introduce un email válido'
    }

    if (!termsAndConditions) {
      validationErrors.termsNoSelected =
        'Debes aceptar los términos y condiciones'
    }

    // if (validationErrors.length > 0) {
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      // alert(validationErrors.join('\n'))
      return
    }

    setErrors({})

    setIsLoading(true)

    try {
      // NOTE: newsletter is disabled for now. In the future, should appear as
      // an option in the contact form
      const contactDetails = {
        name,
        email,
        userType,
        subscribedToNewsletter: false,
        viewed: false,
        createdAt: new Date(Date.now()),
        interestedIn: interestedInOptions
          .filter(option => option.checked)
          .map(option => option.id),
      }

      await fetch('/api/contact-request', {
        method: 'post',
        body: JSON.stringify(contactDetails),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      setIsSaved(true)

      const interestedInOptionsReset = interestedInOptions.map(option =>
        Object.assign({}, option, { checked: false }),
      )

      setName('')
      setEmail('')
      setUserType('company')
      setInterestedInOptions(interestedInOptionsReset)
      toggleTermsAndConditions()

      if (onSuccess !== undefined) {
        onSuccess()
      }
    } catch (error) {
      setIsError(true)
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  // NOTE: since the `interestedInCourseId` might not be initialized when the
  // user opens the modal, we need to force the `interestedInOptions` to be
  // resetted
  useEffect(() => {
    setInterestedInOptions(
      COURSES.map(course => ({
        checked: course.id === interestedInCourseId,
        id: course.id,
        label: formatMessage(course.information.title),
      })),
    )
  }, [interestedInCourseId])

  const saveToMailChimp = async () => {
    const emailLowerCase = email.toLowerCase()

    const res = await fetch('/api/newsletter-request', {
      body: JSON.stringify({
        email: emailLowerCase,
        status_if_new: 'pending',
        status: 'pending',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    })
  }

  return {
    isLoading,
    isSaved,
    isError,
    error,
    errors,
    saveToFirebase,
    name,
    onNameChange,
    email,
    onEmailChange,
    userType,
    onUserTypeChange,
    interestedInOptions,
    onInterestedInOptionChange,
    termsAndConditions,
    toggleTermsAndConditions,
    clearForm,
    saveToMailChimp,
  }
}

export default useContactForm

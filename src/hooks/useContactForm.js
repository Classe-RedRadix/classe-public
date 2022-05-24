import { useState, useEffect } from 'react'

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
  // Form values
  const [name, onNameChange, setName] = useInput()
  const [email, onEmailChange, setEmail] = useInput()
  const [userType, onUserTypeChange, setUserType] = useRadio('company')
  const [interestedInOptions, setInterestedInOptions] = useState(() =>
    COURSES.map(course => ({
      checked: course.id === interestedInCourseId,
      id: course.id,
      label: course.information.title,
    })),
  )

  // NOTE: we are not sending this value, it's just a form control
  const [termsAndConditions, toggleTermsAndConditions] = useCheckbox(false)

  // States to know the request status
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)
  const [error, setError] = useState(null)
  const [isSaved, setIsSaved] = useState(false)

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
  }

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
    const errors = []

    // NOTE: since in the home contact form the user only indicates what type
    // of user is (student or company) and that the home contact form and the
    // modal contact form are using the same form state, we have to indicate
    // if we want to validate the "interested in" options and the user name.
    // That's why the `isMenuContact` param is added.
    // TODO: add error messages to `../config/translations/es.json`.
    if (isMenuContact) {
      if (interestedInOptions.filter(option => option.checked).length === 0) {
        errors.push('Selecciona al menos un curso de tu interés')
      }

      if (name.trimRight() === '') {
        errors.push('El nombre no puede estar vacío')
      }
    }

    if (email.trimRight() === '') {
      errors.push('Introduce un email válido')
    }

    if (!termsAndConditions) {
      errors.push('Debes aceptar los términos y condiciones')
    }

    if (errors.length > 0) {
      alert(errors.join('\n'))
      return
    }

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
        label: course.information.title,
      })),
    )
  }, [interestedInCourseId])

  return {
    isLoading,
    isSaved,
    isError,
    error,
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
  }
}

export default useContactForm

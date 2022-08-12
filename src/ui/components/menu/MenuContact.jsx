import { useEffect, useRef, useState } from 'react'

import { copyClasseEmailToClipboard } from '../../../business'
import { useTranslations } from '../../../hooks'

import ExclamationIcon from '../../../assets/icons/ExclamationIcon'

import { ContactFormParamsPropType } from '../../sharedProptypes'

import Row from '../row/Row'
import Cell from '../cell/Cell'
import Input from '../forms/Input'
import Button from '../button/Button'
import Checkbox from '../forms/Checkbox'
import Radio from '../forms/Radio'

const MenuContact = ({ linesHidden, contactFormParams }) => {
  const formatMessage = useTranslations()
  const [mensSuccess, setMensSuccess] = useState(false)
  const showMessageSuccess = () => {
    contentSuccess.current.classList.add('isVisible')
  }

  const contentSuccess = useRef(null)
  const { nameNoSelected, optionNoSelected, emailNoSelected, termsNoSelected } =
    contactFormParams.errors

  const itemFormName = useRef(null)
  const itemFormOption = useRef(null)
  const itemFormEmail = useRef(null)
  const itemFormLegal = useRef(null)

  const toggleErrorClass = (errorText, itemForm) => {
    if (errorText !== undefined) {
      setTimeout(() => itemForm.classList.add('contact-formBlock--error'), 100)
    } else {
      itemForm.classList.remove('contact-formBlock--error')
    }
  }

  useEffect(() => {
    toggleErrorClass(nameNoSelected, itemFormName.current)
  }, [nameNoSelected])

  useEffect(() => {
    toggleErrorClass(optionNoSelected, itemFormOption.current)
  }, [optionNoSelected])

  useEffect(() => {
    toggleErrorClass(emailNoSelected, itemFormEmail.current)
  }, [emailNoSelected])

  useEffect(() => {
    toggleErrorClass(termsNoSelected, itemFormLegal.current)
  }, [termsNoSelected])
  return (
    <Row type="quarter" extraClass="menuLayer-contact">
      <Cell hasLinesHidden={linesHidden} isAnimated isNegative>
        <h1 className="h2 -scrambleText">
          {formatMessage('contact:second-title', {
            line: text => <span className="line">{text}</span>,
          })}
        </h1>

        <address className="menuLayer-contactAddress">
          <div className="heading menuLayer-contactAddressText">
            {formatMessage('contact:address1', {
              line: text => <span className="line">{text}</span>,
            })}
          </div>
          {/* TODO: add the cursor pointer in the css (?) */}
          <div
            className="heading menuLayer-contactAddressText"
            style={{ cursor: 'pointer' }}
            onClick={copyClasseEmailToClipboard}
          >
            {formatMessage('contact:address2', {
              lineAriaHidden: text => (
                <span className="line" aria-hidden="true">
                  {text}
                </span>
              ),
              screenReadOnly: text => <span className="sr-only">{text}</span>,
            })}
          </div>
        </address>
      </Cell>
      <Cell hasLinesHidden={linesHidden} isAnimated isNegative>
        <form
          className="contact-form"
          onSubmit={e => {
            e.preventDefault()
            contactFormParams.saveToFirebase({
              onSuccess: () => {
                setMensSuccess(true)
                setTimeout(showMessageSuccess, 1000)
              },
              isMenuContact: true,
            })
          }}
        >
          <div className="contact-formBlock" ref={itemFormName}>
            <label className="h3" htmlFor="contactName">
              {formatMessage('contact:my-name-is', {
                line: text => <span className="line">{text}</span>,
              })}
            </label>

            <Input
              placeholder={formatMessage('general:name-lastname-placeholder')}
              handleChange={contactFormParams.onNameChange}
              value={contactFormParams.name}
              name="name"
              isNegative
              id="contactName"
            />

            {nameNoSelected !== undefined ? (
              <small>
                <ExclamationIcon color={'#f88078'} className="icon-error" />
                {nameNoSelected}
              </small>
            ) : null}
          </div>
          <div className="contact-formBlock--flex contact-formBlock-title">
            <span className="notes">{formatMessage('footer:iam')}</span>
            <Radio
              onChange={contactFormParams.onUserTypeChange}
              label="footer:company"
              name="user-type"
              value="company"
              isChecked={contactFormParams.userType === 'company'}
            />
            <Radio
              onChange={contactFormParams.onUserTypeChange}
              label="footer:student"
              name="user-type"
              value="student"
              isChecked={contactFormParams.userType === 'student'}
            />
          </div>

          <label className="h3">
            {formatMessage('contact:interested-in', {
              line: text => <span className="line">{text}</span>,
            })}
          </label>

          <div className="contact-formBlock--flex" ref={itemFormOption}>
            {contactFormParams.interestedInOptions.map(option => (
              <Checkbox
                key={`interested-in-${option.id}`}
                handleChange={_ =>
                  contactFormParams.onInterestedInOptionChange(option)
                }
                label={option.label}
                name={option.id}
                id={option.id}
                isChecked={option.checked}
              />
            ))}
            {optionNoSelected !== undefined ? (
              <small>
                <ExclamationIcon color={'#f88078'} className="icon-error" />
                {optionNoSelected}
              </small>
            ) : null}
          </div>
          <div className="contact-formBlock" ref={itemFormEmail}>
            <label className="h3" htmlFor="contactEmail">
              {formatMessage('contact:my-email', {
                line: text => <span className="line">{text}</span>,
              })}
            </label>
            <Input
              placeholder={formatMessage('general:placeholder')}
              handleBlur={() => {}}
              handleChange={contactFormParams.onEmailChange}
              name="email"
              type="email"
              value={contactFormParams.email}
              isNegative
              id="contactEmail"
            />
            {emailNoSelected !== undefined ? (
              <small>
                <ExclamationIcon color={'#f88078'} className="icon-error" />
                {emailNoSelected}
              </small>
            ) : null}
          </div>

          <div className="contact-formBlock" ref={itemFormLegal}>
            <Checkbox
              hasMessage
              handleChange={contactFormParams.toggleTermsAndConditions}
              label={formatMessage('general:conditions-check')}
              name="conditions"
              isChecked={contactFormParams.termsAndConditions}
            />
            {termsNoSelected !== undefined ? (
              <small>
                <ExclamationIcon color={'#f88078'} className="icon-error" />
                {termsNoSelected}
              </small>
            ) : null}
          </div>
          <Button isNegative isFull text={formatMessage('general:send')} />
        </form>
        {mensSuccess && (
          <div className="mensSuccess" ref={contentSuccess}>
            <div className="contact-formBlock contact-formBlock-title">
              <label className="h3">
                {formatMessage('contact:success', {
                  line: text => <span className="line">{text}</span>,
                })}
              </label>
            </div>
          </div>
        )}
      </Cell>
    </Row>
  )
}

MenuContact.propTypes = {
  contactFormParams: ContactFormParamsPropType,
}

export default MenuContact

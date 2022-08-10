import { useEffect, useRef, useState } from 'react'
import { copyClasseEmailToClipboard } from '../../../business'
import { useTranslations } from '../../../hooks'
import cx from 'classnames'

import Row from '../row/Row'
import Cell from '../cell/Cell'
import Input from '../forms/Input'
import Button from '../button/Button'
import Checkbox from '../forms/Checkbox'
import Radio from '../forms/Radio'

import ExclamationIcon from '../../../assets/icons/ExclamationIcon'

const MenuContact = ({ linesHidden, contactFormParams }) => {
  const formatMessage = useTranslations()
  const [mensSuccess, setMensSuccess] = useState(false)
  const showMessageSuccess = () => {
    contentSuccess.current.classList.add('isVisible')
  }

  const contentSuccess = useRef(null)

  const errorName = contactFormParams.errors.nameNoSelected
  const errorOption = contactFormParams.errors.optionNoSelected
  const errorEmail = contactFormParams.errors.emailNoSelected
  const errorLegalTerms = contactFormParams.errors.termsNoSelected

  const itemFormName = useRef(null)
  const itemFormOption = useRef(null)
  const itemFormEmail = useRef(null)
  const itemFormLegal = useRef(null)

  const classError = (errorText, itemForm) => {
    if (errorText !== undefined) {
      setTimeout(() => itemForm.classList.add('contact-formBlock--error'), 100)
    } else {
      itemForm.classList.remove('contact-formBlock--error')
    }
  }

  useEffect(() => {
    classError(errorName, itemFormName.current)
    classError(errorOption, itemFormOption.current)
    classError(errorEmail, itemFormEmail.current)
    classError(errorLegalTerms, itemFormLegal.current)
  }, [errorName, errorOption, errorEmail, errorLegalTerms])
  return (
    <Row type="quarter" extraClass="menuLayer-contact">
      <Cell hasLinesHidden={linesHidden} isAnimated isNegative>
        <div className="-scrambleTextWrapper">
          <h1 className="h2 -scrambleText">
            {formatMessage('contact:second-title', {
              line: text => <span className="line">{text}</span>,
            })}
          </h1>
        </div>
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
            <div className="-scrambleTextWrapper">
              <label className="h3 -scrambleText" htmlFor="contactName">
                {formatMessage('contact:my-name-is', {
                  line: text => <span className="line">{text}</span>,
                })}
              </label>
            </div>
            <Input
              placeholder={formatMessage('general:name-lastname-placeholder')}
              handleBlur={() => {}}
              handleChange={contactFormParams.onNameChange}
              value={contactFormParams.name}
              name="name"
              type="name"
              isNegative
              id="contactName"
            />

            {errorName !== undefined ? (
              <small>
                <ExclamationIcon color={'#f88078'} className="icon-error" />
                {errorName}
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
          <div className="contact-formBlock contact-formBlock-title">
            <div className="-scrambleTextWrapper">
              <label className="h3 -scrambleText">
                {formatMessage('contact:interested-in', {
                  line: text => <span className="line">{text}</span>,
                })}
              </label>
            </div>
          </div>
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
            {errorOption !== undefined ? (
              <small>
                <ExclamationIcon color={'#f88078'} className="icon-error" />
                {errorOption}
              </small>
            ) : null}
          </div>
          <div className="contact-formBlock" ref={itemFormEmail}>
            <div className="-scrambleTextWrapper">
              <label className="h3 -scrambleText" htmlFor="contactEmail">
                {formatMessage('contact:my-email', {
                  line: text => <span className="line">{text}</span>,
                })}
              </label>
            </div>
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
            {errorEmail !== undefined ? (
              <small>
                <ExclamationIcon color={'#f88078'} className="icon-error" />
                {errorEmail}
              </small>
            ) : null}
          </div>
          <div className="contact-formBlock" ref={itemFormLegal}>
            <div className="contact-formBlock--legal">
              <Checkbox
                hasMessage
                handleChange={contactFormParams.toggleTermsAndConditions}
                label={formatMessage('general:conditions-check')}
                name="conditions"
                isChecked={contactFormParams.termsAndConditions}
              />
              {errorLegalTerms !== undefined ? (
                <small>
                  <ExclamationIcon color={'#f88078'} className="icon-error" />
                  {errorLegalTerms}
                </small>
              ) : null}
            </div>
            <Button isNegative isFull text={formatMessage('general:send')} />
          </div>
        </form>
        {mensSuccess && (
          <div className="mensSuccess" ref={contentSuccess}>
            <div className="contact-formBlock contact-formBlock-title">
              <div className="-scrambleTextWrapper">
                <label className="h3 -scrambleText">
                  {formatMessage('contact:success', {
                    line: text => <span className="line">{text}</span>,
                  })}
                </label>
              </div>
            </div>
          </div>
        )}
      </Cell>
    </Row>
  )
}

export default MenuContact

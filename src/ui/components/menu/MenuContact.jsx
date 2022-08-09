import { useRef, useState } from 'react'
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

  const contentSuccess = useRef(null)
  const showMessageSuccess = () => {
    contentSuccess.current.classList.add('isVisible')
  }

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
          <a
            className="heading menuLayer-contactAddressText"
            href={`mailto:${formatMessage('schema-contact-page:email')}`}
            target="_blank"
          >
            {formatMessage('contact:address2', {
              lineAriaHidden: text => (
                <span className="line" aria-hidden="true">
                  {text}
                </span>
              ),
              screenReadOnly: text => <span className="sr-only">{text}</span>,
            })}
          </a>
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
          <div
            className={cx(
              'contact-formBlock',
              `${
                contactFormParams.errors.nameNoSelected !== undefined &&
                'contact-formBlock--error'
              }`,
            )}
          >
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

            {contactFormParams.errors.nameNoSelected !== undefined ? (
              <small>
                <ExclamationIcon color={'#f88078'} className="icon-error" />
                {contactFormParams.errors.nameNoSelected}
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
          <div
            className={cx(
              'contact-formBlock--flex',
              `${
                contactFormParams.errors.optionNoSelected !== undefined &&
                'contact-formBlock--error'
              }`,
            )}
          >
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
            {contactFormParams.errors.optionNoSelected !== undefined ? (
              <small>
                <ExclamationIcon color={'#f88078'} className="icon-error" />
                {contactFormParams.errors.optionNoSelected}
              </small>
            ) : null}
          </div>
          <div
            className={cx(
              'contact-formBlock',
              `${
                contactFormParams.errors.emailNoSelected !== undefined &&
                'contact-formBlock--error'
              }`,
            )}
          >
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
            {contactFormParams.errors.emailNoSelected !== undefined ? (
              <small>
                <ExclamationIcon color={'#f88078'} className="icon-error" />
                {contactFormParams.errors.emailNoSelected}
              </small>
            ) : null}
          </div>
          <div className="contact-formBlock">
            <div
              className={cx(
                'contact-formBlock--legal',
                `${
                  contactFormParams.errors.termsNoSelected !== undefined &&
                  'contact-formBlock--error'
                }`,
              )}
            >
              <Checkbox
                hasMessage
                handleChange={contactFormParams.toggleTermsAndConditions}
                label={formatMessage('general:conditions-check')}
                name="conditions"
                isChecked={contactFormParams.termsAndConditions}
              />
              {contactFormParams.errors.termsNoSelected !== undefined ? (
                <small>
                  <ExclamationIcon color={'#f88078'} className="icon-error" />
                  {contactFormParams.errors.termsNoSelected}
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

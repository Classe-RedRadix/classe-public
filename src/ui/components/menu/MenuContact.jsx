import { copyClasseEmailToClipboard } from '../../../business'
import { useTranslations } from '../../../hooks'
import Row from '../row/Row'
import Cell from '../cell/Cell'
import Input from '../forms/Input'
import Button from '../button/Button'
import Checkbox from '../forms/Checkbox'
import Radio from '../forms/Radio'

const MenuContact = ({ linesHidden, contactFormParams }) => {
  const formatMessage = useTranslations()

  let showMessage
  if (contactFormParams.errors !== null) {
    showMessage = contactFormParams.errors.map(error => (
      <small className="isError">
        <span>Error</span>
        {error}
      </small>
    ))
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
              lineSROnly: text => <span className="line sr-only">{text}</span>,
            })}
          </div>
        </address>
      </Cell>
      <Cell hasLinesHidden={linesHidden} isAnimated isNegative>
        <form
          className="contact-form"
          onSubmit={e => {
            e.preventDefault()
            if (contactFormParams.errors) {
              console.log('errors', contactFormParams.errors)
            }
            contactFormParams.saveToFirebase({
              onSuccess: () => alert('Se guardó!'),
              isMenuContact: true,
            })
          }}
        >
          <div className="contact-formBlock">
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
          </div>
          <div className="contact-formBlock--flex">
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
          <div className="contact-formBlock">
            <div className="-scrambleTextWrapper">
              <label className="h3 -scrambleText">
                {formatMessage('contact:interested-in', {
                  line: text => <span className="line">{text}</span>,
                })}
              </label>
            </div>
          </div>
          <div className="contact-formBlock--flex">
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
          </div>
          <div className="contact-formBlock">
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
          </div>
          <div className="contact-formBlock">
            <Checkbox
              hasMessage
              handleChange={contactFormParams.toggleTermsAndConditions}
              label={formatMessage('general:conditions-check')}
              name="conditions"
              isChecked={contactFormParams.termsAndConditions}
            />
            {/* <Checkbox
              hasMessage
              handleChange={() => {}}
              label="general:newsletter-check"
              name="newsletter"
              value=""
            /> */}
          </div>
          <Button isNegative isFull text={formatMessage('general:send')} />
          {showMessage && showMessage}
        </form>
      </Cell>
    </Row>
  )
}

export default MenuContact

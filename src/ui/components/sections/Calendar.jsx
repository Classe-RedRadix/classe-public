import PropTypes from 'prop-types'
import { useTranslations, useGenerateImageCandidates } from '../../../hooks'
import SectionWrapper from '../wrappers/SectionWrapper'
import Row from '../row/Row'
import Cell from '../cell/Cell'
import Paragraphs from '../paragraphs/Paragraphs'
import DatePicker from '../date-picker/DatePicker'
import { IMAGES } from '../../../data'
import Button from '../button/Button'

const Calendar = ({ dates, isBlack, isFluor, openContact }) => {
  const formatMessage = useTranslations()

  const agendaSlotImage = IMAGES.AGENDA_SLOT_IMAGE

  return (
    <SectionWrapper isBlack={isBlack} isFluor={isFluor} extraClass="calendar">
      <Row type="half">
        <Cell>
          <div className="scrambleTextWrapper">
            <h2 className="h1 scrambleText">
              {formatMessage('calendar:title', {
                line: text => <span className="line">{text}</span>,
                lineTab: text => <span className="line has-tab">{text}</span>,
              })}
            </h2>
          </div>
        </Cell>
        <Cell>
          <picture>
            <source
              sizes={agendaSlotImage.sizes}
              srcSet={useGenerateImageCandidates(agendaSlotImage.srcSetWebp)}
              type="image/webp"
            />

            <img
              src={agendaSlotImage.mainImage}
              alt={formatMessage(agendaSlotImage.alt)}
              width={agendaSlotImage.width}
              height={agendaSlotImage.height}
              sizes={agendaSlotImage.sizes}
              srcSet={useGenerateImageCandidates(agendaSlotImage.srcSet)}
              loading="lazy"
              className="image"
            />
          </picture>
        </Cell>
      </Row>
      <Row type="half">
        <Cell hasGap>
          <Paragraphs text={formatMessage('calendar:description')} />
        </Cell>
        <Cell>
          {dates ? (
            <DatePicker dates={dates} openContact={openContact} />
          ) : (
            <Button
              isFull
              onClick={openContact}
              text={formatMessage('calendar:no-courses')}
            />
          )}
        </Cell>
      </Row>
    </SectionWrapper>
  )
}

Calendar.propTypes = {
  dates: DatePicker.propTypes.dates,
  isBlack: PropTypes.bool.isRequired,
  isFluor: PropTypes.bool.isRequired,
}

export default Calendar

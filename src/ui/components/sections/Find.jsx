import PropTypes from 'prop-types'
import { copyClasseEmailToClipboard } from '../../../business'
import { useTranslations, useGenerateImageCandidates } from '../../../hooks'
import SectionWrapper from '../wrappers/SectionWrapper'
import Row from '../row/Row'
import Cell from '../cell/Cell'

import { IMAGES } from '../../../data'

import GlyphIcon from './../../../assets/icons/Glyph2Icon'

const Find = ({ isBlack, isFluor }) => {
  const t = useTranslations()

  const contactImage = IMAGES.CONTACT_IMAGE

  return (
    <SectionWrapper isBlack={isBlack} isFluor={isFluor} extraClass="find">
      <Row type="half">
        <Cell isNegative={isBlack}>
          <div className="scrambleTextWrapper">
            <h2 className="h1 scrambleText">
              {t('find:title', {
                line: text => <span className="line">{text}</span>,
                lineAriaHidden: text => (
                  <span className="line" aria-hidden="true">
                    {text}
                  </span>
                ),
                screenReadOnly: text => <span className="sr-only">{text}</span>,
                lineTab: text => <span className="line has-tab">{text}</span>,
              })}
            </h2>
          </div>
        </Cell>
        <Cell isNegative={isBlack}>
          <img
            src={contactImage.mainImage}
            alt={t(contactImage.alt)}
            width={contactImage.width}
            height={contactImage.height}
            sizes={contactImage.sizes}
            srcSet={useGenerateImageCandidates(contactImage.srcSet)}
            loading="lazy"
            className="image"
          />
        </Cell>
      </Row>
      <Row type="half">
        <Cell hasGap isNegative={isBlack}>
          <GlyphIcon className="icon" />
          <p className="p">{t('find:description')}</p>
        </Cell>
        <Cell hasGap isNegative={isBlack}>
          <div className="scrambleTextWrapper">
            <h3 className="h1 scrambleText" aria-hidden="true">
              {t('find:claim', {
                line: text => <span className="line">{text}</span>,
                lineTab: text => <span className="line has-tab">{text}</span>,
              })}
            </h3>
          </div>
          <button
            className="notes"
            aria-label={t('find:aria')}
            onClick={copyClasseEmailToClipboard}
          >
            {t('find:description2', {
              ariaHidden: text => <span aria-hidden="true">{text}</span>,
              screenReader: text => <span className="sr-only">{text}</span>,
            })}
          </button>
        </Cell>
      </Row>
    </SectionWrapper>
  )
}

Find.propTypes = {
  isBlack: PropTypes.bool.isRequired,
  isFluor: PropTypes.bool.isRequired,
}

export default Find

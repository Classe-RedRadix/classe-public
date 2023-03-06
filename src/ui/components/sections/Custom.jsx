import PropTypes from 'prop-types'
import { useTranslations, useGenerateImageCandidates } from '../../../hooks'
import SectionWrapper from '../wrappers/SectionWrapper'
import Row from '../row/Row'
import Cell from '../cell/Cell'
import Button from '../button/Button'
import Paragraphs from '../paragraphs/Paragraphs'
import { IMAGES } from '../../../data'
import GlyphIcon from './../../../assets/icons/GlyphIcon'

const Custom = ({ isBlack, isFluor, openCourses }) => {
  const t = useTranslations()

  const tailorMadeCoursesImage = IMAGES.TAILOR_MADE_COURSES_IMAGE

  return (
    <SectionWrapper isBlack={isBlack} isFluor={isFluor} extraClass="custom">
      <Row type="half">
        <Cell isNegative={isBlack}>
          <div className="scrambleTextWrapper">
            <h2 className="h1 scrambleText">
              {t('custom:title', {
                line: text => <span className="line">{text}</span>,
                lineTab: text => <span className="line has-tab">{text}</span>,
                lineTabAriaHidden: text => (
                  <span className="line has-tab" aria-hidden="true">
                    {text}
                  </span>
                ),
                screenReadOnly: text => <span className="sr-only">{text}</span>,
              })}
            </h2>
          </div>
        </Cell>
        <Cell isNegative={isBlack}>
          <picture>
            <source
              sizes={tailorMadeCoursesImage.sizes}
              srcSet={useGenerateImageCandidates(
                tailorMadeCoursesImage.srcSetWebp,
              )}
              type="image/webp"
            />

            <img
              src={tailorMadeCoursesImage.mainImage.src}
              alt={t(tailorMadeCoursesImage.alt)}
              width={tailorMadeCoursesImage.width}
              height={tailorMadeCoursesImage.height}
              sizes={tailorMadeCoursesImage.sizes}
              srcSet={useGenerateImageCandidates(tailorMadeCoursesImage.srcSet)}
              loading="lazy"
              className="image"
            />
          </picture>
        </Cell>
      </Row>
      <Row type="half">
        <Cell hasGap isNegative={isBlack}>
          <GlyphIcon className="icon" />
          <Paragraphs text={t('custom:description')} />
        </Cell>
        <Cell hasGap isNegative={isBlack}>
          <div className="scrambleTextWrapper">
            <h3 className="h1 scrambleText" aria-hidden="true">
              {t('custom:claim', {
                line: text => <span className="line">{text}</span>,
                lineTab: text => <span className="line has-tab">{text}</span>,
              })}
            </h3>
          </div>
          <Button
            isLink
            isFluor={isFluor}
            href="/"
            text={t('custom:button')}
            onClick={openCourses}
          />
        </Cell>
      </Row>
    </SectionWrapper>
  )
}

Custom.propTypes = {
  isBlack: PropTypes.bool.isRequired,
  isFluor: PropTypes.bool.isRequired,
  openCourses: PropTypes.func,
}

export default Custom

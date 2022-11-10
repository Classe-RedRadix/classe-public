import PropTypes from 'prop-types'
import { useTranslations, useGenerateImageCandidates } from '../../../hooks'
import SectionWrapper from '../wrappers/SectionWrapper'
import Row from '../row/Row'
import Cell from '../cell/Cell'
import FaqsContainer from '../faqs/FaqsContainer'
import { IMAGES } from '../../../data'
import { MEDIA_QUERIES } from '../../../constants'
import useWindowSize from '../../../hooks/useWindowSize'

const Faqs = ({ list, isBlack, isFluor }) => {
  const t = useTranslations()
  const size = useWindowSize()
  const faqsImage = IMAGES.REMOTE_ON_SITE_TRAINING_IMAGE

  return (
    <SectionWrapper isBlack={isBlack} isFluor={isFluor} extraClass="faqs">
      <Row type="full">
        <Cell>
          <div className="scrambleTextWrapper">
            <h2 className="h1 scrambleText">
              {t('faqs:title', {
                line: text => <span className="line has-wrap">{text}</span>,
                lineAriaHidden: text => (
                  <span className="line has-wrap" aria-hidden="true">
                    {text}
                  </span>
                ),
                screenReadOnly: text => <span className="sr-only">{text}</span>,
                lineTab: text => <span className="line has-tab">{text}</span>,
              })}
            </h2>
          </div>
        </Cell>
      </Row>
      <Row type={size.width <= MEDIA_QUERIES.desktop ? 'full' : 'half'}>
        <Cell>
          <picture>
            <source
              sizes={faqsImage.sizes}
              srcSet={useGenerateImageCandidates(faqsImage.srcSetWebp)}
              type="image/webp"
            />

            <img
              src={faqsImage.mainImage}
              alt={t(faqsImage.alt)}
              width={faqsImage.width}
              height={faqsImage.height}
              sizes={faqsImage.sizes}
              srcSet={useGenerateImageCandidates(faqsImage.srcSet)}
              loading="lazy"
              className="image"
            />
          </picture>
        </Cell>
        <Cell>
          <FaqsContainer list={list} />
        </Cell>
      </Row>
    </SectionWrapper>
  )
}

Faqs.propTpes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
  isBlack: PropTypes.bool.isRequired,
  isFluor: PropTypes.bool.isRequired,
}

export default Faqs

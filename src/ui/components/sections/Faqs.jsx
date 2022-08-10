import PropTypes from 'prop-types'
import { useTranslations, useGenerateImageCandidates } from '../../../hooks'
import SectionWrapper from '../wrappers/SectionWrapper'
import Row from '../row/Row'
import Cell from '../cell/Cell'
import FaqsContainer from '../faqs/FaqsContainer'
import { IMAGES } from '../../../data'

const Faqs = ({ list, isBlack, isFluor }) => {
  const t = useTranslations()

  const remoteOnSiteTrainingImage = IMAGES.REMOTE_ON_SITE_TRAINING_IMAGE

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
      <Row type="half">
        <Cell>
          <picture>
            <source
              sizes={remoteOnSiteTrainingImage.sizes}
              srcSet={useGenerateImageCandidates(
                remoteOnSiteTrainingImage.srcSetWebp,
              )}
              type="image/webp"
            />

            <img
              src={remoteOnSiteTrainingImage.mainImage}
              alt={t(remoteOnSiteTrainingImage.alt)}
              width={remoteOnSiteTrainingImage.width}
              height={remoteOnSiteTrainingImage.height}
              sizes={remoteOnSiteTrainingImage.sizes}
              srcSet={useGenerateImageCandidates(
                remoteOnSiteTrainingImage.srcSet,
              )}
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

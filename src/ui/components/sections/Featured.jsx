import PropTypes from 'prop-types'
import { useTranslations, useGenerateImageCandidates } from '../../../hooks'
import SectionWrapper from '../wrappers/SectionWrapper'
import Row from '../row/Row'
import Cell from '../cell/Cell'
import Button from '../button/Button'
import { IMAGES } from '../../../data'
import { CoursePropType } from './../../sharedProptypes'

const Featured = ({ isBlack, isFluor, course, openCourse }) => {
  const t = useTranslations()

  const coursesImage = IMAGES.COURSES_IMAGE

  return (
    <SectionWrapper
      isFluorChanger
      isBlack={isBlack}
      isFluor={isFluor}
      extraClass="featured"
    >
      <Row type="half">
        <Cell hasGap>
          <div className="scrambleTextWrapper">
            <h2 className="h1 scrambleText">
              {t('featured:title', {
                lineTabAriaHidden: text => (
                  <span className="line" aria-hidden="true">
                    {text}
                  </span>
                ),
                screenReadOnly: text => <span className="sr-only">{text}</span>,
                line: text => <span className="line">{text}</span>,
              })}
            </h2>
          </div>
          <Button
            isLink
            isFluor={isFluor}
            isFull
            href={course.href}
            onClick={() => openCourse(course)}
            text={t('featured:button')}
          />
        </Cell>
        <Cell>
          <picture>
            <source
              sizes={coursesImage.sizes}
              srcSet={useGenerateImageCandidates(coursesImage.srcSetWebp)}
              type="image/webp"
            />

            <img
              src={coursesImage.mainImage.src}
              alt={t(coursesImage.alt)}
              width={coursesImage.width}
              height={coursesImage.height}
              sizes={coursesImage.sizes}
              srcSet={useGenerateImageCandidates(coursesImage.srcSet)}
              loading="lazy"
              className="image"
            />
          </picture>
        </Cell>
      </Row>
    </SectionWrapper>
  )
}

Featured.propTypes = {
  isBlack: PropTypes.bool.isRequired,
  isFluor: PropTypes.bool.isRequired,
  course: CoursePropType,
  openCourse: PropTypes.func,
}

export default Featured

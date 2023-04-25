import PropTypes from 'prop-types'
import { useTranslations, useGenerateImageCandidates } from '../../../hooks'
import SectionWrapper from '../wrappers/SectionWrapper'
import Row from '../row/Row'
import Cell from '../cell/Cell'
import Button from '../button/Button'
import { IMAGES } from '../../../data'
import TabIcon from './../../../assets/icons/TabIcon'
import { CoursePropType } from '../../sharedProptypes'

const Courses = ({ courses, isBlack, isFluor, openCourse, openContact }) => {
  const t = useTranslations()

  const professionalTrainingImage = IMAGES.PROFESSIONAL_TRAINING_IMAGE

  const handleClick = (e, course) => {
    e.preventDefault()
    openCourse(course)
  }

  return (
    <SectionWrapper
      isBlack={isBlack}
      isFluor={isFluor}
      isBlackChanger
      extraClass="courses"
    >
      <Row type="third">
        <Cell isColumn isNegative={isBlack}>
          <Cell isNegative={isBlack}>
            <div className="scrambleTextWrapper">
              <h2 className="h2 scrambleText">
                {t('courses:claim', {
                  line: text => <span className="line">{text}</span>,
                  lineTab: text => <span className="line has-tab">{text}</span>,
                })}
              </h2>
            </div>
          </Cell>
          <Cell isNegative={isBlack}>
            <picture>
              <source
                sizes={professionalTrainingImage.sizes}
                srcSet={useGenerateImageCandidates(
                  professionalTrainingImage.srcSetWebp,
                )}
                type="image/webp"
              />

              <img
                src={professionalTrainingImage.mainImage.src}
                alt={t(professionalTrainingImage.alt)}
                width={professionalTrainingImage.width}
                height={professionalTrainingImage.height}
                sizes={professionalTrainingImage.sizes}
                srcSet={useGenerateImageCandidates(
                  professionalTrainingImage.srcSet,
                )}
                loading="lazy"
                className="image"
              />
            </picture>
            <p className="p">{t('courses:description')}</p>
            <Button
              isLink
              isNegative={isBlack}
              href="/"
              text={t('courses:button')}
              onClick={openContact}
            />
          </Cell>
        </Cell>
        <Cell isNegative={isBlack}>
          <ol className="coursesList-list">
            {courses.map((course, index) => (
              <li key={t(course.information.title)}>
                <a
                  className="coursesList-link h1"
                  href={course.href}
                  onClick={e => handleClick(e, course)}
                >
                  {/* <span className="coursesList-linkNumber">
                    {index < 10 ? `0${index + 1}` : index + 1}
                  </span> */}
                  <span className="coursesList-linkTextWrapper">
                    <TabIcon className="icon" color="yellow" />
                    <span className="coursesList-linkText">
                      {t(course.information.title)}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </Cell>
      </Row>
    </SectionWrapper>
  )
}

Courses.propTypes = {
  courses: PropTypes.arrayOf(CoursePropType.isRequired).isRequired,
  isBlack: PropTypes.bool.isRequired,
  isFluor: PropTypes.bool.isRequired,
  openCourse: PropTypes.func,
  openContact: PropTypes.func,
}

export default Courses

import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import { MEDIA_QUERIES } from '../../../constants'

import {
  useWindowSize,
  useTranslations,
  useGenerateImageCandidates,
} from '../../../hooks'

import Row from '../row/Row'
import Cell from '../cell/Cell'
import CoursesList from './CoursesList'
import MenuContact from './MenuContact'
import MenuCourse from './MenuCourse'
import { CoursePropType } from '../../sharedProptypes'

import { IMAGES } from '../../../data'

const MenuLayer = ({
  course,
  courses,
  contactFormParams,
  isContactOpen,
  isCourseOpen,
  areCoursesOpen,
  hasPageTitle,
  handleClose,
  openContact,
  goToHome,
  openCourse,
  openCourses,
  hasClose = true,
  actionText = 'menu:close',
}) => {
  const isOpen = isContactOpen || areCoursesOpen || isCourseOpen
  const t = useTranslations()
  const size = useWindowSize()
  const [linesHidden, setLinesHidden] = useState(false)
  const classes = cx('menuLayer', {
    'is-open': isOpen,
    'is-free': isContactOpen || isCourseOpen,
    'is-course': isCourseOpen,
  })
  const isDesktop = size.width >= MEDIA_QUERIES.desktop

  useEffect(() => {
    if (isOpen) {
      setLinesHidden(true)
    } else {
      setLinesHidden(false)
    }
  }, [isOpen])

  const hasHomeTitle =
    !areCoursesOpen && !isCourseOpen && !isContactOpen && !hasPageTitle

  const coursesImage = IMAGES.COURSES_IMAGE

  return (
    <div className={classes}>
      {hasHomeTitle ? <h1 className="sr-only">{t('home:title')}</h1> : null}
      <div className="menuLayer-wrapper">
        {isDesktop && hasClose ? (
          <div className="menuLayer-desktopHeader">
            <button
              className="menuLayer-desktopHeader-button button"
              onClick={handleClose}
              role="link"
            >
              [ <span className="bracketHover">{t(actionText)}</span> ]
            </button>
          </div>
        ) : null}
        <div
          className={cx('menuLayer-content', {
            'is-block': isCourseOpen,
          })}
        >
          {isContactOpen ? (
            <MenuContact
              linesHidden={linesHidden}
              contactFormParams={contactFormParams}
            />
          ) : isCourseOpen ? (
            <MenuCourse
              isCourseOpen={isCourseOpen}
              course={course}
              openContact={openContact}
            />
          ) : (
            <Row type="quarter" extraClass="menuLayer-courses">
              <Cell hasLinesHidden={linesHidden} isAnimated isNegative>
                <img
                  src={coursesImage.mainImage}
                  alt={t(coursesImage.alt)}
                  width={coursesImage.width}
                  height={coursesImage.height}
                  sizes={coursesImage.sizes}
                  srcSet={useGenerateImageCandidates(coursesImage.srcSet)}
                  loading="lazy"
                  className="image"
                />
              </Cell>
              <Cell hasLinesHidden={linesHidden} isAnimated isNegative>
                <CoursesList
                  courses={courses}
                  openCourse={openCourse}
                  isPlacedAtHome={!areCoursesOpen}
                />
              </Cell>
            </Row>
          )}
          {!isCourseOpen ? (
            <Row type="full" extraClass="menuLayer-menu">
              <Cell hasLinesHidden={linesHidden} isAnimated isNegative>
                <a
                  href="/"
                  className="menuDesktop-claim menu"
                  onClick={goToHome}
                >
                  {t('menu:claim')}
                </a>
                <span
                  onClick={openCourses}
                  className="menuDesktop-button menu"
                  aria-label={t('menu:courses')}
                >
                  [{courses.length < 10 ? `0${courses.length}` : courses.length}
                  ] {t('menu:courses')}
                </span>
                <button
                  onClick={openContact}
                  className="menuDesktop-link menu"
                  aria-label={t('menu:contact')}
                  role="link"
                >
                  {t('menu:contact')}
                </button>
              </Cell>
            </Row>
          ) : null}
        </div>
      </div>
    </div>
  )
}

MenuLayer.propTypes = {
  course: CoursePropType,
  courses: PropTypes.arrayOf(CoursePropType.isRequired).isRequired,
  isOpen: PropTypes.bool,
  isContactOpen: PropTypes.bool,
  isCourseOpen: PropTypes.bool,
  areCoursesOpen: CoursesList.propTypes.isPlacedAtHome,
  hasPageTitle: PropTypes.bool,
  contactFormParams: MenuContact.propTypes.contactFormParams,
  actionText: PropTypes.string,
  goToHome: PropTypes.func,
  openCourses: PropTypes.func,
  hasClose: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  openContact: PropTypes.func.isRequired,
  openCourse: PropTypes.func.isRequired,
}

export default MenuLayer

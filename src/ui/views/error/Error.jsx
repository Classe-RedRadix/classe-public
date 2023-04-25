import { useCallback } from 'react'
import PropTypes from 'prop-types'
import useTranslations from '../../../hooks/useTranslations'
import MainWrapper from '../../components/wrappers/MainWrapper'
import SectionWrapper from '../../components/wrappers/SectionWrapper'
import Menu from '../../components/menu/Menu'
import Row from '../../components/row/Row'
import Button from '../../components/button/Button'
import Cell from '../../components/cell/Cell'
import ArrowError from '../../../assets/icons/ArrowError'
import useFitText from 'use-fit-text'
import { useMenu } from '../../../hooks'
import {
  ContactFormParamsPropType,
  CoursePropType,
} from './../../sharedProptypes'

const Error = ({ isBlack, isFluor, isLock, courses, contactFormParams }) => {
  const t = useTranslations()

  const {
    areCoursesOpen,
    course,
    handleClose,
    openContact,
    openCourses,
    isContactOpen,
    isCourseOpen,
    openCourse,
  } = useMenu()

  const { fontSize, ref } = useFitText({ maxFontSize: 8000 })

  const twisterMath = (x, y, xShapeCenter, yShapeCenter) => {
    return Math.atan2(x - xShapeCenter, -(y - yShapeCenter)) * (180 / Math.PI)
  }

  const getPos = (el, pos) => {
    for (
      var lx = 0, ly = 0;
      el != null;
      lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent
    );
    if (pos === 'x') {
      return lx
    } else {
      return ly
    }
  }

  const cursorFinderEvent = e => {
    const x = e.clientX
    const y = e.clientY

    const theArrows = document.getElementsByClassName('error-arrow')
    for (var i = 0; i < theArrows.length; i++) {
      var xShapeCenter = getPos(theArrows[i], 'x')
      var yShapeCenter = getPos(theArrows[i], 'y')
      theArrows[i].style.transform =
        'rotate(' + twisterMath(x, y, xShapeCenter, yShapeCenter) + 'deg)'
    }
  }

  const arrowsArray = new Array(30).fill(null)
  const arrows = arrowsArray.map((element, index) => (
    <div key={index} className="error-arrow">
      <ArrowError />
    </div>
  ))

  return (
    <MainWrapper
      isBlack={isBlack}
      isFluor={isFluor}
      isLock={isLock}
      course={course}
      isCourseOpen={isCourseOpen}
    >
      <Menu
        isBlack={isBlack}
        courses={courses}
        contactFormParams={contactFormParams}
        areCoursesOpen={areCoursesOpen}
        course={course}
        handleClose={handleClose}
        openContact={openContact}
        openCourses={openCourses}
        isContactOpen={isContactOpen}
        isCourseOpen={isCourseOpen}
        openCourse={openCourse}
      />
      <SectionWrapper isBlack extraClass="error">
        <div onMouseMove={cursorFinderEvent}>
          <Row type="full" extraClass="error-content">
            <Cell isNegative>
              <div
                className="error-text"
                ref={ref}
                style={{
                  fontSize,
                }}
              >
                <span>{t('error:page-not')}</span>
                <span>{t('error:found')}</span>
              </div>
              <div className="error-grid">
                <div className="error-buttonWrap">
                  <Button
                    isNegative
                    isFull
                    isLink
                    href="/"
                    text={t('error:back-to-homne')}
                  />
                </div>
                {arrows}
              </div>
            </Cell>
          </Row>
        </div>
      </SectionWrapper>
    </MainWrapper>
  )
}

Error.propTypes = {
  isBlack: PropTypes.bool,
  isFluor: PropTypes.bool,
  isLock: PropTypes.bool,
  courses: PropTypes.arrayOf(CoursePropType),
  contactFormParams: ContactFormParamsPropType,
}

export default Error

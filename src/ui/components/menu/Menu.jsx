import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { MEDIA_QUERIES } from '../../../constants'

import useWindowSize from '../../../hooks/useWindowSize'

import MenuLayer from './MenuLayer'
import MenuDesktop from './MenuDesktop'
import MenuMobile from './MenuMobile'

import {
  CoursePropType,
  ContactFormParamsPropType,
} from '../../sharedProptypes'

const Menu = ({
  isBlack,
  isFluor,
  courses,
  contactFormParams,
  actionText = 'menu:close',
  handleText,
  areCoursesOpen = false,
  course = null,
  handleClose,
  goToHome,
  openContact,
  openCourses,
  isContactOpen = false,
  isCourseOpen = false,
  openCourse,
}) => {
  const size = useWindowSize()

  useEffect(() => {
    if (!isContactOpen) {
      contactFormParams.clearForm()
    }
  }, [isContactOpen])

  return (
    <>
      <MenuLayer
        actionText={actionText}
        courses={courses}
        contactFormParams={contactFormParams}
        openContact={_ => {
          // NOTE: when the user opens the menu, he may navigate to the contact
          // page via `/courses` view or `/courses/[courseId]` view. If he is
          // in the `courses` view, the `course.id` is not available since he
          // is navigating to the contact page directly without being
          // interested in a particular course, but if he navigates via
          // `course` view, he will navigate by clicking in the `Contact us`,
          // button, which means that the `course.id` property will be
          // available. That's why we are using `?` in `course?.id`.
          openContact(_, course?.id)
        }}
        isContactOpen={isContactOpen}
        isCourseOpen={isCourseOpen}
        openCourse={openCourse}
        goToHome={goToHome}
        course={course}
        areCoursesOpen={areCoursesOpen}
        openCourses={openCourses}
        handleClose={!!handleText ? handleText : handleClose}
      />
      {size.width >= MEDIA_QUERIES.desktop ? (
        <MenuDesktop
          isBlack={isBlack}
          isFluor={isFluor}
          openCourses={openCourses}
          openContact={openContact}
          courses={courses.length}
        />
      ) : (
        <MenuMobile
          isBlack={isBlack}
          isFluor={isFluor}
          isContactOpen={isContactOpen}
          isCourseOpen={isCourseOpen}
          areCoursesOpen={areCoursesOpen}
          openCourses={openCourses}
          openContact={openContact}
          handleClose={handleClose}
        />
      )}
    </>
  )
}

Menu.propTypes = {
  course: CoursePropType,
  courses: PropTypes.arrayOf(CoursePropType.isRequired).isRequired,
  contactFormParams: ContactFormParamsPropType,
  isBlack: PropTypes.bool,
  isFluor: PropTypes.bool,
  areCoursesOpen: PropTypes.bool,
  isContactOpen: PropTypes.bool,
  isCourseOpen: PropTypes.bool,
  actionText: PropTypes.string,
  handleText: PropTypes.func,
  handleClose: PropTypes.func,
  openContact: PropTypes.func,
  openCourses: PropTypes.func,
  openCourse: PropTypes.func,
}

export default Menu

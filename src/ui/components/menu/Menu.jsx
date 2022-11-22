import { useRouter } from 'next/router'
import { useEffect } from 'react'
import PropTypes from 'prop-types'

import { MEDIA_QUERIES } from '../../../constants'

import useWindowSize from '../../../hooks/useWindowSize'

import MenuLayer from './MenuLayer'
import MenuDesktop from './MenuDesktop'
import MenuMobile from './MenuMobile'

import { useTranslations } from 'hooks'
import {
  CoursePropType,
  ContactFormParamsPropType,
} from '../../sharedProptypes'
import InfoHead from 'InfoHead'

const Menu = ({
  isBlack,
  isFluor,
  courses,
  contactFormParams,
  actionText = 'menu:close',
  handleText,
  areCoursesOpen = false,
  course = null,
  hasPageTitle,
  handleClose,
  goToHome,
  openContact,
  openCourses,
  isContactOpen = false,
  isCourseOpen = false,
  openCourse,
}) => {
  const router = useRouter()
  const pathName = router.pathname

  const size = useWindowSize()
  const formatMessage = useTranslations()

  useEffect(() => {
    if (!isContactOpen) {
      contactFormParams.clearForm()
    }
  }, [isContactOpen])

  const infoHeadData = { title: '', description: '', url: '' }

  if (pathName === '/') {
    infoHeadData.title = formatMessage('info-head-home:title')
    infoHeadData.description = formatMessage('info-head-home:description')
    infoHeadData.url = formatMessage('url:root')
  }
  if (areCoursesOpen) {
    infoHeadData.title = formatMessage('info-head-courses:title')
    infoHeadData.description = formatMessage('info-head-courses:description')
    infoHeadData.url = formatMessage('url:courses')
  }
  if (isCourseOpen) {
    infoHeadData.title = formatMessage('info-head-course:title', {
      course: formatMessage(course.information.title),
    })
    infoHeadData.description = formatMessage(course.information.metaDescription)
    infoHeadData.url = `${formatMessage('url:root')}${course.href}`
  }
  if (isContactOpen) {
    infoHeadData.title = formatMessage('info-head-contact:title')
    infoHeadData.description = formatMessage('info-head-contact:description')
    infoHeadData.url = formatMessage('url:contact')
  }
  if (pathName === '/terminos-legales') {
    infoHeadData.title = formatMessage('info-head-legal-terms:title')
    infoHeadData.description = formatMessage(
      'info-head-legal-terms:description',
    )
    infoHeadData.url = formatMessage('url:legal-terms')
  }
  if (pathName === '/cookies') {
    infoHeadData.title = formatMessage('info-head-cookies-policy:title')
    infoHeadData.description = formatMessage(
      'info-head-cookies-policy:description',
    )
    infoHeadData.url = formatMessage('url:cookies')
  }

  return (
    <>
      <InfoHead
        title={infoHeadData.title}
        description={infoHeadData.description}
        url={infoHeadData.url}
      ></InfoHead>
      <MenuLayer
        hasPageTitle={hasPageTitle}
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
  hasPageTitle: PropTypes.bool,
  actionText: PropTypes.string,
  handleText: PropTypes.func,
  handleClose: PropTypes.func,
  openContact: PropTypes.func,
  openCourses: PropTypes.func,
  openCourse: PropTypes.func,
}

export default Menu

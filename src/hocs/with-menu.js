import { useRouter } from 'next/router'

import { COURSES_PAGE, CONTACT_PAGE, COURSE_PAGE } from '../constants'
import { COURSES } from '../data'
import { useContactForm, useMenu } from '../hooks'
import Menu from '../ui/components/menu/Menu'
import MainWrapper from '../ui/components/wrappers/MainWrapper'

/**
 * Renders a page with the menu open with the given page.
 *
 * @param { string } pageName - Name of the page, stored in `src/constants.js`.
 * This will allow the component handle different situations depending on the
 * rendered page.
 * @param { object } config Additional HOC configuration, like `useMenu` config,
 * `useContactForm` config, `InfoHead` component, etc.
 * @param { object } config.useMenuConfig - Configuration for `useMenu` hook
 * @param { object } config.useContactFormConfig -  Configuration for
 * `useContactForm` hooks
 * @param { Node } config.indoHead - Head component for better SEO
 * @param { Node } config.hiddenTitle - Hidden heading for better SEO
 *
 * @returns a page that contains the given page open in the menu
 */
const withMenu = (pageName, config) => {
  const router = useRouter()

  const {
    openCourse,
    isCourseOpen,
    areCoursesOpen,
    course,
    openCourses,
    openContact,
    isContactOpen,
    goToHome,
  } = useMenu(config?.useMenuConfig)

  // NOTE: if we are loading the `course` page directly, the `interedted in
  // course id` comes from the URL (which is stored in
  // `config.useContactFormConfig.interestedIn`) , but if not, comes from the
  // `course.id` directly.
  // We use `?` in `course?.id` because if the user opens the `contact` view,
  // we don't need to check any course, just show the contact form.
  const contactFormParams = useContactForm(
    config?.useContactFormConfig?.interestedIn || course?.id,
  )

  const actionText = config?.actionText
    ? config.actionText
    : isCourseOpen
    ? 'menu:close'
    : 'general:go-to-home'

  const coursesHandleTextClick = () => {
    if (isCourseOpen) {
      router.push('/cursos')
      openCourses()
    } else {
      router.push('/')
    }
  }

  const handleTextClick =
    pageName === COURSES_PAGE
      ? coursesHandleTextClick
      : pageName === CONTACT_PAGE
      ? goToHome
      : pageName === COURSE_PAGE
      ? () => {
          router.push('/')
        }
      : null

  const openContactView =
    pageName === COURSE_PAGE
      ? () =>
          // HACK: in the course page, we force the app to redirect to the
          // contact page directly instead of opening it as a modal.
          // This is because the route that would be displayed is not
          // compatible with the url (https://nextjs.org/docs/messages/incompatible-href-as)
          // If we find a way to make it compatible, then we should use the
          // `useMenu` and `useContactForm` hooks and pass all their values to
          // the `Menu` component, like in `src/pages/courses/index.jsx`
          router.push(`/contacto?interested-in=${config.course.id}`)
      : openContact

  return (
    <>
      {config?.infoHead}
      <MainWrapper isBlack={true}>
        {/* {config?.hiddenTitle} */}
        <Menu
          actionText={actionText}
          contactFormParams={contactFormParams}
          handleText={handleTextClick}
          openCourses={openCourses}
          openContact={openContactView}
          course={pageName === COURSE_PAGE ? config.course : course}
          goToHome={goToHome}
          openCourse={openCourse}
          isBlack={true}
          isContactOpen={isContactOpen}
          areCoursesOpen={areCoursesOpen}
          isCourseOpen={isCourseOpen}
          courses={COURSES}
        />
      </MainWrapper>
    </>
  )
}

export default withMenu

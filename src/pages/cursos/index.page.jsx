import { COURSES_PAGE, MEDIA_QUERIES } from '../../constants'
import { withKonami, withMenu } from '../../hocs'
import { useWindowSize, useTranslations } from '../../hooks'

const Courses = () => {
  const formatMessage = useTranslations()

  const size = useWindowSize()
  const isDesktop = size.width >= MEDIA_QUERIES.desktop

  const hiddenTitle = isDesktop ? (
    <h1 className="sr-only">{formatMessage('courses:header')}</h1>
  ) : null

  return withMenu(COURSES_PAGE, {
    hiddenTitle,
    useMenuConfig: { defaultAreCoursesOpen: true },
  })
}

export default withKonami(Courses)

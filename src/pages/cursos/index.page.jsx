import { COURSES_PAGE, MEDIA_QUERIES } from '../../constants'
import { withKonami, withMenu } from '../../hocs'
import {
  useWindowSize,
  useTranslations,
  useBreadcrumbListSchema,
} from '../../hooks'
import InfoHead from '../../InfoHead'

const Courses = () => {
  const formatMessage = useTranslations()
  const { breadcrumbListSchema } = useBreadcrumbListSchema([
    {
      name: formatMessage('schema-breadcrumb-list:home-name'),
      url: formatMessage('url:root'),
    },
    {
      name: formatMessage('schema-breadcrumb-list:courses-name'),
      url: formatMessage('url:courses'),
    },
  ])

  const size = useWindowSize()
  const isDesktop = size.width >= MEDIA_QUERIES.desktop

  const infoHead = (
    <InfoHead
      title={formatMessage('info-head-courses:title')}
      description={formatMessage('info-head-courses:description')}
      url={formatMessage('url:courses')}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `${breadcrumbListSchema}`,
        }}
      />
    </InfoHead>
  )

  const hiddenTitle = isDesktop ? (
    <h1 className="sr-only">{formatMessage('courses:header')}</h1>
  ) : null

  return withMenu(COURSES_PAGE, {
    hiddenTitle,
    infoHead,
    useMenuConfig: { defaultAreCoursesOpen: true },
  })
}

export default withKonami(Courses)

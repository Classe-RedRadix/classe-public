import { useRouter } from 'next/router'

import PropTypes from 'prop-types'
import cx from 'classnames'

import {
  useSchema,
  useBreadcrumbListSchema,
  useCoursechema,
  useEducationalEventchema,
  useTranslations,
} from 'hooks'

import CookiesLayer from '../cookies/Cookies'
import InfoHead from 'InfoHead'

const getInfoHeadData = (routerAsPath, formatMessage, isCourseOpen, course) => {
  const { educationalOrganizationSchema, webSiteSchema, contactPageSchema } =
    useSchema()
  const { courseSchema } = useCoursechema(course)
  const { educationalEventSchema } = useEducationalEventchema(course)

  let infoHeadData = {}
  let infoHeadSchemaContent = []

  if (routerAsPath === '/') {
    infoHeadData = formatInfoHeadData('home', formatMessage)

    const { breadcrumbListSchema } = useBreadcrumbListSchema([
      {
        name: formatMessage('schema-breadcrumb-list:home-name'),
        url: formatMessage('url:root'),
      },
    ])

    infoHeadSchemaContent = [
      educationalOrganizationSchema,
      webSiteSchema,
      breadcrumbListSchema,
    ]
  } else if (routerAsPath.includes('/cursos')) {
    infoHeadData = formatInfoHeadData('courses', formatMessage)

    const { breadcrumbListSchema } = useBreadcrumbListSchema([
      {
        name: formatMessage('schema-breadcrumb-list:home-name'),
        url: formatMessage('url:root'),
      },
      {
        name: formatMessage('schema-breadcrumb-list:courses-name'),
        url: formatMessage('url:legal-terms'),
      },
    ])

    infoHeadSchemaContent = [breadcrumbListSchema]
    if (isCourseOpen) {
      infoHeadData = formatInfoHeadData('course', formatMessage, course)

      const { breadcrumbListSchema } = useBreadcrumbListSchema([
        {
          name: formatMessage('schema-breadcrumb-list:home-name'),
          url: formatMessage('url:root'),
        },
        {
          name: formatMessage('schema-breadcrumb-list:courses-name'),
          url: formatMessage('url:courses'),
        },
        {
          name: formatMessage(course.information.title),
          url: formatMessage('url:course', {
            course: course.href,
          }),
        },
      ])

      infoHeadSchemaContent = [
        courseSchema,
        educationalEventSchema,
        breadcrumbListSchema,
      ]
    }
  } else if (routerAsPath.includes('/contacto')) {
    infoHeadData = formatInfoHeadData('contact', formatMessage)

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

    infoHeadSchemaContent = [contactPageSchema, breadcrumbListSchema]
  } else if (routerAsPath === '/terminos-legales') {
    infoHeadData = {
      ...formatInfoHeadData('legal-terms', formatMessage),
      noIndex: true,
    }

    const { breadcrumbListSchema } = useBreadcrumbListSchema([
      {
        name: formatMessage('schema-breadcrumb-list:home-name'),
        url: formatMessage('url:root'),
      },
      {
        name: formatMessage('schema-breadcrumb-list:legal-terms-name'),
        url: formatMessage('url:legal-terms'),
      },
    ])

    infoHeadSchemaContent = [breadcrumbListSchema]
  } else if (routerAsPath === '/cookies') {
    infoHeadData = {
      ...formatInfoHeadData('cookies', formatMessage),
      noIndex: true,
    }

    const { breadcrumbListSchema } = useBreadcrumbListSchema([
      {
        name: formatMessage('schema-breadcrumb-list:home-name'),
        url: formatMessage('url:root'),
      },
      {
        name: formatMessage('schema-breadcrumb-list:cookies-name'),
        url: formatMessage('url:cookies'),
      },
    ])

    infoHeadSchemaContent = [breadcrumbListSchema]
  }

  return { infoHeadData, infoHeadSchemaContent }
}

const formatInfoHeadData = (domain, formatMessage, course = null) => {
  if (course && course !== null) {
    return {
      title: formatMessage(`info-head-${domain}:title`, {
        course: formatMessage(course.information.title),
      }),
      description: formatMessage(course?.information.metaDescription),
      url: `${formatMessage('url:root')}${course.href}`,
    }
  }
  return {
    title: formatMessage(`info-head-${domain}:title`),
    description: formatMessage(`info-head-${domain}:description`),
    url: formatMessage(`url:${getDomainUrl(domain)}`),
  }
}

const getDomainUrl = domain => {
  let domainUrl
  switch (domain) {
    case 'home':
      domainUrl = 'root'
      break
    default:
      domainUrl = domain
  }

  return domainUrl
}

const InfoHeadFilled = ({ isCourseOpen, course }) => {
  const router = useRouter()
  const routerAsPath = router.asPath

  const formatMessage = useTranslations()
  const { infoHeadData, infoHeadSchemaContent } = getInfoHeadData(
    routerAsPath,
    formatMessage,
    isCourseOpen,
    course,
  )

  return (
    <InfoHead
      title={infoHeadData.title}
      description={infoHeadData.description}
      url={infoHeadData.url}
      noindex={infoHeadData.noIndex}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `[${infoHeadSchemaContent}]`,
        }}
      />
    </InfoHead>
  )
}

const MainWrapper = ({
  extraClass,
  isBlack,
  isFluor,
  isLock,
  children,
  isCourseOpen,
  course,
}) => {
  const classes = cx('mainWrapper', `${extraClass ? extraClass : ''}`, {
    'is-black': isBlack,
    'is-fluor': isFluor,
    'is-lock': isLock,
  })
  return (
    <>
      <InfoHeadFilled isCourseOpen={isCourseOpen} course={course} />
      <div className={classes}>
        {children}
        <CookiesLayer isBlack={isBlack} />
      </div>
    </>
  )
}

MainWrapper.propTypes = {
  extraClass: PropTypes.string,
  isBlack: PropTypes.bool.isRequired,
  isFluor: PropTypes.bool,
  isLock: PropTypes.bool,
  children: PropTypes.node.isRequired,
  isCourseOpen: PropTypes.bool,
  course: PropTypes.object,
}

export default MainWrapper

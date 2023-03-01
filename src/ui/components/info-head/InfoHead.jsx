import { useRouter } from 'next/router'

import Head from 'next/head'
import PropTypes from 'prop-types'
import { CoursePropType } from 'ui/sharedProptypes'
import {
  useSchema,
  useBreadcrumbListSchema,
  useCoursechema,
  useEducationalEventchema,
  useTranslations,
} from '../../../hooks'

const getInfoHeadData = (routerAsPath, formatMessage, isCourseOpen, course) => {
  const { educationalOrganizationSchema, webSiteSchema, contactPageSchema } =
    useSchema()
  const { courseSchema } = useCoursechema(course)
  const { educationalEventSchema } = useEducationalEventchema(course)

  const breadcrumbItems = [
    {
      name: formatMessage('schema-breadcrumb-list:home-name'),
      url: formatMessage('url:root'),
    },
  ]

  if (routerAsPath === '/') {
    const { breadcrumbListSchema } = useBreadcrumbListSchema(breadcrumbItems)

    return {
      infoHeadData: formatInfoHeadData('home', formatMessage),
      infoHeadSchemaContent: [
        educationalOrganizationSchema,
        webSiteSchema,
        breadcrumbListSchema,
      ],
    }
  }

  if (routerAsPath.includes('/cursos')) {
    breadcrumbItems.push({
      name: formatMessage('schema-breadcrumb-list:courses-name'),
      url: formatMessage('url:courses'),
    })

    if (isCourseOpen) {
      breadcrumbItems.push({
        name: formatMessage(course.information.title),
        url: formatMessage('url:course', {
          course: course.href,
        }),
      })

      const { breadcrumbListSchema } = useBreadcrumbListSchema(breadcrumbItems)

      return {
        infoHeadData: formatInfoHeadData('course', formatMessage, course),
        infoHeadSchemaContent: [
          courseSchema,
          educationalEventSchema,
          breadcrumbListSchema,
        ],
      }
    }

    const { breadcrumbListSchema } = useBreadcrumbListSchema(breadcrumbItems)

    return {
      infoHeadData: formatInfoHeadData('courses', formatMessage),
      infoHeadSchemaContent: [breadcrumbListSchema],
    }
  }

  if (routerAsPath.includes('/contacto')) {
    breadcrumbItems.push({
      name: formatMessage('schema-breadcrumb-list:contact-name'),
      url: formatMessage('url:contact'),
    })

    const { breadcrumbListSchema } = useBreadcrumbListSchema(breadcrumbItems)

    return {
      infoHeadData: formatInfoHeadData('contact', formatMessage),
      infoHeadSchemaContent: [contactPageSchema, breadcrumbListSchema],
    }
  }

  if (routerAsPath === '/terminos-legales') {
    breadcrumbItems.push({
      name: formatMessage('schema-breadcrumb-list:legal-terms-name'),
      url: formatMessage('url:legal-terms'),
    })

    const { breadcrumbListSchema } = useBreadcrumbListSchema(breadcrumbItems)

    return {
      infoHeadData: {
        ...formatInfoHeadData('legal-terms', formatMessage),
        noIndex: true,
      },
      infoHeadSchemaContent: [breadcrumbListSchema],
    }
  }

  if (routerAsPath === '/cookies') {
    breadcrumbItems.push({
      name: formatMessage('schema-breadcrumb-list:cookies-name'),
      url: formatMessage('url:cookies'),
    })
    const { breadcrumbListSchema } = useBreadcrumbListSchema(breadcrumbItems)

    return {
      infoHeadData: {
        ...formatInfoHeadData('cookies', formatMessage),
        noIndex: true,
      },
      infoHeadSchemaContent: [breadcrumbListSchema],
    }
  }

  return { infoHeadData: {}, infoHeadSchemaContent: [] }
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

const InfoHead = ({ isCourseOpen, course }) => {
  const router = useRouter()
  const routerAsPath = router.asPath

  const formatMessage = useTranslations()
  const { infoHeadData, infoHeadSchemaContent } = getInfoHeadData(
    routerAsPath,
    formatMessage,
    isCourseOpen,
    course,
  )

  const { title, description, url, noIndex } = infoHeadData

  return (
    <Head>
      {noIndex ? (
        <meta name="robots" content="noindex" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      <title>{title}</title>
      <meta name="description" content={description} />

      <link rel="canonical" href={url} />

      <link rel="icon" href="favicon.svg" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={formatMessage('url:og-1200x1200')} />
      <meta property="og:image" content={formatMessage('url:og-921x518')} />
      <meta property="og:image" content={formatMessage('url:og-400x400')} />
      <meta property="og:image" content={formatMessage('url:og-256x256')} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta
        property="twitter:image"
        content={formatMessage('url:og-1200x1200')}
      />

      <link rel="manifest" href="manifest.json" />

      <meta name="theme-color" content="#000000" />

      <meta name="mobile-web-app-capable" content="yes" />

      <meta name="application-name" content="CLASS(E)" />

      <meta name="apple-mobile-web-app-capable" content="yes" />
      <link rel="apple-touch-icon" href="/favicon-192.png" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-title" content="CLASS(E)" />

      <meta
        name="msapplication-TileImage"
        content={formatMessage('url:favicon-144')}
      />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta
        name="google-site-verification"
        content="IiF5tRVBbvXxoDP8yt3ev6qYjogEIMCaLdE3naZsBog"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `[${infoHeadSchemaContent}]`,
        }}
      />

      <script
        defer
        dangerouslySetInnerHTML={{
          __html: `function loadScript(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("script");
        c.type="text/javascript",c.src="https://tracker.metricool.com/resources/be.js",c.onreadystatechange=a,c.onload=a,b.appendChild(c)}loadScript(function(){beTracker.t({hash:"8481bb5a130b69114db81bb62224995f"})});`,
        }}
      />
    </Head>
  )
}

InfoHead.propTypes = {
  isCourseOpen: PropTypes.bool,
  course: CoursePropType,
}

export default InfoHead

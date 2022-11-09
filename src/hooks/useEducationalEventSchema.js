import useTranslations from './useTranslations'

const formatDate = str => {
  const date = str.split('.')
  const day = date[0]
  const month = date[1]
  const year = date[2]

  return `20${year}-${month}-${day}`
}

const useEducationalEventchema = courseData => {
  const formatMessage = useTranslations()

  const course = {
    '@context': 'https://schema.org',
    '@type': 'EducationEvent',
    url: `${formatMessage('url:root')}${courseData.href}`,
    name: formatMessage(courseData.information.title),
    description: formatMessage(courseData.information.metaDescription),
    startDate: `${formatDate(courseData.information.start)}`,
    endDate: `${formatDate(courseData.information.finish)}`,
    startTime: `${formatDate(courseData.information.startTime)}`,
    endTime: `${formatDate(courseData.information.endTime)}`,
    location: {
      '@type': 'Place',
      name: formatMessage('schema-educational-event:location-name'),
      address: {
        '@type': 'PostalAddress',
        streetAddress: formatMessage('schema-contact-page:address'),
        postalCode: formatMessage('schema-contact-page:postal-code'),
        addressLocality: formatMessage('schema-contact-page:locality'),
        addressCountry: {
          '@type': 'Country',
          name: formatMessage('schema-contact-page:country'),
        },
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: formatMessage('schema-contact-page:latitude'),
        longitude: formatMessage('schema-contact-page:longitude'),
      },
    },
    organizer: {
      '@type': 'Organization',
      name: formatMessage('schema-educational-event:organitation-name'),
      url: formatMessage('url:root'),
    },
  }

  return {
    educationalEventSchema: JSON.stringify(course),
  }
}

export default useEducationalEventchema

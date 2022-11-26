import useTranslations from './useTranslations'

const formatDate = str => {
  const date = str.split('.')
  const day = date[0]
  const month = date[1]
  const year = date[2]

  return `20${year}-${month}-${day}`
}

const useCoursechema = courseData => {
  const formatMessage = useTranslations()

  const course = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    url: `${formatMessage('url:root')}${courseData.href}`,
    name: formatMessage(courseData.information.title),
    description: formatMessage(courseData.information.metaDescription),
    provider: {
      '@type': 'Organization',
      name: formatMessage('schema-educational-event:organitation-name'),
      url: formatMessage('url:root'),
    },
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        startDate: `${formatDate(courseData.information.start)}`,
        endDate: `${formatDate(courseData.information.finish)}`,
        // startTime: formatMessage(courseData.information.startTime),
        // endTime: formatMessage(courseData.information.endTime),
        eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventMovedOnline',
        offers: {
          '@type': 'Offer',
          url: `${formatMessage('url:root')}${courseData.href}`,
          price: courseData.information.price,
          priceCurrency: formatMessage('schema-course:price-currency'),
          availability: 'https://schema.org/OnlineOnly',
          validFrom: `${formatDate(courseData.information.start)}`,
        },
      },
    ],
  }

  return {
    courseSchema: JSON.stringify(course),
  }
}

export default useCoursechema

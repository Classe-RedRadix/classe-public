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
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        startDate: `${formatDate(courseData.information.start)}`,
        endDate: `${formatDate(courseData.information.finish)}`,
        startTime: `${formatDate(courseData.information.startTime)}`,
        endTime: `${formatDate(courseData.information.endTime)}`,
        offers: {
          '@type': 'Offer',
          price: courseData.information.price,
          priceCurrency: formatMessage('schema-course:price-currency'),
        },
      },
    ],
  }

  return {
    courseSchema: JSON.stringify(course),
  }
}

export default useCoursechema

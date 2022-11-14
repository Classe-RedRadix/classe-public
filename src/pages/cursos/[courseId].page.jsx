import { COURSE_PAGE } from '../../constants'
import { COURSES } from '../../data'
import { withKonami, withMenu } from '../../hocs'
import {
  useBreadcrumbListSchema,
  useCoursechema,
  useEducationalEventchema,
  useTranslations,
} from '../../hooks'
// import InfoHead from '../../InfoHead'

const Course = withKonami(({ course }) => {
  const formatMessage = useTranslations()
  const { courseSchema } = useCoursechema(course)
  const { educationalEventSchema } = useEducationalEventchema(course)
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

  // const infoHead = (
  //   <InfoHead
  //     title={formatMessage('info-head-course:title', {
  //       course: formatMessage(course.information.title),
  //     })}
  //     description={formatMessage(course.information.metaDescription)}
  //     url={`${formatMessage('url:root')}${course.href}`}
  //   >
  //     <script
  //       type="application/ld+json"
  //       dangerouslySetInnerHTML={{
  //         __html: `[${courseSchema}, ${educationalEventSchema}, ${breadcrumbListSchema}]`,
  //       }}
  //     />
  //   </InfoHead>
  // )

  return withMenu(COURSE_PAGE, {
    course,
    // infoHead,
    actionText: 'general:go-to-home',
    useMenuConfig: {
      defaultIsCourseOpen: true,
    },
  })
})

export async function getStaticPaths() {
  const paths = COURSES.map(course => ({
    params: { courseId: course.id },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const course = COURSES.find(course => course.id === params.courseId)

  return {
    props: { course },
  }
}

export default Course

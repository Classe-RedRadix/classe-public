import { COURSES } from '../data'

import { Course as CourseUI } from '../ui/views'

const dates = [
  {
    day: '01',
    month: 'Enero',
    courses: [
      {
        title: 'Próxima convocatoria',
        start: '16.01.21',
        finish: '27.02.21',
        to: '/',
      },
    ],
  },
]

const Course = ({ course }) => {
  const { information } = course

  console.log('Is this showing or something????')

  return (
    <CourseUI
      isBlack
      courses={COURSES}
      dates={dates}
      name={information.title}
      title="objetivosd"
    />
  )
}

export default Course
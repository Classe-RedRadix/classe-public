import PropTypes from 'prop-types'
import useTranslations from '../../../hooks/useTranslations'
import TabIcon from './../../../assets/icons/TabIcon'
import { CoursePropType } from '../../sharedProptypes'
import ConditionalWrapper from '../wrappers/ConditionalWrapper'

const CoursesList = ({ courses, openCourse, isPlacedAtHome }) => {
  const t = useTranslations()

  const handleCourseClick = (e, course) => {
    e.preventDefault()
    openCourse(course)
  }

  return (
    <div className="coursesList">
      {isPlacedAtHome ? null : (
        <h1 className="coursesList-title h2">{t('menu:courses')}</h1>
      )}
      <ol className="coursesList-list">
        {courses.map((course, index) => (
          <li key={t(course.information.title)}>
            <ConditionalWrapper
            condition={!isPlacedAtHome}
            wrapper={children => <h2>{children}</h2>}
            >
              <a
                className="coursesList-link h1"
                href={course.href}
                onClick={e => handleCourseClick(e, course)}
              >
                <span className="coursesList-linkTextWrapper">
                  <TabIcon color="red" className="icon" />
                  <span className="coursesList-linkText">
                    {t(course.information.title)}
                  </span>
                </span>
              </a>
            </ConditionalWrapper>
          </li>
        ))}
      </ol>
    </div>
  )
}

CoursesList.propTypes = {
  courses: PropTypes.arrayOf(CoursePropType.isRequired).isRequired,
  isPlacedAtHome: PropTypes.bool,
}

export default CoursesList

import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import MainWrapper from '../../components/wrappers/MainWrapper'
import Menu from '../../components/menu/Menu'
import Header from '../../components/header/Header'
import Manifest from '../../components/sections/Manifest'
import Courses from '../../components/sections/Courses'
import Custom from '../../components/sections/Custom'
import Featured from '../../components/sections/Featured'
import Facts from '../../components/sections/Facts'
import Calendar from '../../components/sections/Calendar'
import Companies from '../../components/sections/Companies'
import Faqs from '../../components/sections/Faqs'
import Find from '../../components/sections/Find'
import Footer from '../../components/footer/Footer'
import useTranslations from '../../../hooks/useTranslations'
import Hero from '../../components/hero/Hero'
import { useMenu } from '../../../hooks'
import {
  CoursePropType,
  ContactFormParamsPropType,
  FaqsListPropType,
} from './../../sharedProptypes'

const Home = ({
  isBlack,
  isFluor,
  isLock,
  courses,
  logos,
  faqsList,
  onContactFormSubmit,
  contactFormParams,
}) => {
  const formatMessage = useTranslations()
  const {
    areCoursesOpen,
    course,
    handleClose,
    openContact,
    openCourses,
    isContactOpen,
    isCourseOpen,
    openCourse,
  } = useMenu()

  // NOTE: we can search for the featured course directly because we only have
  // one featured course, so we don't need to search for a specific course id
  // or check if the course exists
  const featuredCourse = courses.find(course => course.isFeatured)

  const [loaded, setloaded] = useState(0)
  const [visible, setVisible] = useState(true)
  let hero
  const finishedLoading = () => {
    clearInterval(hero)
  }
  useEffect(() => {
    hero = setInterval(() => {
      setloaded(time => time + 10)
    }, 300)
    return () => finishedLoading()
  }, [])

  useEffect(() => {
    if (loaded >= 50) {
      finishedLoading()
      setVisible(false)
    }
  }, [loaded])

  return (
    <>
      <MainWrapper isBlack={isBlack} isFluor={isFluor} isLock={isLock}>
        {visible && <Hero text="loader:text" loaded={loaded} />}

        <Menu
          contactFormParams={contactFormParams}
          isBlack={isBlack}
          courses={courses}
          areCoursesOpen={areCoursesOpen}
          course={course}
          handleClose={handleClose}
          openContact={openContact}
          openCourses={openCourses}
          isContactOpen={isContactOpen}
          isCourseOpen={isCourseOpen}
          openCourse={openCourse}
        />
        <div className="blurableWrapper">
          <main>
            <Header title={formatMessage('manifest:header')} number={1} />
            <Manifest isBlack={isBlack} isFluor={isFluor} />
            <Header isClose title={formatMessage('manifest:header')} />

            <Header title={formatMessage('courses:header')} number={2} />
            <Courses
              courses={courses}
              isBlack={isBlack}
              isFluor={isFluor}
              openCourse={openCourse}
              openContact={openContact}
            />
            <Header isClose title={formatMessage('courses:header')} />

            <Header title={formatMessage('custom:header')} number={3} />
            <Custom
              isBlack={isBlack}
              isFluor={isFluor}
              openCourses={openCourses}
            />
            <Header isClose title={formatMessage('custom:header')} />

            <Header title={formatMessage('featured:header')} number={4} />
            <Featured
              isBlack={isBlack}
              isFluor={isFluor}
              course={featuredCourse}
              openCourse={openCourse}
            />
            <Header isClose title={formatMessage('featured:header')} />

            <Header title={formatMessage('facts:header')} number={5} />
            <Facts isBlack={isBlack} isFluor={isFluor} />
            <Header isClose title={formatMessage('facts:header')} />

            <Header title={formatMessage('calendar:header')} number={6} />
            <Calendar
              isBlack={isBlack}
              isFluor={isFluor}
              openContact={openContact}
            />
            <Header isClose title={formatMessage('calendar:header')} />

            <Header title={formatMessage('companies:header')} number={7} />
            <Companies
              logos={logos}
              isBlack={isBlack}
              isFluor={isFluor}
              openContact={openContact}
            />
            <Header isClose title={formatMessage('companies:header')} />

            <Header title={formatMessage('faqs:header')} number={8} />
            <Faqs isBlack={isBlack} isFluor={isFluor} list={faqsList} />
            <Header isClose title={formatMessage('faqs:header')} />

            <Header title={formatMessage('find:header')} number={9} />
            <Find isBlack={isBlack} isFluor={isFluor} />
            <Header isClose title={formatMessage('find:header')} />
          </main>
          <Footer
            courses={courses}
            isBlack={isBlack}
            isFluor={isFluor}
            onContactFormSubmit={onContactFormSubmit}
            contactFormParams={contactFormParams}
            openCourse={openCourse}
          />
        </div>
      </MainWrapper>
    </>
  )
}

Home.propTypes = {
  isBlack: PropTypes.bool,
  isFluor: PropTypes.bool,
  isLock: PropTypes.bool,
  courses: PropTypes.arrayOf(CoursePropType),
  logos: PropTypes.arrayOf(PropTypes.node),
  faqsList: FaqsListPropType,
  dates: Calendar.propTypes.dates,
  onContactFormSubmit: PropTypes.func,
  contactFormParams: ContactFormParamsPropType,
}

export default Home

import { useEffect, useRef, useMemo } from 'react'

import CourseIntro from '../../components/sections/course/CourseIntro'
import CourseTitle from '../../components/sections/course/CourseTitle'
import CourseSection from '../../components/sections/course/CourseSection'
import CourseSectionEmpty from '../../components/sections/course/CourseSectionEmpty'
import CourseObjectives from '../../components/sections/course/CourseObjectives'
import CourseInfo from '../../components/sections/course/CourseInfo'
import CourseContact from '../../components/sections/course/CourseContact'
import { COURSES } from '../../../data'
import useScrambleText from '../../../hooks/useScrambleText'
import useTranslations from '../../../hooks/useTranslations'
import CoursePdf from '../sections/course/CoursePdf'
import { MEDIA_QUERIES } from '../../../constants'

import useWindowSize from '../../../hooks/useWindowSize'

const MenuCourse = ({ course, openContact }) => {
  const formatMessage = useTranslations()
  useScrambleText()

  // HACK: here we have two posibilities:
  //  1. The user is navigating to the course directly with app links (no problem)
  //  2. The user is navigating to the course using the history (forwards or
  //     backwards).
  // If it's the second one, the `course` prop will be `null`, because the course
  // wouldn't be prefetched. To fix this, we have to check if the the course
  // exists, and if it not, find it using `window.location.href`. We have to
  // split the url by `/courses/` so the second element be the course id.
  let menuCourse
  if (course === null) {
    // TODO: `courses` shouldn't be a literal, it must be dynamic using translations
    const [_, courseId] = window.location.href.split('/courses/')

    menuCourse = COURSES.find(course => course.id === courseId)
  } else {
    menuCourse = Object.assign({}, course)
  }

  const { information, indexItems, objectives, href, dosier } = menuCourse

  const size = useWindowSize()
  const isDesktop = useMemo(() => size.width >= MEDIA_QUERIES.desktop, [size])

  const container = useRef(null)
  const courseIntro = useRef(null)
  const courseTitleHeader = useRef(null)
  useEffect(() => {
    const el = container.current
    const courseIntroEl = courseIntro.current
    const titleHeaderEl = courseTitleHeader.current

    if (!el || !courseIntroEl) return
    const widthIntro = courseIntroEl.offsetWidth

    const onWheel = e => {
      if (e.deltaY == 0) return
      e.preventDefault()
      el.scrollTo({
        left: el.scrollLeft + e.deltaY,
      })
      if (el.scrollLeft >= widthIntro) {
        titleHeaderEl.classList.add('is-visible')
      } else {
        titleHeaderEl.classList.remove('is-visible')
      }
    }

    if (isDesktop) {
      el.addEventListener('wheel', onWheel)
    } else {
      el.removeEventListener('wheel', onWheel)
    }
    return () => el.removeEventListener('wheel', onWheel)
  }, [isDesktop])

  return (
    <>
      <p className="courseTitle-header" ref={courseTitleHeader}>
        {formatMessage(information.title)}
      </p>
      <div className="courseSections" ref={container}>
        <CourseIntro
          dateStart={information.start}
          dateFinish={information.finish}
          schedule={information.schedule}
          name={information.titleModal}
          image={information.image}
          openContact={openContact}
          course={menuCourse}
          description={information.description}
          ref={courseIntro}
        />
        <CourseTitle title={formatMessage('course:index-title')} />
        {indexItems.map((indexItem, index) => (
          <>
            <CourseSection
              key={index}
              number={indexItem.number}
              text={indexItem.description}
              title={indexItem.name}
            />
            <CourseSectionEmpty key={`0${index + 1}`} />
          </>
        ))}
        <CoursePdf
          title={formatMessage('course:pdf-title')}
          href={dosier}
          textButton={formatMessage('course:pdf-button')}
        />
        <CourseSectionEmpty />

        <CourseTitle title={formatMessage('course:objectives-title')} />
        <CourseObjectives
          learn={objectives.learn}
          text={objectives.text}
          objectives={objectives.objectives}
          objectivesText={objectives.objectivesText}
        />
        <CourseInfo
          price={information.price}
          hours={information.hours}
          places={information.places}
          practical={information.practical}
          isPublic={course.isPublic}
          openContact={openContact}
        />
        <CourseTitle title={formatMessage('footer:contact')} />
        <CourseContact openContact={openContact} />
      </div>
    </>
  )
}

export default MenuCourse

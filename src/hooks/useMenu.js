import { useCallback, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const useMenu = ({
  defaultIsContactOpen = false,
  defaultAreCoursesOpen = false,
  defaultIsCourseOpen = false,
  defaultCourse = null,
} = {}) => {
  const router = useRouter()

  const [isContactOpen, setIsContactOpen] = useState(defaultIsContactOpen)
  const [areCoursesOpen, setAreCoursesOpen] = useState(defaultAreCoursesOpen)
  const [isCourseOpen, setIsCourseOpen] = useState(defaultIsCourseOpen)
  const [course, setCourse] = useState(defaultCourse)

  const goToHome = () => {
    router.push('/')
  }

  const openCourses = () => {
    setIsContactOpen(false)
    setIsCourseOpen(false)
    setAreCoursesOpen(true)

    router.push(router.pathname, '/cursos')
  }

  const openContact = (_, interestedIn) => {
    setAreCoursesOpen(false)
    setIsCourseOpen(false)
    setIsContactOpen(true)

    const path =
      interestedIn !== undefined
        ? {
            name: `${router.pathname}?interested-in=${interestedIn}`,
            as: `/contacto?interested-in=${interestedIn}`,
          }
        : { name: router.pathname, as: '/contacto' }

    router.push(path.name, path.as)
  }

  const handleClose = () => {
    const prevPage = sessionStorage.getItem('prev-page')

    if (isCourseOpen && prevPage === '/cursos') {
      setIsContactOpen(false)
      setAreCoursesOpen(true)
      setIsCourseOpen(false)

      router.back()
      return
    }

    setIsContactOpen(false)
    setAreCoursesOpen(false)
    setIsCourseOpen(false)

    router.push('/')
  }

  const openCourse = useCallback(
    course => {
      setIsCourseOpen(true)
      setIsContactOpen(false)
      setAreCoursesOpen(false)
      setCourse(course)

      router.push(router.pathname, course.href)
    },
    [course],
  )

  useEffect(() => {
    // HACK: since we are using a navigation like Twitter, we have to handle
    // the `history back` action. This will allow us to navigate with the
    // history (forwards and backwards) and show the correct page.
    // TODO: we can't compare with literals, we must compare using translations
    const handlePopState = event => {
      if (event.state.as === '/') {
        setIsContactOpen(false)
        setAreCoursesOpen(false)
        setIsCourseOpen(false)
      } else if (event.state.as === '/cursos') {
        setIsCourseOpen(false)
        setIsContactOpen(false)
        setAreCoursesOpen(true)
      } else if (
        event.state.as === '/contacto' ||
        event.state.as.includes('interested-in')
      ) {
        setIsCourseOpen(false)
        setAreCoursesOpen(false)
        setIsContactOpen(true)
      } else {
        setIsContactOpen(false)
        setAreCoursesOpen(false)
        setIsCourseOpen(true)
      }
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  return {
    isContactOpen,
    areCoursesOpen,
    isCourseOpen,
    course,
    goToHome,
    openCourses,
    openContact,
    handleClose,
    openCourse,
  }
}

export default useMenu

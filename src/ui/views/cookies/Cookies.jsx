import { useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import { useMenu } from '../../../hooks'
import {
  CoursePropType,
  ContactFormParamsPropType,
} from './../../sharedProptypes'
import useTranslations from '../../../hooks/useTranslations'

import MainWrapper from '../../components/wrappers/MainWrapper'
import SectionWrapper from '../../components/wrappers/SectionWrapper'

import Menu from '../../components/menu/Menu'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Row from '../../components/row/Row'
import Cell from '../../components/cell/Cell'

const Cookies = ({
  isBlack,
  isFluor,
  isLock,
  courses,
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

  const [pageTitle, setPageTitle] = useState(
    !areCoursesOpen && !isCourseOpen && !isContactOpen,
  )

  const interceptHandler = useCallback(
    callback => {
      callback()
      setTimeout(() => setPageTitle(pageTitle => !pageTitle), 1000)
    },
    [pageTitle],
  )

  return (
    <MainWrapper
      isBlack={isBlack}
      isFluor={isFluor}
      isLock={isLock}
      extraClass="legalView"
      course={course}
      isCourseOpen={isCourseOpen}
    >
      <Menu
        hasPageTitle={pageTitle}
        contactFormParams={contactFormParams}
        isBlack={isBlack}
        courses={courses}
        areCoursesOpen={areCoursesOpen}
        course={course}
        isContactOpen={isContactOpen}
        isCourseOpen={isCourseOpen}
        handleClose={handleClose}
        openContact={() => interceptHandler(openContact)}
        openCourses={() => interceptHandler(openCourses)}
        openCourse={openCourse}
      />
      <div className="blurableWrapper">
        <SectionWrapper isBlack={isBlack} isFluor={isFluor}>
          <Row type="full">
            <Cell isColumn>
              <Cell isNegative={isBlack}>
                {pageTitle ? (
                  <div className="scrambleTextWrapper">
                    <h1 className="h1 scrambleText">
                      {formatMessage('cookies-policy:title', {
                        line: text => <span className="line">{text}</span>,
                        lineTab: text => (
                          <span className="line has-tab">{text}</span>
                        ),
                      })}
                    </h1>
                  </div>
                ) : null}
              </Cell>
            </Cell>
          </Row>
          <Row type="full">
            <Cell isColumn>
              <Cell hasGap isNegative={isBlack}>
                <p className="p">{formatMessage('cookies-policy:block-1')}</p>
                <p className="p">{formatMessage('cookies-policy:block-2')}</p>
                <h2 className="h4">
                  {formatMessage('cookies-policy:subtitle')}
                </h2>
                <p className="p">{formatMessage('cookies-policy:block-3')}</p>
                <p className="p">{formatMessage('cookies-policy:block-4')}</p>
                <p className="p">{formatMessage('cookies-policy:block-5')}</p>
              </Cell>
            </Cell>
          </Row>
        </SectionWrapper>
        <Footer
          courses={courses}
          isBlack={isBlack}
          isFluor={isFluor}
          onContactFormSubmit={onContactFormSubmit}
          contactFormParams={contactFormParams}
          openCourse={openCourse}
        />
        <Header isClose title={formatMessage('footer:header')} />
      </div>
    </MainWrapper>
  )
}

Cookies.propTypes = {
  isBlack: PropTypes.bool,
  isFluor: PropTypes.bool,
  isLock: PropTypes.bool,
  courses: PropTypes.arrayOf(CoursePropType),

  onContactFormSubmit: PropTypes.func,
  contactFormParams: ContactFormParamsPropType,
}

export default Cookies

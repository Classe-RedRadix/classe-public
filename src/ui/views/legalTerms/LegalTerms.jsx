import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// import { COURSES } from 'data'
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

const LegalTerms = ({
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

  return (
    <MainWrapper
      isBlack={isBlack}
      isFluor={isFluor}
      isLock={isLock}
      extraClass="legalView"
    >
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
        <SectionWrapper isBlack={isBlack} isFluor={isFluor}>
          <Row type="full">
            <Cell isColumn>
              <Cell isNegative={isBlack}>
                <div className="scrambleTextWrapper">
                  <h1 className="h1 scrambleText">
                    {formatMessage('legal-terms:title', {
                      line: text => <span className="line">{text}</span>,
                      lineTab: text => (
                        <span className="line has-tab">{text}</span>
                      ),
                    })}
                  </h1>
                </div>
              </Cell>
            </Cell>
          </Row>
          <Row type="full">
            <Cell isColumn>
              <Cell hasGap isNegative={isBlack}>
                <h2 className="h3 ">
                  {formatMessage('legal-terms:section01-title')}
                </h2>
                <h3 className="h4">
                  {formatMessage('legal-terms:section01-sub01')}
                </h3>
                <p className="p">
                  {formatMessage('legal-terms:section01-sub01-block-1')}
                </p>

                <h3 className="h4">
                  {formatMessage('legal-terms:section01-sub02')}
                </h3>
                <p className="p">
                  {formatMessage('legal-terms:section01-sub02-block-1')}
                </p>
                <p className="p">
                  {formatMessage('legal-terms:section01-sub02-block-2')}
                </p>

                <h2 className="h3">
                  {formatMessage('legal-terms:section02-title')}
                </h2>

                <p className="p">
                  {formatMessage('legal-terms:section02-block-1')}
                </p>
                <p className="p">
                  {formatMessage('legal-terms:section02-block-2')}
                </p>
                <p className="p">
                  {formatMessage('legal-terms:section02-block-3')}
                </p>
                <p className="p">
                  {formatMessage('legal-terms:section02-block-4')}
                </p>
                <p className="p">
                  {formatMessage('legal-terms:section02-block-5')}
                </p>
                <p className="p">
                  {formatMessage('legal-terms:section02-block-6')}
                </p>
                <p className="p">
                  {formatMessage('legal-terms:section02-block-7')}
                </p>
                <p className="p">
                  {formatMessage('legal-terms:section02-block-8')}
                </p>
                <p className="p">
                  {formatMessage('legal-terms:section02-block-9')}
                </p>
                <p className="p">
                  {formatMessage('legal-terms:section02-block-10', {
                    mailto: text => (
                      <a href="mailto:info@redradix.com">{text}</a>
                    ),
                  })}
                </p>
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

LegalTerms.propTypes = {
  isBlack: PropTypes.bool,
  isFluor: PropTypes.bool,
  isLock: PropTypes.bool,
  courses: PropTypes.arrayOf(CoursePropType),

  onContactFormSubmit: PropTypes.func,
  contactFormParams: ContactFormParamsPropType,
}

export default LegalTerms

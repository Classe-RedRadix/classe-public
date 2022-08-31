import React from 'react'
import PropTypes from 'prop-types'
import SectionWrapper from '../../wrappers/SectionWrapper'
import Row from '../../row/Row'
import Cell from '../../cell/Cell'
import useTranslations from '../../../../hooks/useTranslations'
import Paragraphs from '../../paragraphs/Paragraphs'
const CourseSection = ({ number, text, title }) => {
  const formatMessage = useTranslations()

  return (
    <SectionWrapper isBlack extraClass="courseSection">
      <Row type="full" extraClass="courseSection-number">
        <Cell isNegative>
          <h3 className="h1" aria-hidden="true">
            {number}
          </h3>
          <p className="courseSection-text">{formatMessage(text)}</p>
        </Cell>
      </Row>
      <Row type="full" extraClass="courseSection-title">
        <Cell isNegative>
          {title ? (
            <h3 className="h3 ">
              {formatMessage(title, {
                line: text => <span className="line">{text}</span>,
                lineAriaHidden: text => (
                  <span className="line" aria-hidden="true">
                    {text}
                  </span>
                ),
                screenReadOnly: text => <span className="sr-only">{text}</span>,
              })}
            </h3>
          ) : null}
        </Cell>
      </Row>
    </SectionWrapper>
  )
}

CourseSection.propTypes = {
  number: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
}

export default CourseSection

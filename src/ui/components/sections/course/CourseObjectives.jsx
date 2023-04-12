import React from 'react'
import PropTypes from 'prop-types'
import SectionWrapper from '../../wrappers/SectionWrapper'
import Row from '../../row/Row'
import Cell from '../../cell/Cell'

import Paragraphs from '../../paragraphs/Paragraphs'
import useTranslations from '../../../../hooks/useTranslations'

const CourseObjectives = ({ learn, text, objectives, objectivesText }) => {
  const formatMessage = useTranslations()

  return (
    <SectionWrapper
      isBlack
      extraClass="courseSection courseSection--objectives"
    >
      <Row type="full" extraClass="courseSection-number">
        <Cell isNegative>
          <div className="scrambleTextWrapper">
            <h3 className="h3 scrambleText">
              {formatMessage(learn, {
                line: text => <span>{text}</span>,
                lineAriaHidden: text => <span aria-hidden="true">{text}</span>,
                screenReadOnly: text => <span className="sr-only">{text}</span>,
              })}
            </h3>
          </div>
          <div className="courseSection-text">
            <Paragraphs text={formatMessage(text)} />
          </div>
        </Cell>
      </Row>
      <Row type="full" extraClass="courseSection-title">
        <Cell isNegative>
          <div className="scrambleTextWrapper">
            <h3 className="h3 scrambleText">
              {formatMessage(objectives, {
                line: text => <span>{text}</span>,
                lineAriaHidden: text => <span aria-hidden="true">{text}</span>,
                screenReadOnly: text => <span className="sr-only">{text}</span>,
              })}
            </h3>
          </div>
          <Paragraphs text={formatMessage(objectivesText)} />
        </Cell>
      </Row>
    </SectionWrapper>
  )
}

CourseObjectives.propTypes = {
  learn: PropTypes.string,
  text: PropTypes.string,
  objectives: PropTypes.string,
  objectivesText: PropTypes.string,
}

export default CourseObjectives

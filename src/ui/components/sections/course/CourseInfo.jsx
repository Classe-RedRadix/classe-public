import React from 'react'
import PropTypes from 'prop-types'
import SectionWrapper from '../../wrappers/SectionWrapper'
import Row from '../../row/Row'
import Cell from '../../cell/Cell'
import useTranslations from '../../../../hooks/useTranslations'
import ExclamationIcon from './../../../../assets/icons/ExclamationIcon'

const CourseInfo = ({ price, hours, places, practical }) => {
  const formatMessage = useTranslations()

  return (
    <SectionWrapper isBlack extraClass="courseSection courseSection--info">
      <Row type="full" extraClass="courseSection-number">
        <Cell isNegative>
          <h3 className="h2">
            {formatMessage('course:euros', {
              line: text => (
                <span className="line">
                  {price} {text}
                </span>
              ),
            })}
          </h3>
          <h3 className="h2">
            {formatMessage('course:hours', {
              line: text => (
                <span className="line">
                  {hours} {text}
                </span>
              ),
            })}
          </h3>
          <h3 className="h2">
            {formatMessage('course:places', {
              line: text => (
                <span className="line">
                  {places} {text}
                </span>
              ),
            })}
          </h3>

          <h3 className="h2">
            {formatMessage('course:practical', {
              line: text => (
                <span className="line">
                  {practical}
                  {text}
                </span>
              ),
            })}
          </h3>
        </Cell>
      </Row>
      <Row type="full" extraClass="courseSection-title">
        <Cell isNegative>
          <ExclamationIcon className="icon courseSection-glypBottom" />
        </Cell>
      </Row>
    </SectionWrapper>
  )
}

CourseInfo.propTypes = {
  price: PropTypes.number.isRequired,
  hours: PropTypes.number.isRequired,
  places: PropTypes.number.isRequired,
  practical: PropTypes.number.isRequired,
}

export default CourseInfo

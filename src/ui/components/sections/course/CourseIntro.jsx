import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import SectionWrapper from '../../wrappers/SectionWrapper'
import Row from '../../row/Row'
import Cell from '../../cell/Cell'
import Button from '../../button/Button'
import Paragraphs from '../../paragraphs/Paragraphs'
import TabIcon from './../../../../assets/icons/TabIcon'
import DatePicker from '../../date-picker/DatePicker'
import { useTranslations, useGenerateImageCandidates } from '../../../../hooks'
import { DatesPropType } from './../../../sharedProptypes'

const Course = React.forwardRef(
  (
    { dates, name, image, description, openContact, course },
    refCourseIntro,
  ) => {
    const formatMessage = useTranslations()
    const refTitle = useRef(null)

    const marquee = (selector, speed) => {
      const clone = selector.innerHTML

      for (let index = 0; index < 3; index++) {
        selector.insertAdjacentHTML(
          'afterend',
          `<p class="courseIntro-nameText" aria-hidden="true">${clone}</p>`,
        )
      }
      let i = 0
      const interval = setInterval(() => {
        selector.style.marginLeft = `-${i}px`
        i = i + speed
        if (i > selector.clientWidth + 60) {
          i = 0
        }
      }, 0)
      return interval
    }

    useEffect(() => {
      const interval = marquee(refTitle.current, 0.3)
      return () => clearInterval(interval)
    }, [])

    return (
      <div ref={refCourseIntro}>
        <SectionWrapper isBlack extraClass="courseIntro">
          <Row type="full" extraClass="courseIntro-name">
            <Cell isNegative>
              <div className="courseIntro-name-wrapper">
                <h1 className="courseIntro-nameText" ref={refTitle}>
                  <TabIcon className="courseIntro-tab" aria-hidden="true" />
                  {formatMessage(name)}
                </h1>
              </div>
            </Cell>
          </Row>
          <Row type="half" extraClass="courseIntro-data">
            <Cell isNegative>
              <picture>
                <source
                  sizes={image.sizes}
                  srcSet={useGenerateImageCandidates(image.srcSetWebp)}
                  type="image/webp"
                />
                <img
                  src={image.mainImage}
                  alt={formatMessage(image.alt)}
                  width={image.width}
                  height={image.height}
                  sizes={image.sizes}
                  srcSet={useGenerateImageCandidates(image.srcSet)}
                  loading="lazy"
                  className="image"
                />
              </picture>
            </Cell>

            {/**
             * TODO: when the course is private, fix the layout with the correct
             * layout
             */}
            <Cell isColumn isNegative>
              {course.isPublic ? (
                <Cell isNegative>
                  <DatePicker dates={dates} isCourse />
                </Cell>
              ) : (
                <Cell isNegative>
                  <div className="courseIntro-help">
                    <p>{formatMessage('course:need-more-details')}</p>
                    <Button
                      isNegative
                      onClick={openContact}
                      text={formatMessage('course:contact-us')}
                    />
                  </div>
                </Cell>
              )}
              <Cell isNegative extraClass="cell-description">
                <div className="courseIntro-description">
                  <Paragraphs text={formatMessage(description)} />
                </div>
                <div className="courseIntro-actions">
                  {/**
                   * TODO: add the `href` attribute to provide the link the course
                   * route to the contact page (e.g. `/contact/interested-in=js-pro`,
                   * `/contact/interested-in=full-stack`)
                   * Now it's working, but we should implement it for SEO
                   */}
                  {course.isPublic ? (
                    <Button
                      isNegative
                      onClick={openContact}
                      text={formatMessage('course:button')}
                    />
                  ) : null}
                  <div className="arrow-container">
                    <span className="p uppercase">Scroll o drag</span>
                    <span className="arrow-icon"></span>
                  </div>
                </div>
              </Cell>
            </Cell>
          </Row>
        </SectionWrapper>
      </div>
    )
  },
)

Course.propTypes = {
  dates: DatesPropType,
  name: PropTypes.string.isRequired,
  openContact: PropTypes.func,
}

export default Course

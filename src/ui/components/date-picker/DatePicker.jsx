import React, { useCallback, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import gsap from 'gsap'
import { ScrambleTextPlugin } from 'gsap/dist/ScrambleTextPlugin'
import useTranslations from '../../../hooks/useTranslations'
import Button from '../button/Button'
import ArrowIcon from './../../../assets/icons/ArrowIcon'
import { DatesPropType } from './../../sharedProptypes'

const DatePicker = ({ dates, isCourse, openContact }) => {
  const t = useTranslations()
  gsap.registerPlugin(ScrambleTextPlugin)
  const dayRef = useRef(null)
  const monthRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHidden, setIsHidden] = useState(false)
  const currentDate = dates[currentIndex]
  const classes = cx(
    'datePicker',
    { 'is-hidden': isHidden },
    { 'datePicker--course': isCourse },
  )

  const setDate = currentIndex => {
    if (dayRef.current)
      gsap.to(dayRef.current, {
        duration: 1.2,
        scrambleText: {
          text: dates[currentIndex].day,
          chars: '!@#$%&/=*',
        },
      })
    gsap.to(monthRef.current, {
      duration: 1.2,
      scrambleText: {
        text: dates[currentIndex].month,
        chars: '!@#$%&/=*',
      },
    })
  }

  const chageDate = useCallback(
    isPrev => {
      const prevNewCurrentIndex =
        currentIndex > 0 ? currentIndex - 1 : dates.length - 1
      const NextNewCurrentIndex =
        currentIndex < dates.length - 1 ? currentIndex + 1 : 0
      setDate(isPrev ? prevNewCurrentIndex : NextNewCurrentIndex)
      setIsHidden(true)
      setTimeout(() => {
        setCurrentIndex(isPrev ? prevNewCurrentIndex : NextNewCurrentIndex)
        setIsHidden(false)
      }, 600)
    },
    [currentIndex],
  )

  return (
    <div className={classes}>
      {!isCourse ? (
        <div className="datePicker-date">
          {currentDate.day ? (
            <span className="datePicker-dateText h3" ref={dayRef}>
              {currentDate.day}
            </span>
          ) : null}
          <span className="datePicker-dateText h3" ref={monthRef}>
            {currentDate.month}
          </span>
          <div className="datePicker-arrows">
            <ArrowIcon className="icon" onClick={() => chageDate(true)} />
            <ArrowIcon className="icon" onClick={() => chageDate(false)} />
          </div>
        </div>
      ) : null}
      <div className="datePicker-carousel">
        {currentDate.courses.map(course => (
          <div className="datePicker-courseWrapper" key={course.title}>
            <div className="datePicker-course h3">
              {`{`}
              <span className="datePicker-courseTitle">{course.title}</span>
              <div className="datePicker-courseDates">
                <span className="notes">
                  {t('calendar:start')}: {course.start};
                </span>
                <span className="notes">
                  {t('calendar:finish')}: {course.finish};
                </span>
              </div>
              {`}`}
            </div>
            {!isCourse ? (
              <Button
                isLink
                href={`/contacto?interested-in=${course.id}`}
                onClick={_ => {
                  openContact(_, course.id)
                }}
                text="Inscríbeme"
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

DatePicker.propTypes = {
  dates: DatesPropType,
  isCourse: PropTypes.bool,
  openContact: PropTypes.func,
}

export default DatePicker

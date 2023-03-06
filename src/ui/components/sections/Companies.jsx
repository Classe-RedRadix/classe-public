import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import useTranslations from '../../../hooks/useTranslations'
import SectionWrapper from '../wrappers/SectionWrapper'
import Row from '../row/Row'
import Cell from '../cell/Cell'
import Button from '../button/Button'

const Companies = ({ logos, isBlack, isFluor, openContact }) => {
  gsap.registerPlugin(ScrollTrigger)
  const t = useTranslations()

  useEffect(() => {
    const wrappers = document.querySelectorAll('.companies-logoWrapper')
    gsap.from(wrappers, {
      filter: 'blur(6px)',
      opacity: 0,
      duration: 0.4,
      stagger: 0.1,
      scrollTrigger: {
        scroller: '.mainWrapper',
        trigger: '.sectionWrapper.companies',
        start: 'top 75%',
      },
    })
  }, [])

  return (
    <SectionWrapper isBlack={isBlack} isFluor={isFluor} extraClass="companies">
      <Row type="half">
        <Cell hasGap>
          <div className="scrambleTextWrapper">
            <h2 className="h1 scrambleText">
              {t('companies:title', {
                line: text => <span className="line">{text}</span>,
                lineAriaHidden: text => (
                  <span className="line" aria-hidden="true">
                    {text}
                  </span>
                ),
                lineTab: text => <span className="line has-tab">{text}</span>,
                lineTabAriaHidden: text => (
                  <span className="line has-tab" aria-hidden="true">
                    {text}
                  </span>
                ),
                screenReadOnly: text => <span className="sr-only">{text}</span>,
              })}
            </h2>
          </div>
          <Button
            isFull
            isLink
            href="/"
            text={t('companies:button')}
            onClick={openContact}
          />
        </Cell>
        <Cell>
          {logos.map((logo, index) => (
            <div className="companies-logoWrapper" key={index}>
              <div className="companies-logoWrapper-container">
                <img src={logo.src} alt="" loading="lazy" />
              </div>
            </div>
          ))}
        </Cell>
      </Row>
    </SectionWrapper>
  )
}

Companies.propTypes = {
  logos: PropTypes.arrayOf(PropTypes.node).isRequired,
  isBlack: PropTypes.bool.isRequired,
  isFluor: PropTypes.bool.isRequired,
  openContact: PropTypes.func,
}

export default Companies

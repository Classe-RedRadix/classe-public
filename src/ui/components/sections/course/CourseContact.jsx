import React from 'react'
import PropTypes from 'prop-types'
import SectionWrapper from '../../wrappers/SectionWrapper'
import Row from '../../row/Row'
import Cell from '../../cell/Cell'
import Button from '../../button/Button'
import { useTranslations, useGenerateImageCandidates } from '../../../../hooks'
import { IMAGES } from '../../../../data'
import Glyph from '../../../../assets/icons/GlyphIcon'

const CourseContact = ({ openContact }) => {
  const t = useTranslations()

  const contactImage = IMAGES.CONTACT_IMAGE

  return (
    <SectionWrapper isBlack extraClass="courseSection courseSection--contact">
      <Row type="full" extraClass="courseSection-number">
        <Cell isNegative>
          <h3 className="h3">{t('course:contact')}</h3>
          <Button
            isNegative
            onClick={openContact}
            text={t('course:contact-us')}
          />
        </Cell>
      </Row>
      <Row type="half" extraClass="courseSection-title">
        <Cell isNegative>
          <Glyph viewBox="0 0 56 73" className="courseSection-glypTop" />

          <address>
            <h3 className="heading menuLayer-contactAddressText">
              {t('contact:address1', {
                line: text => <span className="line">{text}</span>,
              })}
            </h3>
            <a
              className="heading menuLayer-contactAddressText"
              href={`mailto:${t('schema-contact-page:email')}`}
              target="_blank"
            >
              {t('contact:address2', {
                lineAriaHidden: text => (
                  <span className="line" aria-hidden="true">
                    {text}
                  </span>
                ),
                screenReadOnly: text => <span className="sr-only">{text}</span>,
              })}
            </a>
          </address>
        </Cell>
        <Cell isNegative>
          <img
            src={contactImage.mainImage}
            alt={t(contactImage.alt)}
            width={contactImage.width}
            height={contactImage.height}
            sizes={contactImage.sizes}
            srcSet={useGenerateImageCandidates(contactImage.srcSet)}
            loading="lazy"
            className="image"
          />
        </Cell>
      </Row>
    </SectionWrapper>
  )
}

CourseContact.propTypes = {
  openContact: PropTypes.func,
}

export default CourseContact

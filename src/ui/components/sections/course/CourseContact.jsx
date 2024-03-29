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
            <a
              className="heading menuLayer-contactAddressText"
              href={t('contact:address-link')}
              target="_blank"
            >
              {t('contact:address1', {
                line: text => <span className="line">{text}</span>,
              })}
            </a>
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
          <picture>
            <source
              sizes={contactImage.sizes}
              srcSet={useGenerateImageCandidates(contactImage.srcSetWebp)}
              type="image/webp"
            />
            <img
              src={contactImage.mainImage.src}
              alt={t(contactImage.alt)}
              width={contactImage.width}
              height={contactImage.height}
              sizes={contactImage.sizes}
              srcSet={useGenerateImageCandidates(contactImage.srcSet)}
              loading="lazy"
              className="image"
            />
          </picture>
        </Cell>
      </Row>
    </SectionWrapper>
  )
}

CourseContact.propTypes = {
  openContact: PropTypes.func,
}

export default CourseContact

import React, { useEffect, useState } from 'react'

import { setCookie, hasCookie } from 'cookies-next'

import cx from 'classnames'

import useTranslations from '../../../hooks/useTranslations'

import Button from '../button/Button'

const CookiesLayer = () => {
  const formatMessage = useTranslations()

  const [consent, setConsent] = useState(true)

  useEffect(() => {
    setConsent(hasCookie('localConsent'))
  }, [])

  const handleRefuse = () => {
    setConsent(true)
    setCookie('localConsent', 'false', { maxAge: 60 * 60 * 24 * 365 })
  }

  const handleAccept = () => {
    setConsent(true)
    setCookie('localConsent', 'true', { maxAge: 60 * 60 * 24 * 365 })
    gtag('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
    })
  }

  return (
    <div
      className={cx('cookiesLayer', { 'is-visible': !consent })}
      role="dialog"
      aria-label={formatMessage('cookies-layer:aria-label')}
    >
      <p className="cookiesLayer-title">
        {formatMessage('cookies-layer:title')}
      </p>
      <p className="p">
        {formatMessage('cookies-layer:description', {
          link: text => (
            <a className="cookiesLayer-link" href="/cookies" target="_blank">
              {text}
            </a>
          ),
        })}
      </p>

      <div className="cookiesLayer-controls">
        <Button
          isNegative
          text={formatMessage('cookies-layer:button-refuse')}
          onClick={handleRefuse}
        />
        <Button
          text={formatMessage('cookies-layer:button-accept')}
          onClick={handleAccept}
        />
      </div>
    </div>
  )
}

export default CookiesLayer

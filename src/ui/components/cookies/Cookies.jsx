import React, { useEffect, useState } from 'react'
import cx from 'classnames'

import TagManager from 'react-gtm-module'

import useTranslations from '../../../hooks/useTranslations'

import Button from '../button/Button'

const CookiesLayer = () => {
  const formatMessage = useTranslations()

  const [isVisibleCookies, setIsVisibleCookies] = useState(false)
  const [isAcceptedCookies, setIsAcceptedCookies] = useState(false)

  const classes = cx('cookiesLayer', { 'is-visible': isVisibleCookies })

  const handleRefuse = () => {
    window.localStorage.setItem('cookies-accepted', false)
    setIsVisibleCookies(false)
  }

  const handleAccept = () => {
    window.localStorage.setItem('cookies-accepted', true)
    setIsVisibleCookies(false)
    setIsAcceptedCookies(true)
  }

  useEffect(() => {
    if (window.localStorage.getItem('cookies-accepted') === null) {
      setIsVisibleCookies(true)
    }
  }, [])

  useEffect(() => {
    if (isAcceptedCookies) {
      TagManager.initialize({
        gtmId: 'GTM-NJ9F4NB',
      })
    }
  }, [isAcceptedCookies])

  return (
    <div
      className={classes}
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

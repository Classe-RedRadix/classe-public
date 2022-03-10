import Head from 'next/head'
import React from 'react'
import PropTypes from 'prop-types'
import useTranslations from './hooks/useTranslations'

const InfoHead = ({ title, description, url, children }) => {
  const formatMessage = useTranslations()

  return (
    <Head>
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />

      <title>{title}</title>
      <meta name="description" content={description} />

      <link rel="canonical" href={url} />

      <link rel="icon" href="/favicon-512.png" sizes="512x512" />
      <link rel="icon" href="/favicon-192.png" sizes="192x192" />
      <link rel="icon" href="/favicon-144.png" sizes="144x144" />
      <link rel="icon" href="/favicon-96.png" sizes="96x96" />
      <link rel="icon" href="/favicon-72.png" sizes="72x72" />
      <link rel="icon" href="/favicon-48.png" sizes="48x48" />

      <link rel="apple-touch-icon" href="/favicon-192.png" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={formatMessage('url:og-1200x1200')} />
      <meta property="og:image" content={formatMessage('url:og-921x518')} />
      <meta property="og:image" content={formatMessage('url:og-400x400')} />
      <meta property="og:image" content={formatMessage('url:og-256x256')} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta
        property="twitter:image"
        content={formatMessage('url:og-1200x1200')}
      />

      <meta name="theme-color" content="#000000" />

      <link rel="manifest" href="manifest.json" />

      {children}
    </Head>
  )
}

InfoHead.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default InfoHead

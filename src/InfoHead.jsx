import Head from 'next/head'
import PropTypes from 'prop-types'
import { useTranslations } from './hooks'

const InfoHead = ({ title, description, url, children, noindexNofollow }) => {
  const formatMessage = useTranslations()

  return (
    <Head>
      {noindexNofollow ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      <title>{title}</title>
      <meta name="description" content={description} />

      <link rel="canonical" href={url} />

      <link rel="icon" href="/favicon-512.png" sizes="512x512" />
      <link rel="icon" href="/favicon-192.png" sizes="192x192" />
      <link rel="icon" href="/favicon-144.png" sizes="144x144" />
      <link rel="icon" href="/favicon-96.png" sizes="96x96" />
      <link rel="icon" href="/favicon-72.png" sizes="72x72" />
      <link rel="icon" href="/favicon-48.png" sizes="48x48" />

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

      <link rel="manifest" href="manifest.json" />

      <meta name="theme-color" content="#000000" />

      <meta name="mobile-web-app-capable" content="yes" />

      <meta name="application-name" content="CLASS(E)" />

      <meta name="apple-mobile-web-app-capable" content="yes" />
      <link rel="apple-touch-icon" href="/favicon-192.png" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-title" content="CLASS(E)" />

      <meta
        name="msapplication-TileImage"
        content={formatMessage('url:favicon-144')}
      />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta
        name="google-site-verification"
        content="IiF5tRVBbvXxoDP8yt3ev6qYjogEIMCaLdE3naZsBog"
      />

      {children}
    </Head>
  )
}

InfoHead.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  children: PropTypes.node,
  noindexNofollow: PropTypes.bool,
}

export default InfoHead

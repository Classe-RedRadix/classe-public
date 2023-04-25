import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'

import IntlAppProvider from '../IntlProvider'

import { getCookie } from 'cookies-next'

import '../assets/stylesheets/style.scss'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  const consent = getCookie('localConsent')

  useEffect(() => {
    const handler = url => {
      sessionStorage.setItem('prev-page', router.asPath)
    }

    router.events.on('routeChangeStart', handler)

    return () => {
      router.events.off('routeChangeStart', handler)
    }
  })

  return (
    <IntlAppProvider>
      <Script
        id="gtag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied'
            });
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                      })(window,document,'script','dataLayer','GTM-NJ9F4NB');`,
        }}
      />

      {consent ? (
        <Script
          id="consupd"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            gtag('consent', 'update', {
              'ad_storage': 'granted',
              'analytics_storage': 'granted'
            });
          `,
          }}
        />
      ) : null}

      <Component {...pageProps} />
    </IntlAppProvider>
  )
}

export default MyApp

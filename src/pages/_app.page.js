import { useRouter } from 'next/router'
import { useEffect } from 'react'

import IntlAppProvider from '../IntlProvider'

import '../assets/stylesheets/style.scss'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

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
      <Component {...pageProps} />
    </IntlAppProvider>
  )
}

export default MyApp

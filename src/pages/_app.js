import IntlAppProvider from '../IntlProvider'

import '../assets/stylesheets/style.scss'

function MyApp({ Component, pageProps }) {
  return (
    <IntlAppProvider>
      <Component {...pageProps} />
    </IntlAppProvider>
  )
}

export default MyApp

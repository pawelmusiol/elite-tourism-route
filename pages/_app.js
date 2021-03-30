import '../styles/globals.css'
import Head from 'next/head'

import { CookiesProvider } from 'react-cookie'
import { Provider } from "react-redux"
import { store } from "../redux/store"

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <Head>
          <script src="https://kit.fontawesome.com/9c62f72f52.js" crossOrigin="anonymous"></script>
        </Head>
        <Component {...pageProps} />
      </ Provider>
    </CookiesProvider>
  )
}

export default MyApp

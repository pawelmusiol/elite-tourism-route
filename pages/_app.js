import '../styles/globals.css'
import Head from 'next/head'
import UserProvider from '../providers/user-provider'
import { CookiesProvider } from 'react-cookie'
import { Provider, useSelector } from "react-redux"
import { store } from "../redux/store"

function MyApp({ Component, pageProps }) {

  return (
    <CookiesProvider>
      <Provider store={store}>
        <UserProvider>
          <Head>
            <script src="https://kit.fontawesome.com/9c62f72f52.js" crossOrigin="anonymous"></script>
          </Head>
          <Component {...pageProps} />
        </UserProvider>
      </ Provider>
    </CookiesProvider>
  )
}

export default MyApp

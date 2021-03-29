import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script src="https://kit.fontawesome.com/9c62f72f52.js" crossOrigin="anonymous"></script>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp

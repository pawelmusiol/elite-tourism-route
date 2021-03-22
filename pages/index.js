import Head from 'next/head'
import Index from '../components/templates/'

import { Provider } from "react-redux"
import { store } from "../redux/store"
//import Database from "./api/database"




export default function Home() {
  return (
    <Provider store={store}>
      <Head>
      <script src="https://kit.fontawesome.com/9c62f72f52.js" crossorigin="anonymous"></script>
      </Head>
      <Index />
    </Provider>
  )
}

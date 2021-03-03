import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import Index from '../components/templates/'
//import Database from "./api/database"





export default function Home() {
  const [systems, setSystems] = useState([])
  const [inputValue, setInputValue] = useState("")
  const systemsDom = systems.map((system) => JSON.stringify(system))



  return (
    <Index />
  )
}

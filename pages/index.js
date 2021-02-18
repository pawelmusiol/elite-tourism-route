import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import Index from '../components/templates/'






export default function Home() {
  const [systems, setSystems] = useState([])
  const [inputValue, setInputValue] = useState("")
  const systemsDom = systems.map((system) => JSON.stringify(system))

  return (
    <Index />
    /*
    <div>
      <input type="text" onChange={(e) => setInputValue(e.target.value)}></input>
      <button onClick={() => {
        getSystem(inputValue).then(data => {
          if (data.length !== 0) {
            setSystems([...systems, data])
          }
        })
      }}>
        test
          </button>
      <button onClick={() => setFinalResult(getRoute(systems))}>Oblicz odległość</button>
      {systemsDom}
      {JSON.stringify(finalResult)}
    </div>
    */
  )
}

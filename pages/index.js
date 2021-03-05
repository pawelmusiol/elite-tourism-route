import Head from 'next/head'
import Index from '../components/templates/'
import {useEffect, useState} from "react"
import axios from "axios"
//import Database from "./api/database"

const useSystemNames = () => {
  const [SystemNames, setSystemNames] = useState({})
  useEffect(() => {
    axios.get("api/systems").then((response => 
      setSystemNames(response.data)
      ))
  },[])
  return SystemNames
}



export default function Home() {
  const SystemNames = useSystemNames()
  return (
    <Index SystemsNames = {SystemNames} />
  )
}

import { RouteCollection, Result, AddRoutePanel, AddBeacon, SubmitPanel, TopBar } from "../organisms"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { getSystems } from "../../redux/actions/systems"
import { getBeacons } from "../../redux/actions//beacons"
import axios from "axios"

const useReduxData = (action, route) => {
  let dispatch = useDispatch()
  useEffect(() => {
    axios.get(route).then((result) => {
      dispatch(action(result.data))
    })
  }, [])
}

const handleError = (res) => {
  if (res.data.alert) {
    alert(res.data.alert)
  }
}

export default function Index() {
  const [NumberOfRoutes, setNumberOfRoutes] = useState(1)
  const [Layout, setLayout] = useState("auto")
  const [Systems, setSystems] = useState([])
  const [finalResult, setFinalResult] = useState()
  const [Reset, setReset] = useState(false)
  const RoutesDom = CreateRoutesDom(NumberOfRoutes, Systems, setSystems, Reset)

  const resetValues = () => {
    setNumberOfRoutes(1)
    setLayout("auto")
    setSystems([])
    setFinalResult(undefined)
    setReset(!Reset)
  }

  useEffect(() => {
    if (NumberOfRoutes > 1 && window.innerWidth > 1000) {
      setLayout("50% 50%")
    }
    if (window.innerWidth <= 1000) {
      setLayout("100%")
    }
  }, [NumberOfRoutes])

  useReduxData(getSystems, "api/systems")
  useReduxData(getBeacons, "api/beacons")
  return (
    <div id="main">
      <TopBar reset={resetValues}/>
      <div id="sytems">
        <RouteCollection key={0} id={0} AllSystems={Systems} setSystemsToRoute={setSystems} first reset={Reset} >System Startowy</RouteCollection>
        <AddRoutePanel Routes={NumberOfRoutes} setRoutes={setNumberOfRoutes} />
        <div id="routes">
          {RoutesDom}
        </div>
          <SubmitPanel onClick={() => axios.post("api/calculate",{systems: Systems}).then((res) => {
          handleError(res)
          setFinalResult(res.data.result)
          })} />
      </div>
      {typeof finalResult !== "undefined" &&
        <Result data={finalResult} id="Result" />
      }
      <div>
        <AddBeacon />
      </div>
      <style jsx>{`
        .submit{
          font-size: 2rem;
          padding:1%;
          width:100%;
        }
        #main{
          gap: 5%;
          margin-top: calc(30px + 3rem); 
          display:flex;
          width: 100%;
          flex-direction:column;
        }
        #routes{
          display: grid;
          grid-template-columns: ${Layout};
          grid-gap: 10px;
        }
        `}</style>
    </div>
  )
}

const CreateRoutesDom = (count, Systems, setSystems, Reset) => {
  let RoutesDom = []
  for (let i = 0; i < count; i++) {
    RoutesDom.push(<RouteCollection key={i + 1} id={i + 1} AllSystems={Systems} reset={Reset} setSystemsToRoute={setSystems}>Droga nr {i + 1}</RouteCollection>)
  }
  return RoutesDom
}


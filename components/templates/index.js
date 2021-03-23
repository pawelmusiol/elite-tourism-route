import { RouteCollection, Result, AddRoutePanel, AddBeacon, SubmitPanel } from "../organisms"
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
  const RoutesDom = CreateRoutesDom(NumberOfRoutes, Systems, setSystems)

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
      <div id="sytems">
        <RouteCollection key={0} id={0} AllSystems={Systems} setSystemsToRoute={setSystems} first >System Startowy</RouteCollection>
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

const CreateRoutesDom = (count, Systems, setSystems) => {
  let RoutesDom = []
  for (let i = 0; i < count; i++) {
    RoutesDom.push(<RouteCollection key={i + 1} id={i + 1} AllSystems={Systems} setSystemsToRoute={setSystems}>Droga nr {i + 1}</RouteCollection>)
  }
  return RoutesDom
}


import { RouteCollection, Result, AddRoutePanel, AddBeacon, SubmitPanel, TopBar, Login, Footer, Error } from "../organisms"
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
  const [LoginVisibility, setLoginVisibility] = useState("none");
  const [ErrorVisibility, setErrorVisibility] = useState("none")
  const [Filter, setFilter] = useState("none")

  const RoutesDom = CreateRoutesDom(NumberOfRoutes, Systems, setSystems, Reset)

  const resetValues = () => {
    setNumberOfRoutes(1)
    setLayout("auto")
    setSystems([])
    setFinalResult(undefined)
    setReset(!Reset)
  }

  useEffect(() => {
    if (LoginVisibility === "none") {
      setFilter("none")
    }
    else setFilter("blur(3px)")
  }, [LoginVisibility])

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
        <TopBar setVisibility={setLoginVisibility} />
        <div id="content">
        <div id="sytems">
          <RouteCollection key={0} id={0} AllSystems={Systems} setSystemsToRoute={setSystems} first reset={Reset} >System Startowy</RouteCollection>
          <RouteCollection key={999} id={999} AllSystems={Systems} setSystemsToRoute={setSystems} last reset={Reset}>System Końcowy</RouteCollection>
          <AddRoutePanel Routes={NumberOfRoutes} setRoutes={setNumberOfRoutes} reset={resetValues} />
          <div id="routes">
            {RoutesDom}
          </div>
          <SubmitPanel onClick={() => axios.post("api/calculate", { systems: Systems }).then((res) => {
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
      </div>
      <Footer setVisibility={setErrorVisibility} />

      <Error Visibility={ErrorVisibility} setVisibility={setErrorVisibility} />
      <Login Visibility={LoginVisibility} setVisibility={setLoginVisibility} />

      <style jsx>{`
        .submit{
          font-size: 2rem;
          padding:1%;
          width:100%;
        }

        #content{
          filter:${Filter};
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


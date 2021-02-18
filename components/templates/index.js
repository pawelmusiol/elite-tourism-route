import { RouteCollection } from "../organisms"
import { useState } from "react"

export default function Index() {
	const [NumberOfRoutes, setNumberOfRoutes] = useState(1)
	const [Systems, setSystems] = useState([])
	const [finalResult, setFinalResult] = useState()
	const RoutesDom = CreateRoutesDom(NumberOfRoutes, setSystems)

	return (
		<div>
			{RoutesDom}
			<button onClick={() => setFinalResult(getRoute(Systems))}>Calculate</button>
			{JSON.stringify(finalResult)}
		</div>
	)
}

const CreateRoutesDom = (count, setSystems) => {
	let RoutesDom = []
	for (let i = 0; i < count; i++) {
		RoutesDom.push(<RouteCollection setSystemsToRoute={setSystems}/>)
	}
	return RoutesDom
}

//get distance between systems
const getDistance = (start, end) => {
  let vector = { x: 0, y: 0, z: 0 }
  vector.x = end.x - start.x
  vector.y = end.y - start.y
  vector.z = end.z - start.z
  vector.length = Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z)
  return vector.length
}

const getRoute = (systems) => {
  let combinations
  let distances = getDistanceBetweenSystems(systems)
  console.log(distances)
  combinations = getCombinations(systems.length)
  let routes = getAllRoute(combinations, distances)
  return getBestRoute(routes)
}

//get all routes distance
const getAllRoute = (combinations, distances) => {
  let Distances = []

  for (let combination of combinations) {
    let distance = 0
    for (let i = 0; i < combination.length - 1; i++) {
      for (let j = 0; j < distances.length; j++) {
        if (distances[j].startId === combination[i] && distances[j].endId === combination[i + 1]) {
          distance += distances[j].distance
        }
      }
    }
    Distances.push({combination:combination,distance:distance})
  }
  return Distances
}

//Get shortest route
const getBestRoute = (routes) => {
	let start = Date.now()
  let min = routes[0]
  for(let route of routes) {
    if (route.distance < min.distance) {
      min = route
    }
  }
  console.log(Date.now() - start)
  return min
}

//get all combination of possible routes
const getCombinations = (numberOfSystems) => {
  let array = []
  for (let i = 1; i < numberOfSystems; i++) {
    array.push(i)
  }
  return Heap(array.length, array)
}

//generate combinations of routes
const Heap = (length, array) => {
  let k = 0
  let tempArray = []
  let result = []

  for (let i = 0; i < length; i++) {
    tempArray[i] = 0
  }

  for (let i = 0; i < array.length; i++) {
    if (typeof result[k] !== "undefined" && (i === array.length - 1)) {
      result[k] = [...result[k], array[i], 0]
    }
    else if (typeof result[k] !== "undefined") {
      result[k] = [...result[k], array[i]]
    }
    else {
      result[k] = [0, array[i]]
    }
  }
  k++


  let i = 0
  while (i < length) {
    if (tempArray[i] < i) {
      if (!(i % 2)) {
        [array[0], array[i]] = [array[i], array[0]]
      }

      else {
        [array[tempArray[i]], array[i]] = [array[i], array[tempArray[i]]]
      }
      //zapis do tej j*banej tablicy
      for (let i = 0; i < array.length; i++) {
        if (typeof result[k] !== "undefined" && (i === array.length - 1)) {
          result[k] = [...result[k], array[i], 0]
        }
        else if (typeof result[k] !== "undefined") {
          result[k] = [...result[k], array[i]]
        }
        else {
          result[k] = [0, array[i]]
        }
      }
      k++

      tempArray[i] += 1

      i = 0
    }
    else {
      tempArray[i] = 0
      i++
    }
  }
  console.log("skonczon heap")
  return result
}
//generate distances between all selected systems 
const getDistanceBetweenSystems = (systems) => {
  let results = []
  for (let index = 0; index < systems.length; index++) {

    for (let index2 = 0; index2 < systems.length; index2++) {
      let result = {}
      result.start = systems[index].name
      result.end = systems[index2].name
      result.startId = index
      result.endId = index2
      result.distance = getDistance(systems[index].coords, systems[index2].coords);
      if (result.distance !== 0) {
        results.push(result)
      }
    }
  }
  return results
}
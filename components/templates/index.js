import { RouteCollection } from "../organisms"
import { useState } from "react"

export default function Index() {
  const [NumberOfRoutes, setNumberOfRoutes] = useState(2)
  const [Systems, setSystems] = useState([])
  const [finalResult, setFinalResult] = useState()
  const RoutesDom = CreateRoutesDom(NumberOfRoutes, Systems, setSystems)

  return (
    <div>
      {RoutesDom}
      <button onClick={() => setFinalResult(getRoute(Systems))}>Calculate</button>
      {JSON.stringify(finalResult)}
    </div>
  )
}

const CreateRoutesDom = (count, Systems, setSystems) => {
  let RoutesDom = []
  for (let i = 0; i < count; i++) {
    RoutesDom.push(<RouteCollection key={i} id={i} AllSystems={Systems} setSystemsToRoute={setSystems} />)
  }
  return RoutesDom
}

const SystemsDataToArray = (Systems) => {
  let SystemsArray = []
  for (const Collection of Systems) {
    SystemsArray.push(...Collection.Systems)
  }
  console.log(SystemsArray)
  return checkForSame(SystemsArray)
}

const checkForSame = (Systems) => {
  let systemsToDelete = []
  for (let [index, system] of Systems.entries()) {
    for (let [index2, system2] of Systems.entries()) {
      if ((index !== index2) && (system.id === system2.id)) {
        if (!CheckIfIsInArray(systemsToDelete, index2)) {
          systemsToDelete.push({ id: index, after: [...system.after, ...system2.after], idDelete: index2 })
        }
      }
    }
  }
  console.log(systemsToDelete)
  for (const system of systemsToDelete) {
    Systems.splice(system.idDelete, 1)
    Systems[system.id].after = checkAfter(system.after)
    console.log(system.after)
  }
  return Systems
}

const checkAfter = (afterArray) => {
  for (let i = 0; i < afterArray.length; i++) {
    for (let j = 0; j < afterArray.length; j++) {
      if (i !== j && afterArray[i] === afterArray[j]) {
        afterArray.splice(i, 1)
      }
    }
  }
  return afterArray
}

const CheckIfIsInArray = (array, index) => {
  for (let item of array) {
    if (item.id === index) {
      return true
    }
  }
}

const getRoute = (systems) => {
  let SystemsData = SystemsDataToArray(systems)
  console.log(SystemsData)
  let distances = getDistanceBetweenSystems(SystemsData)
  let combinations = getCombinations(SystemsData.length, SystemsData)
  let routes = getAllRoute(combinations, distances)
  return getBestRoute(routes)
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
    Distances.push({ combination: combination, distance: distance })
  }
  return Distances
}

//Get shortest route
const getBestRoute = (routes) => {
  let min = routes[0]
  for (let route of routes) {
    if (route.distance < min.distance) {
      min = route
    }
  }
  return min
}

//get all combination of possible routes
const getCombinations = (numberOfSystems, SystemsData) => {
  let array = []
  for (let i = 1; i < numberOfSystems; i++) {
    array.push(i)
  }
  let Conditions = setConditions(array, SystemsData)
  let Combinations = Heap(array.length, array)
  return CheckConditions(Conditions, Combinations)
}

const CheckConditions = (Conditions, Combinations) => {
  let BackupCombinations = [...Combinations]
  for (let j = 0; j < Conditions.length; j++) {
    for (let i = 0; i < Combinations.length; i++) {
      let row = Combinations[i]
      for (let k = 0; k < row.length; k++) {
        if (row[k] === Conditions[j][1]) {
          for (let l = k; l < row.length; l++) {
            if (row[l] === Conditions[j][0]) {
              Combinations.splice(i, 1)
              i--
            }
          }
        }
      }
    }
  }
  if (Combinations.length) {
    console.log('Combinations')
    return Combinations
  }
  else {
    console.log(BackupCombinations)
    return BackupCombinations
  }
}

const setConditions = (SystemNumbers, SystemData) => {
  let Conditions = []
  console.log(SystemNumbers)
  for (let i = 1; i < SystemData.length; i++) {
    for (let j = 1; j < SystemData.length; j++) {
      for (const after of SystemData[i].after) {
        if (after === SystemData[j].id) {
          Conditions.push([j, i])
        }
      }
    }
  }
  return Conditions
}

//generate combinations of routes
const Heap = (length, array, conditions) => {
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
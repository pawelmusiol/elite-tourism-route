let alert = ""

//Complete Data Together
const SystemsDataToArray = (Systems) => {
  let SystemsArray = []
  for (const Collection of Systems) {
    SystemsArray.push(...Collection.Systems)
  }
  return checkForSame(SystemsArray)
}

//Checkin if systems are duplicated in array
const checkForSame = (Systems) => {
  let systemsToDelete = []
  for (let [index, system] of Systems.entries()) {
    for (let [index2, system2] of Systems.entries()) {
      //Check if there is another system with same id but not in same index
      if ((index !== index2) && (system.id === system2.id)) {
        if (!CheckIfIsInArray(systemsToDelete, index2)) {
          systemsToDelete.push({ id: index, systemId: system.id, after: modifyAfter(system.after, system2.after), idDelete: index2 })
        }
      }
    }
  }
  let TempSystems = []

  //Deleting Duplicated SystemsData
  for (let i = 0; i < Systems.length; i++) {
    let toPush = true
    for (const system of systemsToDelete) {
      if (system.idDelete === i) {
        toPush = false
      }
      if (system.id === i) {
        Systems[i].after = system.after
      }

    }
    if (toPush) {
      TempSystems.push(Systems[i])
    }
  }
  return checkForPairSystems(TempSystems)
}


//Check for pair systems and duplicate one of them to make it possible to run
//Edit after of this systems
const checkForPairSystems = (Systems) => {
  const prefix = 'x'
  let idAfter = []
  for (let [index1, System1] of Systems.entries()) {
    for (const [index2, System2] of Systems.entries()) {
      for (const After1 of System1.after) {
        for (const After2 of System2.after) {
          if (System1.id === After2 && index1 > 0 && System2.after.length > 1 && After2 !== -1) {
            if (!idAfter.includes(System1)) {
              let TempSystem = { ...System1 }
              TempSystem.id += prefix
              System1.after.splice(System1.after.indexOf(After2), 1)
              TempSystem.after = [System2.id]
              idAfter.push(TempSystem)
            }
          }
        }
      }
    }
  }
  Systems.push(...idAfter)
  return Systems
}


//Save after for modified element
const modifyAfter = (after1, after2) => {
  let result = []
  for (let i = 0; i < after1.length; i++) {
    for (let j = 0; j < after2.length; j++) {
      if (after1[i] !== after2[j]) {
        result.push(after1[i])
      }
    }
  }
  for (let i = 0; i < after2.length; i++) {
    if (!result.includes(after2[i])) {
      result.push(after2[i])
    }
  }
  return result
}

//Checking if this system is in Array with systems to delete
const CheckIfIsInArray = (array, index) => {
  for (let item of array) {
    if (item.id === index) {
      return true
    }
  }
}

//check if first system is same as last
const checkforFirst = (systems) => {
  if (systems[0].Systems[0].id === systems[systems.length-1].Systems[0].id) {
    return true
  }
  else return false
}

//One function to rule them all XD
const getRoute = (systems) => {
  alert = ""
  let same = checkforFirst(systems)
  let SystemsData = SystemsDataToArray(systems)
  let distances = getDistanceBetweenSystems(SystemsData)
  let combinations = getCombinations(SystemsData.length, SystemsData, same)
  console.log(combinations)
  let routes = getAllRoute(combinations, distances)
  let bestRoute = getBestRoute(routes)
  let result
  if (bestRoute) {
    result = getSystemsNames(bestRoute, SystemsData)
  }
  return result
}

//Get Name of systems to result
const getSystemsNames = (route, SystemsData) => {
  let SystemNames = []
  for (let i = 0; i < route.combination.length; i++) {
    for (let j = 0; j < SystemsData.length; j++) {
      if (route.combination[i] === j) {
        SystemNames.push({ name: SystemsData[j].name, id: SystemsData[j].id })
      }
    }
  }
  route.combination = SystemNames
  return route
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
    let oneJumps = []
    let distance = 0
    for (let i = 0; i < combination.length - 1; i++) {
      for (let j = 0; j < distances.length; j++) {
        if (distances[j].startId === combination[i] && distances[j].endId === combination[i + 1]) {
          distance += distances[j].distance
          oneJumps.push(distances[j])
        }
      }
    }
    Distances.push({ combination: combination, distance: distance, Jumps: oneJumps })
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
const getCombinations = (numberOfSystems, SystemsData, same) => {
  let array = []
  let minusForSame = 1
  if (same) {
    minusForSame = 0
  }
  for (let i = 1; i < numberOfSystems- minusForSame; i++) {
    array.push(i)
  }
  let Conditions = setConditions(SystemsData)
  let Combinations = Heap(array.length, array, same, numberOfSystems-1)
  console.log(Combinations)

  return CheckConditions(Conditions, Combinations)
}

//Spaghetti to check if any of Route Combination matches with Conditions
//Return Array of right combinations if pass it
//Return Array of all if not pass it
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
    return Combinations
  }
  else {
    alert = "dupa, tak się nie da"
    return BackupCombinations
  }
}

//Setting Conditions on checking prevs of systems
const setConditions = (SystemData) => {
  let Conditions = []
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
const Heap = (length, array, same, last) => {
  console.log(last)
  let k = 0
  let tempArray = []
  let result = []

  for (let i = 0; i < length; i++) {
    tempArray[i] = 0
  }

  for (let i = 0; i < array.length; i++) {
    if (typeof result[k] !== "undefined" && (i === array.length - 1) && !same) {
      result[k] = [...result[k], array[i], last]
    }
    else if (typeof result[k] !== "undefined" && (i === array.length - 1) && same) {
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
        if (typeof result[k] !== "undefined" && (i === array.length - 1) && !same) {
          result[k] = [...result[k], array[i], last]
        }
        else if (typeof result[k] !== "undefined" && (i === array.length - 1) && same) {
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


const sortArrays = (systems) => {
  return systems.sort((a, b) => {
    return a.id - b.id
  })
}


const calculate = async (req, res) => {
  switch (req.method) {
    case "POST":
      console.log(req.body.systems)
      let systems = sortArrays(req.body.systems)
      let result = getRoute(systems)
      if (alert !== "") {
        res.status(200).send({ result: result, alert: alert })
      }
      else {
        res.status(200).send({ result: result })
      }
  }
}

export default calculate
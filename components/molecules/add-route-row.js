import { Button, Input, InputDown } from "../atoms"
import { useState, useEffect } from "react"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { getSystems } from "../../redux/actions/systems"
import { getBeacons } from "../../redux/actions/beacons"

const useGetSystems = () => {
	return useSelector(state => {
		return state.systems
	})
}
const useGetBeacons = () => {
	return useSelector(state => {
		return state.beacons
	})
}

const useGetData = () => {
	return [useGetSystems(), useGetBeacons()]
}

const fetcher = async (url) => {
	try {
		const res = await fetch(url)
		const data = await res.json()
		return data
	} catch (error) {
		alert(error)
		return error
	}

}

const getSystem = async (systemName) => {

	let systemData = await fetcher("https://www.edsm.net/api-v1/system?systemName=" + systemName + "&showCoordinates=1&showId=1")
	return systemData
}

const addSystem = async (systemName, dispatch) => {
	axios.post("api/systems", { systemName: systemName }).then(result => {
		dispatch(getSystems(result.data))
	})
}

const addBeacon = async (beaconName, systemName, dispatch) => {
	axios.post("api/beacons", { beaconName: beaconName, systemName: systemName }).then(result => {
		dispatch(getBeacons(result.data))
	})
}

const validateInput = (value) => {
	if (typeof value === undefined || value === "") {
		return false
	}
	else return true
}

const checkBeaconData = (beacons, systemInput, beaconInput) => {
	let result = false
	beacons.some(beacon => {
		if (beacon.system === systemInput && beacon.name === beaconInput) {
			result = true
		}
	})
	return result
}

export default function AddRouteRow({ systems, setSystems, add }) {
	const [SystemInputValue, setSystemInputValue] = useState("")
	const [BeaconInputValue, setBeaconInputValue] = useState("")
	const [storedSystems, storedBeacons] = useGetData()
	const [Trigger, setTrigger] = useState(true)
	const dispatch = useDispatch()

	const addToDatabase = () => {
		if (!validateInput(SystemInputValue) && !checkBeaconData(storedBeacons, SystemInputValue, BeaconInputValue)) {
			alert("Sprawdz poprawność danych")
		}
		else {
			getSystem(SystemInputValue).then((data) => {
				if (validateInput(BeaconInputValue)) {
					let beaconExistInRedux = false
					storedBeacons.some(beacon => {
						if (beacon.name === BeaconInputValue) {
							beaconExistInRedux = true
						}
					})
					if (!beaconExistInRedux) {
						addBeacon(BeaconInputValue, data.name, dispatch)
						setTrigger(!Trigger)
					}
				}
				let systemExistInRedux = false
				storedSystems.some(system => {
					if (data.name === system.name) {
						systemExistInRedux = true
					}
				})
				if (!systemExistInRedux) {
					addSystem(data.name, dispatch)
					setTrigger(!Trigger)
				}

				setSystemInputValue("")
				setBeaconInputValue("")
			})
		}
	}
	let onEnter
	if (systems) {
		onEnter = () => {
			if (!validateInput(SystemInputValue) && !checkBeaconData(storedBeacons, SystemInputValue, BeaconInputValue)) {
				alert("Sprawdz poprawność danych")
			}
			else {
				getSystem(SystemInputValue).then((data) => {
					if (validateInput(BeaconInputValue)) {
						let beaconExistInRedux = false
						storedBeacons.some(beacon => {
							console.log(beacon)
							if (beacon.name === BeaconInputValue) {
								beaconExistInRedux = true
							}
						})
						if (!beaconExistInRedux) {
							addBeacon(BeaconInputValue, data.name, dispatch)
						}
					}
					let systemExistInRedux = false
					storedSystems.some(system => {
						if (data.name === system.name) {
							systemExistInRedux = true
						}
					})

					if (systems.length) {
						data.after = [systems[systems.length - 1].id]
					}
					else {
						data.after = [-1]
					}

					let systemExist = false
					if (!data.name) {
						systemExist = true
					}
					for (let system of systems) {
						if (system.name === data.name) {
							systemExist = true
						}
					}
					if (!systemExistInRedux) {
						addSystem(data.name, dispatch)
					}
					if (!systemExist) {
						setSystems([...systems, data])
					}
					setSystemInputValue("")
					setBeaconInputValue("")
				})
			}
		}
	}

	return (
		<div>
			{add ?
				<>
					<Input setValue={setSystemInputValue} value={SystemInputValue} onEnter={addToDatabase} storedValues={storedSystems} list="systems" />
					<Input setValue={setBeaconInputValue} value={BeaconInputValue} onEnter={addToDatabase} storedValues={storedBeacons} list="beacons" onListClick={setSystemInputValue} />
					<Button onClick={addToDatabase} >
						➡️
					</Button>
				</>
				:
				<>
					<Input setValue={setSystemInputValue} value={SystemInputValue} onEnter={onEnter} storedValues={storedSystems} list="systems" />
					<Input setValue={setBeaconInputValue} value={BeaconInputValue} onEnter={onEnter} storedValues={storedBeacons} list="beacons" onListClick={setSystemInputValue} />
					<Button onClick={onEnter} >
						➡️
					</Button>
				</>
			}
			<style jsx>{`
				div{
					display:inline-flex;
				}
				`}</style>
		</div >
	)
}

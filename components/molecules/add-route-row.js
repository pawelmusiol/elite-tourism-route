import { Button, Input, InputDown } from "../atoms"
import { useState, useEffect } from "react"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { getSystems} from "../../redux/actions/systems"

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

const addSystem = async (systemName,dispatch) => {
	axios.post("api/systems", { systemName: systemName }).then(result => {
		dispatch(getSystems(result.data))
	})
}

export default function AddRouteRow({ systems, setSystems }) {
	const [SystemInputValue, setSystemInputValue] = useState("")
	const [BeaconInputValue, setBeaconInputValue] = useState("")
	const [storedSystems, storedBeacons] = useGetData()
	const dispatch = useDispatch()
	const onEnter = () => {
		getSystem(SystemInputValue).then((data) => {
			let isInRedux = false
			storedSystems.some(system => {
				if (data.name === system.name) {
					isInRedux = true
				}
			})
			console.log(isInRedux)
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
			if (!isInRedux) {
				addSystem(data.name,dispatch)
			}
			if (!systemExist) {
				setSystems([...systems, data])
			}
			setSystemInputValue("")
			setBeaconInputValue("")
		})
	}

	const onBeaconChange = (value) => {
		console.log(value)
		setSystemInputValue(value)
	}

	return (
		<div>
			<Input setValue={setSystemInputValue} value={SystemInputValue} onEnter={onEnter} storedValues={storedSystems} list="systems"/>
			<Input setValue={setBeaconInputValue} value={BeaconInputValue} onEnter={() => console.log("dupa")} storedValues={storedBeacons} list="beacons" onListClick={setSystemInputValue} />
			<Button onClick={onEnter} >
				➡️
			</Button>
			<style jsx>{`
				div{
					display:inline-flex;
				}
				`}</style>
		</div >
	)
}

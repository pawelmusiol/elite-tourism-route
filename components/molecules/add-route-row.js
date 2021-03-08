import { Button, Input, InputDown } from "../atoms"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

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

const useGetSystems = () => {
	useSelector(state => {
		return state.systems
	})
}

export default function AddRouteRow({ systems, addSystem }) {
	const [InputValue, setInputValue] = useState("")
	console.log(useGetSystems())

	const onEnter = () => {
		getSystem(InputValue).then((data) => {
			if (systems.length) {
				data.after = [systems[systems.length - 1].id]
			}
			else {
				data.after = [-1]
			}
			console.log(data)
			let systemExist = false
			if (!data.name) {
				systemExist = true
			}
			for (let system of systems) {
				if (system.name === data.name) {
					systemExist = true
				}
			}
			if (!systemExist) {
				addSystem([...systems, data])
			}
			setInputValue("")
		})
	}


	return (
		<div>
			<Input setValue={setInputValue} value={InputValue} onEnter={onEnter} />
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
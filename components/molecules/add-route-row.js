import { Button, Input } from "../atoms"
import { useState } from "react"

const fetcher = async (url) => {
	const res = await fetch(url)
	const data = await res.json()
	return data
}

const getSystem = async (systemName) => {

	let systemData = await fetcher("https://www.edsm.net/api-v1/system?systemName=" + systemName + "&showCoordinates=1&showId=1")
	return systemData
}

export default function AddRouteRow({ systems, addSystem }) {
	const [InputValue, setInputValue] = useState("")

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
		})
	}

	return (
		<div>
			<Input setValue={setInputValue} onEnter={onEnter} />
			<Button onClick={onEnter}>
				Dodaj
			</Button>
		</div >
	)
}
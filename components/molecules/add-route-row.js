import { Button, Input } from "../atoms"
import { useState } from "react"

const fetcher = async (url) => {
	const res = await fetch(url)
	const data = await res.json()
	return data
}

const getSystem = async (systemName) => {

	let systemData = await fetcher("https://www.edsm.net/api-v1/system?systemName=" + systemName + "&showCoordinates=1")
	return systemData
}

export default function AddRouteRow({ systems, addSystem }) {
	const [InputValue, setInputValue] = useState("")


	return (
		<div>
			<Input setValue={setInputValue} />
			<Button onClick={() => {
				getSystem(InputValue).then((data) => {
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
			}}>
				Dodaj
			</Button>
		</div>
	)
}
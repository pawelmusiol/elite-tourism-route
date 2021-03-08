import { useState, useEffect } from 'react'
import { DataRow, AddRouteRow } from "../molecules"



export default function RouteCollection({ setSystemsToRoute, AllSystems, id, first, children }) {
	const [NumberOfRows, setNumberOfRows] = useState(1)
	const [Systems, setSystems] = useState([])

	useEffect(() => {
		let CurrentCollection = { id: id, Systems: Systems }
		let position = null
		for (const [index, SystemCollection] of AllSystems.entries()) {
			if (SystemCollection.id == id) {
				position = index
			}
		}
		if (position) {
			let TempAllSystems = AllSystems
			TempAllSystems[position] = CurrentCollection
			setSystemsToRoute(TempAllSystems)
		}
		else {
			setSystemsToRoute([...AllSystems, CurrentCollection])
		}


	}, [Systems])

	const swapPosition = (id, pos) => {
		if (!((id === 0 && pos < 0) || (id === Systems.length - 1 && pos > 0))) {
			let data = [...Systems]
			let temp = data[id]
			data[id] = data[id + pos]
			data[id + pos] = temp

			let changePos = id
			if (pos === -1) {
				changePos -= 1
			}

			data = MoveAfter(data, changePos)

			setSystems(data)
		}
	}


	const SystemDom = Systems.map((system, index) => <DataRow id={index} changePosition={swapPosition}>{system.name}</DataRow>)


	if (!first) {
		return (
			<div>
				<h3>{children}</h3>
				{SystemDom}
				<AddRouteRow systems={Systems} addSystem={setSystems} />
			</div>
		)
	}
	else {
		return (
			<div>
				<h3>{children}</h3>
				{SystemDom}
				{!Systems.length 
				&& <AddRouteRow systems={Systems} addSystem={setSystems} />}
			</div>
		)
	}
}

const MoveAfter = (data, changePos) => {
	if (data[changePos]) data[changePos].after = [checkPosition(data, changePos)]
	if (data[changePos + 1]) data[changePos + 1].after = [checkPosition(data, changePos + 1)]
	if (data[changePos + 2]) data[changePos + 2].after = [checkPosition(data, changePos + 2)]
	return data
}

const checkPosition = (data, id) => {
	console.log(id)
	if (data[id - 1]) {
		return data[id - 1].id
	}
	else return -1
}
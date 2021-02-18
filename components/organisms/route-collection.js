import { useState, useEffect } from 'react'
import { DataRow, AddRouteRow } from "../molecules"



export default function RouteCollection({setSystemsToRoute}) {
	const [NumberOfRows, setNumberOfRows] = useState(1)
	const [Systems, setSystems] = useState([])

	useEffect(() => {
		setSystemsToRoute(Systems)
	}, [Systems])

	const swapPosition = (id, pos) => {
		if (!((id === 0 && pos < 0) || (id === Systems.length - 1 && pos > 0))) {
			let data = [...Systems]
			let temp = data[id]
			data[id] = data[id + pos]
			data[id + pos] = temp
			setSystems(data)
		}
	}

	const SystemDom = Systems.map((system, index) => <DataRow id={index} changePosition={swapPosition}>{system.name}</DataRow>)
	

	return (
		<div>
			{SystemDom}
			<AddRouteRow systems={Systems} addSystem={setSystems} />
		</div>
	)
}
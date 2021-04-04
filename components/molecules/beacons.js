import { Data } from '../atoms'

export default function Systems({ children }) {
	return (
		<>
			{beaconsToDom(children)}
		</>
	)
}

const beaconsToDom = (beacons) => {
	let dom = []
	if (beacons) {
		if (beacons.length) {
			beacons.map((beacon,key) => {
				dom.push(
					<div key={key} className="system-list-item">
						<Data>Nazwa</Data><Data>{beacon.name}</Data>
						<Data>System</Data><Data>{beacon.system}</Data>
					</div>
				)
			})
		}
	}
	console.log(dom)
	return dom
}
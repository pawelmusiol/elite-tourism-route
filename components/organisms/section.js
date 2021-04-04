import { User, Systems, Beacons } from '../molecules'


export default function Section({ title, type, children }) {
	let Dom = dataToDom(children, type)
	return (
		<div className="section">
			<h2>{title}</h2>
			<div>{Dom}</div>
		</div>
	)
}
const dataToDom = (data, type) => {
	switch (type) {
		case "user":
			return <User>{data}</User>
			break;
		case "beacons":
			return<Beacons>{data}</Beacons>
			break;
		case "systems":
			return <Systems>{data}</Systems>
			break;
		default:
			break;
	}
	
}
import { Data } from '../atoms'

export default function Systems({ children }) {
	return (
		<>
		{systemsToDom(children)}
		</>
	)
}

const systemsToDom = (systems) => {
	let dom = []
	if (systems) {
		if (systems.length) {
			systems.map((system,key) => {
				dom.push(
					<div key={key} className="system-list-item">
						<Data>Nazwa</Data><Data>{system.name}</Data>
					</div>
				)
			})
		}
		else dom = <Data>Użytkownik Nie dodał żadnych systemów</Data>
	}
	return dom
}
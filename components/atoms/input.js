

export default function Input({ setValue, onEnter, value, storedValues, list, onListClick }) {

	return (
		<>
			<input type="text" value={value} minLength="2" onInput={(e) => {if(onListClick) changeSystem(e.target.value, list, onListClick)}} onChange={(e) => { setValue(e.target.value)}} onKeyUp={(e) => { if (e.key === 'Enter') onEnter() }} list={list} placeholder={list} />
			<datalist id={list}>
				{systemsDom(storedValues)}
			</datalist>
			<style jsx>{`
					input{
						
					}
				`}</style>
		</>
	)
}

const changeSystem = (value, id, onListClick) => {
	if (typeof document !== 'undefined') {
		if (document.getElementById(id)) {
			for (const child of document.getElementById(id).childNodes) {
				if (child.innerText === value) {
					onListClick(child.dataset.system)
					break;
				}
			}
		}
	}
}

const systemsDom = (data) => {
	let result = ""
	if (typeof data !== "undefined") {
		result = data.map((one, index) => <option value={one.name} data-system={one.system} key={index} >{one.name}</option>)
	}
	return result
}
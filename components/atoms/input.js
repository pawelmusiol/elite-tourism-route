
export default function Input({setValue, onEnter, value}){
	return (
		<input type="text" value={value} onChange={(e) => setValue(e.target.value)} onKeyUp={(e) => {if(e.key === 'Enter') onEnter()}}></input>
	)
}
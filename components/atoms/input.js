
export default function Input({setValue, onEnter}){
	return (
		<input type="text" onChange={(e) => setValue(e.target.value)} onKeyUp={(e) => {if(e.key === 'Enter') onEnter()}}></input>
	)
}
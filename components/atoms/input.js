
export default function Input({setValue}){
	return (
		<input type="text" onChange={(e) => setValue(e.target.value)}></input>
	)
}
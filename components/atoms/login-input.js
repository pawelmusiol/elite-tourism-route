
export default function LoginInput({type, placeholder, value, setValue}){
	return(
		<input type={type} placeholder={placeholder} onChange={e => {setValue(e.target.value)}} value={value}></input>
	)
}
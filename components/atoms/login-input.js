
export default function LoginInput({type, placeholder, value, setValue, className, required, textarea}){
	if (textarea) {
		return(
			<textarea placeholder={placeholder} onChange={e => {setValue(e.target.value)}} value={value} className={className} required={required}></textarea>
		)
	}
	else{
	return(
		<input type={type} placeholder={placeholder} onChange={e => {setValue(e.target.value)}} value={value} className={className} required={required}></input>
	)
	}
}
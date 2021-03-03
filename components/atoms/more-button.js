export default function MoreButton({children, onClick}){
	return (
		<button onClick={onClick}>+{children}</button>
	)
}
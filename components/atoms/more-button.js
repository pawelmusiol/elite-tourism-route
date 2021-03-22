export default function MoreButton({children, onClick}){
	return (
		<button onClick={onClick}>
			{children}
			<style jsx>{`
				button{
				}
				`}</style>
			</button>
	)
	
}
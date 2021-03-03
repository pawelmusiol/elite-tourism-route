export default function Button({children, onClick, className}){
	return (
		<a onClick={onClick}>
			{children}
			<style jsx>{`
				a{
					margin:0;
					background: none;
					cursor:pointer;
					height: 100%;
				}
				`}</style>
		</a>
	)
}
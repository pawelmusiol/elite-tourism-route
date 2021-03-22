export default function Button({children, onClick, className}){
	return (
		<a onClick={onClick}>
			{children}
			<style jsx>{`
				a{
					margin:0;
					cursor:pointer;
					height: 100%;
					color: #E18100;
					background: none;
					border-left: none;
					border-top-right-radius: 5px;
					border-bottom-right-radius: 5px;
				}
				`}</style>
		</a>
	)
}
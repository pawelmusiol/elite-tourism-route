export default function Modal({ children, Visibility, setVisibility, id }) {

	const CloseModal = (e) => {
		let panel = document.getElementById(id)
		if (e.target.id === "login-modal") {
			if (e.clientX < panel.offsetLeft || e.clientX > panel.offsetLeft + panel.offsetWidth) setVisibility("none")
			if (e.clientY < panel.offsetTop || e.clientY > panel.offsetTop + panel.offsetHeight) setVisibility("none")
		}
	}

	return (
		<div id="login-modal" onClick={CloseModal}>
		
			{children}
			<style jsx>{`
				div{
					display: ${Visibility};
					position: fixed;
					left: 0;
					top: 0;
					width:100%;
					height:100%;
					background-color: rgba(0,0,0,.5);
					z-index:1
				}
				`}</style>
		</div>
	)
}


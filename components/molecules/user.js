import { Data } from "../atoms"

export default function user({ children }) {
	return (
		<>
			{userToDom(children)}
		</>
	)
}

const userToDom = (user) => {
	if (user) {
		return (
			<>
				<div><Data>Nick:</Data><Data>{user.login}</Data></div>
				<div><Data>Mail:</Data><Data>{user.mail}</Data></div>
				<div><Data>Imię:</Data><Data>{user.name}</Data></div>
				<div><Data>Data Rejestracji:</Data><Data>{user.registerDate}</Data></div>
				<div><Data>Ostatnio Aktywny:</Data><Data>{user.lastActive}</Data></div>
				<style jsx>{`
					div  {
						display: flex;
					}
					`}</style>
			</>
		)
	}

}
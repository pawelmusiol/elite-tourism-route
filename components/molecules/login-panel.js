import { LoginInput as Input, Button } from "../atoms"
import { useState } from "react"
import axios from "axios"

export default function LoginPanel({ setVisibility }) {
	const [Login, setLogin] = useState("");
	const [Password, setPassword] = useState("")

	const LogUser = () => {
		alert(Login + " " + Password)
		axios.post("api/user/login", {login:Login, password:Password}).then(res => {
			console.log(res)
		}).catch(err => {
			console.log(err.response.status)
			if (err.response.status === 401) {
				alert("Błędny login lub hasło")
			}
		})
	}



	return (
		<div id="login-panel">
			<Button onClick={() => setVisibility("none")} className="menu-exit" addColor="#444">X</Button>
			<div id="inputs">
				<Input type="text" placeholder="Login" value={Login} setValue={setLogin} onEnter={LogUser}className="login-input"></Input>
				<Input type="password" placeholder="Hasło" value={Password} setValue={setPassword} onEnter={LogUser} className="login-input"></Input>
				<Button onClick={LogUser} className="login-button submit-button" addColor="#444" >Zaloguj się</Button>
				<Button className="login-button submit-button register-button" addColor="#444" >Zarejestruj się</Button>
			</div>
			<style jsx>{`
				#login-panel{
					position: absolute;
					width:400px;
					max-width:90%;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					background-color: #444;
					flex-direction: column;
					border-radius: 5px;
				}
				#inputs{
					display: flex;
					flex-direction: column;
				}
				`}</style>
		</div>
	)
}
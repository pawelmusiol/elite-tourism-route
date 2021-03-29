import { LoginInput as Input, Button} from "../atoms"
import { useState } from "react"

export default function LoginPanel({setVisibility}){
	const [Login, setLogin] = useState("");
	const [Password, setPassword] = useState("")

	const LogUser = () => {
		alert( Login + " " + Password)
	}



	return(
		<div id="login-panel">
			<Button onClick={() => setVisibility("none")}>X</Button>
			<Input type="text" placeholder="Login" value={Login} setValue={setLogin}></Input>
			<Input type="password" placeholder="Hasło" value={Password} setValue={setPassword} ></Input>
			<Button onClick={LogUser}>Zaloguj</Button>
			<style jsx>{`
				div{
					position: absolute;
					width:400px;
					max-width:90%;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					background-color: #444;
				}
				`}</style>
		</div>
	)
}
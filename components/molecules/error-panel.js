import { LoginInput as Input, Button } from "../atoms"
import { useState } from "react"
import axios from "axios"

export default function ErrorPanel() {
	const [ErrorText, setErrorText] = useState("")
	const [Message, setMessage] = useState("")
	return (
		<div id="error-panel">
			{Message === "" ?
			<>
			<div id="inputs">
				<Input type="text" placeholder="Opisz swój błąd" value={ErrorText} setValue={setErrorText} className="login-input input-error" textarea></Input>
			</div>
			<Button className="login-button submit-button" addColor="#444" onClick={() => sendError(ErrorText, setMessage)} >Wyślij</Button>
			</>
			:
			<p>{Message}</p>
	}
			<style jsx>{`
				#error-panel{
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

const sendError = (errorMessage, setMessage) => {
	axios.post('api/error', {desc:errorMessage}).then((response) => {
		console.log(response)
		setMessage("Błąd został wysłany, Dziękuje za współpracę")
	}).catch((err) => {
		setMessage("Coś poszło nie tak :(")
	})
}
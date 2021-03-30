import { LoginInput as Input, Button } from "../atoms"
import { useState } from "react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import axios from "axios"
import { useCookies } from "react-cookie"
import { useDispatch } from "react-redux"
import { getUser } from "../../redux/actions/user"
import register from "../../pages/api/user/register"

export default function LoginPanel({ Visibility, setVisibility }) {
	const [Login, setLogin] = useState("");
	const [Password, setPassword] = useState("")
	const [Mail, setMail] = useState("")
	const [Name, setName] = useState("")
	const [Register, setRegister] = useState(false)
	const router = useRouter()
	const [cookies, setCookie, removeCookie] = useCookies()
	const dispatch = useDispatch()

	useEffect(() => {
		if (Visibility === "none") {
			setRegister(false)
		}
	}, [Visibility])

	const LogUser = () => {
		if (Validate([Login, Password])) {
			alert("Wypełnij wszystkie pola")
		}
		else {
			axios.post("api/user/login", { login: Login, password: Password }).then(res => {
				let date = new Date()
				date.setMinutes(date.getMinutes() + 1)
				setCookie('token', res.data.token, { expires: date })
				dispatch(getUser(res.data.user))
				//router.push("user/" + res.data.result._id)
			}).catch(err => {
				console.log(err)
				if (err.response.status === 401) {
					alert("Błędny login lub hasło")
				}
			})
		}
	}

	const RegisterUser = () => {
		if (Validate([Login, Password, Mail, Name])) {
			alert("Wypełnij wszystkie pola")
		}
		else {
			axios.post("api/user/register", { login: Login, password: Password, mail: Mail, name: Name }).then(res => {
				console.log(res)
			})
				.catch(err => { console.log(err.response) })
		}
	}

	const RegisterDom =
		<>
			<Input type="email" placeholder="Email" value={Mail} setValue={setMail} className="login-input"></Input>
			<Input type="text" placeholder="Imie" value={Name} setValue={setName} className="login-input"></Input>
			<Button className="login-button submit-button register-button" onClick={RegisterUser} addColor="#444" >Zarejestruj się</Button>
		</>

	return (
		<div id="login-panel">
			<Button onClick={() => setVisibility("none")} className="menu-exit" addColor="#444">X</Button>
			<div id="inputs">
				<Input type="text" placeholder="Login" value={Login} setValue={setLogin} className="login-input"></Input>
				<Input type="password" placeholder="Hasło" value={Password} setValue={setPassword} className="login-input"></Input>
				{
					Register ? RegisterDom
						: <>
							<Button onClick={LogUser} className="login-button submit-button" addColor="#444" >Zaloguj się</Button>
							<Button className="login-button submit-button register-button" onClick={() => setRegister(true)} addColor="#444" >Zarejestruj się</Button>
						</>
				}
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

const Validate = (InputArray) => {
	return InputArray.some(input => {
		return input === ""
	});
}
import { Modal, LoginPanel as Login } from '../molecules'

export default function LoginModal({Visibility,setVisibility}){
	return (
		<Modal Visibility={Visibility} setVisibility={setVisibility} id="login-panel">
			<Login Visibility={Visibility} setVisibility={setVisibility}></Login>
		</Modal>
	)
}
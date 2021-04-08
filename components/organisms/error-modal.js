import { Modal, ErrorPanel as Error } from '../molecules'

export default function LoginModal({ Visibility, setVisibility }) {
	return (
		<Modal Visibility={Visibility} setVisibility={setVisibility} id="login-panel">
			<Error />
		</Modal>
	)
}
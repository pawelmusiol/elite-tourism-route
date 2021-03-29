import { useState } from "react"
import { Modal, LoginPanel as Login } from '../molecules'

export default function LoginModal({Visibility,setVisibility}){
	return (
		<Modal Visibility={Visibility} setVisibility={setVisibility}>
			<Login setVisibility={setVisibility}></Login>
		</Modal>
	)
}
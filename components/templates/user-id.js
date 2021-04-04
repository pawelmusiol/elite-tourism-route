import { useState, useEffect } from "react"
import { TopBar } from '../organisms'
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { Section } from "../organisms"
import axios from "axios"

const getProfileId = (path) => {
	let splited = path.split('/')
	return splited[splited.length - 1]
}

export default function userId() {
	const [Data, setData] = useState({});
	const router = useRouter()
	let token = useSelector(state => state.user.token)
	if (!Data.success) {
		if (token) {
			axios.get("../api/user/" + getProfileId(router.asPath), {
				headers: { 'Authorization': token }
			}).then((response) => {
				setData(response.data)
			})
		}
	}
	return (
		<div id="main">
			<TopBar />
			<div id="content">
				<Section title="Dane użytkownika" type="user">{Data.user}</Section>
				<Section title="Systemy" type="systems">{Data.systems}</Section>
				<Section title="Punkty" type="beacons">{Data.beacons}</Section>
			</div>
		</div>
	)
}
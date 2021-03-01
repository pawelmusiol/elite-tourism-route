import { ResultBox } from '../molecules'
import { useState, useEffect } from "react"

export default function result({ data }) {


	const [SystemsDom, JumpsDom, Distance] = useRouteData(data)

	return (
		<div id="result">
			<ResultBox area="systems" sectionName="Systemy" data={SystemsDom} />
			<ResultBox area="distance" sectionName="Dystans" data={Distance} />
			<ResultBox area="jumps" sectionName="Skoki" data={JumpsDom} />
			<style jsx>{`
				#result{
					display:grid;
					grid-template:"distance systems" "jumps systems";
				}
				`}</style>
		</div>
	)
}

const useRouteData = (data) => {
	const [SystemsDom, setSystemsDom] = useState("")
	const [JumpsDom, setJumpsDom] = useState("")
	const [Distance, setDistance] = useState("0 Ly")
	useEffect(() => {
		if (data) {
			formatData(data, setSystemsDom, setJumpsDom)
			setDistance(data.distance)
		}
	}, [data])
	return [SystemsDom, JumpsDom, Distance]
}

const formatData = (data, setSystemsDom, setJumpsDom) => {
	setSystemsDom(setSystems(data.combination))
	setJumpsDom(setJumps(data.Jumps))
}

const setSystems = (Systems) => {
	return Systems.map(system => <p><a target="_blank" href={"https://www.edsm.net/en/system/id/" + system.id + "/name/" + system.name}>{system.name}</a></p>)

}

const setJumps = (Jumps) => {
	return Jumps.map((jump, key) => <p key={key}>{key + 1}. {jump.start} {"=>"} {jump.end} Dystans: {Math.floor(jump.distance * 100) / 100} Ly </p>)
}
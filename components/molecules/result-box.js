import { ResultData, Title} from "../atoms"

export default function ResultBox({sectionName,data,area}){
	return(
		<div>
			<Title>{sectionName}</Title>
			<ResultData data={data}/>
			<style jsx>{`
				div{
					grid-area: ${area}
				}
				`}</style>
		</div>
	)
}
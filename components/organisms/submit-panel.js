import { SubmitButton } from '../molecules'

export default function SubmitPanel({onClick}){
	console.log(onClick)
	return (
		<SubmitButton onClick={onClick} />
	)
}
import { Data } from "../atoms"

export default function DataRow({ id ,children, changePosition }) {
	return (
		<div>
			<Data>{children}</Data>
			<p onClick={() => changePosition(id,-1)}>⬆️</p>
			<p onClick={() => changePosition(id,1)}>⬇️</p>
			<style jsx>{`
				div{
					display:flex;
				}
				p{
					cursor:pointer;
				}
				`}</style>
		</div>
	)
}
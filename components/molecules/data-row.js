import { Data } from "../atoms"

export default function DataRow({ id ,children, changePosition, deleteItem }) {
	return (
		<div>
			<Data>{children}</Data>
			<p onClick={() => changePosition(id,-1)}>↑</p>
			<p onClick={() => changePosition(id,1)}>↓</p>
			<p onClick={() => deleteItem(id)}>✖</p>
			<style jsx>{`
				div{
					display:flex;
				}
				p{
					color: #E18100;
					cursor:pointer;
				}
				`}</style>
		</div>
	)
}
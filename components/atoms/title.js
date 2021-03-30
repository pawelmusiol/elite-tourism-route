import Link from "next/link"

export default function Title({ children, className }) {
	return (
		<>
			<Link href="/">
				<h1 className={className}>{children}</h1>
			</Link>
			<style jsx>{`
				h1{
					cursor: pointer;
				}
			`}</style>
		</>
	)
}
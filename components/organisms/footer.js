import { BottomMenu } from '../molecules'

export default function Footer({ children, setVisibility }) {
	return (
		<div id="footer">
			<div className="outer">
				<div className="inner">
					<BottomMenu setVisibility={setVisibility} />
				</div>
			</div>
			<style jsx>{`
				#footer{
					position: fixed;
					bottom:0;
					left:0;
					width: 100%;
					background: #444;
				}
				.outer{
                    max-width: 1000px;
                    margin: auto;
                }
                .inner{
                    width:100%;
                    display:inline-flex;
					flex-direction: row-reverse;
                    justify-content: space-between;
                    align-items: center;
                }
			`}</style>
		</div>
	)
}
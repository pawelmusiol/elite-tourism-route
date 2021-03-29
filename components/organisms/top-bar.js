import { Menu } from "../molecules"
import { Title, Button } from "../atoms"
export default function TopBar({ reset, setVisibility }) {
    return (
        <div className="bar">
            <div className="outer">
                <div className="inner">
                    <Title className="logo">Elite Route Creator</Title>
                    <Menu reset={reset} setVisibility={setVisibility} />
                </div>
            </div>
            <style jsx>{`
                .bar{
                    position:absolute;
                    left:0;
                    top:0;
                    width:100%;
                    background-color: #555;
                }
                .outer{
                    max-width: 1000px;
                    margin: auto;
                }
                .inner{
                    width:100%;
                    display:inline-flex;
                    justify-content: space-between;
                    align-items: center;
                }
                `}</style>
        </div >
    )
}
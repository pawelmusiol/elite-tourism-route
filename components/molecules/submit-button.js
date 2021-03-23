import { Button } from "../atoms"

export default function submitButton({ onClick }) {
    return (
        <div>
            <Button onclick={onClick} className="Buttono">Oblicz</Button>
            <style jsx>{`
                div{
                    display:flex;
                    align-items: center;
                    justify-content: center;
                }
                .Buttono {
                    width: 300px;
                }
                `}</style>
        </div>
    )
}
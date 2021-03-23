import { Button } from "../atoms"

export default function submitButton({ onClick }) {
    return (
        <div>
            <Button onClick={onClick} id="submit-button">Oblicz</Button>
            <style jsx>{`
                div{
                    margin-top: 10px;
                    display:flex;
                    align-items: center;
                    justify-content: center;
                }
                `}</style>
        </div>
    )
}
import { Button } from "../atoms"

export default function submitButton({ onClick }) {
    return (
        <div>
            <Button onClick={onClick} className="submit-button">Oblicz</Button>
            <style jsx>{`
                div{
                    margin: 10px 0;
                    display:flex;
                    align-items: center;
                    justify-content: center;
                }
                `}</style>
        </div>
    )
}
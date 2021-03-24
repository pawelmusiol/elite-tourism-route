export default function TopButton({ onClick, children }) {
    return (
        <button onClick={onClick}>
            {children}
            <style jsx>{`
                button{
                    border: none;
                    border-left: 2px solid black;
                    margin: 10px 0;
                    font-size: 1.5rem;
                }
                `}</style>
        </button>
    )
}
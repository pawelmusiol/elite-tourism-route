export default function submitButton({ onClick }) {
    return (
        <button className="submit" onClick={onClick}>
            <span className="przeslona"></span>
            <span className="main-text">
                Calculate
            </span>
            <style jsx>{`
                .przeslona{
                    width: 0;
                    color:green;
                }
                .submit:hover .przeslona {
                    width: 100%;

                }
            `}</style>
        </button>
    )
}
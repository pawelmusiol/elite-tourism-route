export default function Button({children, onClick}){
	return (
        <button className="submit" onClick={onClick}>
            <span className="test">
                {children}
            </span>
            <span className="main-text">
                {children}
            </span>
            <span className="przeslona">
            </span>
            
            <style jsx>{`
                .submit {
                    position:relative;
                    transition:.2s ease-in;
                }
                .test{
                    visibility:hidden;
                }
                .przeslona{
                    position: absolute;
                    width: 0;
                    height: calc(100% - 2px);
                    top: -2px;
                    left: -1px;
                    background:#E18100;
                    display:block;
                    transition: .2s ease-in;
                    padding: 2px 0px;
                    color: rgba(255,255,255,0);
                    
                }
                .main-text{
                    top: -1px;
                    left: -1px;
                    padding: 2px 6px;
                    z-index:1;
                    position: absolute;
                }
                .submit:hover{
                    color: #333;
                    transition:.2s ease-out;
                }
                .submit:hover .przeslona {
                    padding: 2px 6px;
                    width: calc(100% - 10px);
                    height: calc(100% - 2px);
                    transition: .2s ease-out;
                    color: #333;
                }
            `}</style>
        </button>
    )
}
export default function Button({id, children, onClick, addColor, className }){
    let afterColor = "#333"
    if (addColor) {
        afterColor = addColor
    }
    return (
        <button className={"submit " + className} id={id} onClick={onClick}>
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
					cursor: pointer;
                    position:relative;
                    transition:.2s ease-in;
                }
                .submit::before{
                    z-index: 1;
                    content:"";
                    background-color: ${afterColor};
                    width:5px;
                    height:5px;
                    position:absolute;
                    left:-2px;
                    top:-2px;
                }
                .submit::after{
                    content:"";
                    background-color: ${afterColor};
                    width:5px;
                    height:5px;
                    position:absolute;
                    right:-2px;
                    bottom:-2px;
                }
                .submit:hover:after{
                    background: #fff;
                    transition: .18s ease-in;
                }
                .submit:hover:before{
                    background:#E18100;
                    transition: .1s ease-in;
                }
                .test{
                    visibility:hidden;
                }
                .przeslona{
                    position: absolute;
                    width: 0;
                    height: calc(100% - 2px);
                    top: -1px;
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
                .submit-button {
                    width:50%;
                    font-size: 2rem;
                }
                .submit-button .przeslona {
                    transition: .3s ease-in;                   
                }
                .submit-button:hover .przeslona {
                    transition: .3s ease-out;                   
                }
                .submit-button .main-text {
                    margin-left:50%;
                    transform: translateX(-50%);
                }

            `}</style>
        </button>
    )
}
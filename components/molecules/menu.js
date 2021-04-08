import { TopButton as Button } from "../atoms"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"

export default function Menu({ setVisibility }) {

    let user = useSelector(state => state.user)
    let router = useRouter()
    let link = ""

    if (!router.pathname.includes("user")) {
        link = "user/"
    }
    if (user._id) {
        link += user._id
    }


    return (
        <div className="menu">
            {!user._id ?
                <Button onClick={() => setVisibility("block")}>
                    Zaloguj się
                </Button>
                :
                <Button onClick={() => router.push(link)}>
                    Profil
                </Button>
            }
            <style jsx>{`
                a{
                    color: #E18100;
                    text-decoration: none;
                }
                a:visited{
                    color: #E18100;
                }
                `}</style>
        </div>
    )
}
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
            <Button>
                <a target="_blank" href="https://github.com/pawelmusiol">
                    <img src="data:image/svg+xml;base64,PHN2ZyBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMTIgLjVjLTYuNjMgMC0xMiA1LjI4LTEyIDExLjc5MiAwIDUuMjExIDMuNDM4IDkuNjMgOC4yMDUgMTEuMTg4LjYuMTExLjgyLS4yNTQuODItLjU2NyAwLS4yOC0uMDEtMS4wMjItLjAxNS0yLjAwNS0zLjMzOC43MTEtNC4wNDItMS41ODItNC4wNDItMS41ODItLjU0Ni0xLjM2MS0xLjMzNS0xLjcyNS0xLjMzNS0xLjcyNS0xLjA4Ny0uNzMxLjA4NC0uNzE2LjA4NC0uNzE2IDEuMjA1LjA4MiAxLjgzOCAxLjIxNSAxLjgzOCAxLjIxNSAxLjA3IDEuODAzIDIuODA5IDEuMjgyIDMuNDk1Ljk4MS4xMDgtLjc2My40MTctMS4yODIuNzYtMS41NzctMi42NjUtLjI5NS01LjQ2Ni0xLjMwOS01LjQ2Ni01LjgyNyAwLTEuMjg3LjQ2NS0yLjMzOSAxLjIzNS0zLjE2NC0uMTM1LS4yOTgtLjU0LTEuNDk3LjEwNS0zLjEyMSAwIDAgMS4wMDUtLjMxNiAzLjMgMS4yMDkuOTYtLjI2MiAxLjk4LS4zOTIgMy0uMzk4IDEuMDIuMDA2IDIuMDQuMTM2IDMgLjM5OCAyLjI4LTEuNTI1IDMuMjg1LTEuMjA5IDMuMjg1LTEuMjA5LjY0NSAxLjYyNC4yNCAyLjgyMy4xMiAzLjEyMS43NjUuODI1IDEuMjMgMS44NzcgMS4yMyAzLjE2NCAwIDQuNTMtMi44MDUgNS41MjctNS40NzUgNS44MTcuNDIuMzU0LjgxIDEuMDc3LjgxIDIuMTgyIDAgMS41NzgtLjAxNSAyLjg0Ni0uMDE1IDMuMjI5IDAgLjMwOS4yMS42NzguODI1LjU2IDQuODAxLTEuNTQ4IDguMjM2LTUuOTcgOC4yMzYtMTEuMTczIDAtNi41MTItNS4zNzMtMTEuNzkyLTEyLTExLjc5MnoiIGZpbGw9IiMyMTIxMjEiLz48L3N2Zz4=" />
                    Author
                </a>
            </Button>
            <Button>
                <a target="_blank" href="https://github.com/pawelmusiol/elite-tourism-route">
                    <img src="data:image/svg+xml;base64,PHN2ZyBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMTIgLjVjLTYuNjMgMC0xMiA1LjI4LTEyIDExLjc5MiAwIDUuMjExIDMuNDM4IDkuNjMgOC4yMDUgMTEuMTg4LjYuMTExLjgyLS4yNTQuODItLjU2NyAwLS4yOC0uMDEtMS4wMjItLjAxNS0yLjAwNS0zLjMzOC43MTEtNC4wNDItMS41ODItNC4wNDItMS41ODItLjU0Ni0xLjM2MS0xLjMzNS0xLjcyNS0xLjMzNS0xLjcyNS0xLjA4Ny0uNzMxLjA4NC0uNzE2LjA4NC0uNzE2IDEuMjA1LjA4MiAxLjgzOCAxLjIxNSAxLjgzOCAxLjIxNSAxLjA3IDEuODAzIDIuODA5IDEuMjgyIDMuNDk1Ljk4MS4xMDgtLjc2My40MTctMS4yODIuNzYtMS41NzctMi42NjUtLjI5NS01LjQ2Ni0xLjMwOS01LjQ2Ni01LjgyNyAwLTEuMjg3LjQ2NS0yLjMzOSAxLjIzNS0zLjE2NC0uMTM1LS4yOTgtLjU0LTEuNDk3LjEwNS0zLjEyMSAwIDAgMS4wMDUtLjMxNiAzLjMgMS4yMDkuOTYtLjI2MiAxLjk4LS4zOTIgMy0uMzk4IDEuMDIuMDA2IDIuMDQuMTM2IDMgLjM5OCAyLjI4LTEuNTI1IDMuMjg1LTEuMjA5IDMuMjg1LTEuMjA5LjY0NSAxLjYyNC4yNCAyLjgyMy4xMiAzLjEyMS43NjUuODI1IDEuMjMgMS44NzcgMS4yMyAzLjE2NCAwIDQuNTMtMi44MDUgNS41MjctNS40NzUgNS44MTcuNDIuMzU0LjgxIDEuMDc3LjgxIDIuMTgyIDAgMS41NzgtLjAxNSAyLjg0Ni0uMDE1IDMuMjI5IDAgLjMwOS4yMS42NzguODI1LjU2IDQuODAxLTEuNTQ4IDguMjM2LTUuOTcgOC4yMzYtMTEuMTczIDAtNi41MTItNS4zNzMtMTEuNzkyLTEyLTExLjc5MnoiIGZpbGw9IiMyMTIxMjEiLz48L3N2Zz4=" />
                    Code
                </a>
            </Button>
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
                img{
                    margin-top:2%;
                    width:1.4rem;
                }
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
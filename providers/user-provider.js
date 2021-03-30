import { useEffect } from "react"
import { useCookies } from 'react-cookie'
import { useSelector, useDispatch } from "react-redux"
import axios from 'axios'
import { getUser } from "../redux/actions/user"

const useGetUser = () => {

	const dispatch = useDispatch()
    const [cookies, setCookie, removeCookie] = useCookies()
    let user = useSelector(state => state.user)
    useEffect(() => {
        if (cookies.token && !user._id) {
            axios.get("api/user/login", {
                headers: { authorization: cookies.token }
            }).then(result => {
                dispatch(getUser(result.data.user))
            })
        }
        return "dupa"
    }, [])
  }

export default function UserProvider({children}){
    let user = useGetUser()

    return(
        <>{children}</>
    )
}
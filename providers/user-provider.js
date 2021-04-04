import { useEffect, useState } from "react"
import { useCookies, Cookies } from 'react-cookie'
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/router"
import axios from 'axios'
import { getUser } from "../redux/actions/user"

const useGetUserOrRedirect = (router) => {
    const dispatch = useDispatch()
    let user = useSelector(state => state.user)
    let CookieProvider = new Cookies()
    useEffect(() => {
        let token = CookieProvider.get('token')
        let pre = getRouteDeep(router.asPath)
        if (token && !user._id) {
            axios.get(pre + "api/user/login", {
                headers: { authorization: token }
            }).then(result => {
                let user = result.data.user
                user.token = token
                dispatch(getUser(result.data.user))
            }).catch(error => console.error(error))
        }
        if (!token) {
            dispatch(getUser({}))
            router.push('/')
        }
    }, [router.pathname])

}

const getRouteDeep = (path) => {
    let preLength = path.split('/').length - 2
    let pre = ""
    for (let i = 0; i < preLength; i++) {
        pre += "../"
    }
    return pre

}

export default function UserProvider({ children }) {
    let router = useRouter()
    useGetUserOrRedirect(router)


    return (
        <>{children}</>
    )
}
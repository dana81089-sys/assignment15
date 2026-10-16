import { createContext, useEffect, useState } from "react";
import type { user } from "../user";
import axios from "axios";


export let authContext = createContext()



export default function AuthContextProvider({ children }) {

    let [userdata, setuser] = useState<user | null>(null)

    async function getProfile(token:string|null) {
    try {
        let { data } = await axios.get(`https://route-posts.routemisr.com/users/profile-data`, {
            headers: {
               Authorization: `Bearer ${token}`
            }
        })
        console.log(data)
         setuser(data.data.user);
    } catch (err) {
        console.log(err.response.message)
    }

}

useEffect(() => {
    if (localStorage.getItem("userToken")) {
        getProfile(localStorage.getItem("userToken"))
    }
}, [])

    return <authContext.Provider value={{ userdata, setuser }}>
        {children}
    </authContext.Provider>

}
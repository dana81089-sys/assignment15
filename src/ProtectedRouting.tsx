import React from 'react'
import Login from './Login'
import { Navigate } from 'react-router'

export default function ProtectedRouting({children}) {
    if(localStorage.getItem("userToken")){
        return children
    }else{
        return <Navigate to={"/login"}/>
    }

}

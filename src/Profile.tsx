import React, { useContext } from 'react'
import { authContext } from './context/AuthContext'
import type { user } from './user'

export default function Profile() {

  let { userdata }: { userdata: user } = useContext(authContext)
  return (
    <>
      <title>
        Profile
      </title>
       <div>
        <img src={userdata?.photo} className='w-1/4 rounded-full' />
        <p className='text-red-950'>{userdata?.username}</p>
        <p className='text-red-950'>{userdata?.email}</p>
      </div></>
  )
}


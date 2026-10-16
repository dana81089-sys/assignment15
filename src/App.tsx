import React from 'react'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router'
import Layout from './Layout'
import Register from './Register'
import Login from './Login'
import AuthContextProvider from './context/AuthContext'
import Profile from './Profile'
import Feed from './Feed'
import ProtectedRouting from './ProtectedRouting'
import PostDetail from './PostDetail'
import Notfound from './Notfound/Notfound'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Offline } from "react-detect-offline";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
export default function App() {

  const router = createHashRouter([
    {
      path: '', element: <Layout />, children: [
        { path: 'register', element: <Register /> },
        { path: 'login', element: <Login /> },
        { path: 'feed', element: <ProtectedRouting><Feed /></ProtectedRouting> },
        { path: '', element: <ProtectedRouting><Feed /></ProtectedRouting> },
        { path: 'post/:id', element: <ProtectedRouting><PostDetail /></ProtectedRouting> },
        { path: 'profile', element: <ProtectedRouting><Profile /></ProtectedRouting> },
        { path: '*', element: <Notfound /> }
      ]
    }
  ])
  let client = new QueryClient()
  return (
    <>
      <QueryClientProvider client={client}>
        <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    <ReactQueryDevtools/>
      </QueryClientProvider>
      <Offline><p className='bg-red-950 text-white p-2'>You're offline right now. Check your connection.</p></Offline>
      
    </>
  )
}

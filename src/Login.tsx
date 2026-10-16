import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import { authContext } from './context/AuthContext'
export default function Login() {

  let { setuser } = useContext(authContext)
  let nav = useNavigate()

  let validschema = zod.object({

    email: zod.email("enter valid email"),

    password: zod.string().regex(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      "enter valid password"
    ),

  })

  type user = zod.infer<typeof validschema>
  const { handleSubmit, register, formState: { errors }, setValue } = useForm<user>({
    defaultValues: {

      password: "",

    },
    resolver: zodResolver(validschema)
  })

  async function handleApi(values: user) {
    console.log(values)
    try {
      let { data } = await axios.post(`https://route-posts.routemisr.com/users/signin`, values)
      Swal.fire({
        title: 'Success!',
        text: data.message,
        icon: 'success',
        confirmButtonText: 'Cool'
      })

      setuser(data?.data?.user)
      console.log(data.data)
      localStorage.setItem("userToken", data.data.token)
      setTimeout(() => {
        nav('/')
      }, 2000)
    } catch ({ response: { data } }) {
      console.log(data.message)
      Swal.fire({
        title: 'Error!',
        text: data.message,
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }

  }


  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

        <form onSubmit={handleSubmit(handleApi)} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

          <h2 className="text-2xl font-bold text-center mb-6">
            Login Form
          </h2>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              {...register("password")}
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>

        </form>

      </div>
    </div>
  )
}

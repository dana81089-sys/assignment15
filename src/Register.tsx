import React from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'
export default function Register() {
  let nav = useNavigate()

  let validschema = zod.object({
    name: zod.string().min(3, "min char 2").max(20, "max char 20"),

    email: zod.email("enter valid email"),

  password: zod.string().regex(
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
  "Password must contain letters, numbers, and a special character"
),
    rePassword: zod.string().regex(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      "enter valid repass"
    ),
    dateOfBirth: zod.date().refine((data) => {
      let nowdate = new Date()
      let nowyear = nowdate.getFullYear()
      let newdate = data.getFullYear()

      return (nowyear - newdate) > 10

    }, {
      error: "date not valid"
    }),

    gender: zod.enum(["male", "female"]),

  }).refine((data) => data.password === data.rePassword, {
    error: "password not match",
    path: ["rePassword"]
  })

  type user = zod.infer<typeof validschema>
  const { handleSubmit, register, formState: { errors }, setValue } = useForm<user>({
    defaultValues: {
      name: "",
      // userName: "",
      email: " ",
      password: "",
      rePassword: "",
      gender: "male",
      dateOfBirth: null
    },
    resolver: zodResolver(validschema)
  })

  async function handleApi(values: user) {
    console.log(values)
    try {
      let res = await axios.post(`https://route-posts.routemisr.com/users/signup`, values).then(({ data }) => {
        Swal.fire({
          title: 'Success!',
          text: data.message,
          icon: 'success',
          confirmButtonText: 'Cool'
        })
      })
      setTimeout(() => {
        nav('/login')
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
            Registration Form
          </h2>

          {/* Name */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Name
            </label>

            <input
              {...register("name")}
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          {/* <div className="mb-4">
            <label className="block mb-2 font-medium">
              userName
            </label>

            <input
              {...register("userName")}
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div> */}

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

          {/* Date Picker */}
          <div className="mb-4">
            <label className="block mb-2 font-medium"> Date of Birth </label>
            <input name="dateOfBirth" onChange={(e) => {
              setValue("dateOfBirth", new Date(e.target.value))
            }}

              type="date"
              className="w-full border border-gray-300 rounded-md p-2" />
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
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Repassword
            </label>

            <input
              {...register("rePassword")}
              type="password"
              placeholder="Enter your repassword"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.rePassword && (
              <p className="text-red-500">{errors.rePassword.message}</p>
            )}
          </div>

          {/* Gender Dropdown */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Gender
            </label>

            <select
              {...register("gender")}
              className="w-full border border-gray-300 rounded-md p-2 bg-white"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Register
          </button>

        </form>

      </div>


    </div>
  )
}

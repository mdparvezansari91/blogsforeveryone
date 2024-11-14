"use client"
import { useState } from "react"
import { useAppDispatch } from "@/store/hooks" // Use the typed dispatch
import { signIn } from "@/store/features/auth/authSlice"
import { useRouter } from "next/navigation"
import Image from "next/image"

// export default function Signin() {
    
//     const dispatch = useAppDispatch()
//     const router = useRouter()

//     const [data,setData] = useState({
        
//         email:"",
//         password:"",
//     })
// const handleSubmit =async ()=>{
//     try {
//         const resultAction = await dispatch(signIn(data))
//         if (signIn.fulfilled.match(resultAction)) {
//             // Sign-in was successful
//             router.push('/') // Redirect to home page
//         } else {
//             // Handle sign-in failure if needed
//             console.error('Sign-in failed:', resultAction.error)
//         }
//     } catch (error) {
//         console.error('An error occurred during sign-in:', error)
//     }
// }
    
//     return (
//         <>
//             <div className="container bg-gray-400 ">
//                 <h1>Sign In</h1>
//                 <div className="bg-green-900 p-10 rounded-lg">
//                     <div className="flex flex-col mb-4">
//                         <label className="text-lg font-bold mb-2">Email</label>
//                         <input type="email" name="email" onChange={(e)=>setData(prev=>({...prev,email:e.target.value}))} className="p-2 rounded-lg border border-gray-400" />
//                     </div>
//                     <div className="flex flex-col mb-4">
//                         <label className="text-lg font-bold mb-2">Password</label>
//                         <input type="password" onChange={(e)=>{setData(prev=>({...prev,password:e.target.value}))}} className="p-2 rounded-lg border border-gray-400" />
//                     </div>
//                     <button onClick={handleSubmit} className="">Submit</button>
//                 </div>
//             </div>
//         </>
//     )
// }





/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/


export default function Signin() {

    const dispatch = useAppDispatch()
    const router = useRouter()

    const [data,setData] = useState({
        
        email:"",
        password:"",
    })
const handleSubmit =async (e:React.FormEvent)=>{
    try {
        e.preventDefault()
        const resultAction = await dispatch(signIn(data))
        if (signIn.fulfilled.match(resultAction)) {
            // Sign-in was successful
            router.push('/') // Redirect to home page
        } else {
            // Handle sign-in failure if needed
            console.error('Sign-in failed:', resultAction.error)
        }
    } catch (error) {
        console.error('An error occurred during sign-in:', error)
    }
}
    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image
              alt="Your Company"
              src=""
              width={32}
              height={32}
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={(e)=>setData(prev=>({...prev,email:e.target.value}))}
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={(e)=>{setData(prev=>({...prev,password:e.target.value}))}}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
  
              <div>
                <button
                onClick={handleSubmit}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Not a member?{' '}
              <a href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </>
    )
  }
  
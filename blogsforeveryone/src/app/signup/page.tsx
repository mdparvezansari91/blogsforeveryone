"use client"
import { useState } from "react"
import { useAppDispatch } from "@/store/hooks" // Use the typed dispatch
import { signUp } from "@/store/features/auth/authSlice"

import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function Signup() {
    const router = useRouter();
    const dispatch = useAppDispatch()

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const handleSubmit = async () => {
        try {
            const resultAction = await dispatch(signUp(data))
        if (signUp.fulfilled.match(resultAction)){
            router.push("/signin")
            toast.success("please sign in")
        } else{
            console.error('Sign-up failed:', resultAction.error)
        }
        } catch (error) {
          console.log("An error occured in Signup:",error)  
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h1>
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col">
                        <label className="text-lg font-semibold mb-2">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))} 
                            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-lg font-semibold mb-2">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            onChange={(e) => setData(prev => ({ ...prev, email: e.target.value }))} 
                            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-lg font-semibold mb-2">Password</label>
                        <input 
                            type="password" 
                            onChange={(e) => setData(prev => ({ ...prev, password: e.target.value }))} 
                            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button 
                        onClick={handleSubmit} 
                        className="mt-4 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}
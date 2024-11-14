"use client"


// import { signUp } from "@/store/features/auth/authSlice"
import { useState } from "react"
import { useAppDispatch } from "@/store/hooks" // Use the typed dispatch
import { signUp } from "@/store/features/auth/authSlice"


export default function Signup() {
    const dispatch = useAppDispatch()

    const [data,setData] = useState({
        
        email:"",
        password:"",
    })
const handleSubmit =async ()=>{
    await dispatch(signUp(data))
}
    
    return (
        <>
            <div className="container bg-gray-400 ">
                <h1>Sign Up</h1>
                <div className="bg-green-900 p-10 rounded-lg">
                    <div className="flex flex-col mb-4">
                        <label className="text-lg font-bold mb-2">Email</label>
                        <input type="email" name="email" onChange={(e)=>setData(prev=>({...prev,email:e.target.value}))} className="p-2 rounded-lg border border-gray-400" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-lg font-bold mb-2">Password</label>
                        <input type="password" onChange={(e)=>{setData(prev=>({...prev,password:e.target.value}))}} className="p-2 rounded-lg border border-gray-400" />
                    </div>
                    <button onClick={handleSubmit} className="">Submit</button>
                </div>
            </div>
        </>
    )
}
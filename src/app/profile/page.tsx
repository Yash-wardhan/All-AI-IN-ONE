'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

function ProfilePage() {
    const [name, setName] = useState("")
    const [isVerified,SetIsVerified] = useState(false)
    const router = useRouter()
    const [short_Username,setShort_Username] = useState("NAN")
    const logout = async() =>{
        try {
            await axios.get('/api/users/logout')
            toast.success("Logout Success")
            router.push('/')   
        } catch (error:any) {
            toast.error("Error Logging Out",error.message)
        }
  }
  useEffect(()=>{
    const getUserDetail = async()=>{
        const res = await axios.get('/api/users/me')
        const Data = res.data.data
        setName(Data.username)
        if(Data.isVerified){
            SetIsVerified(true)
        } 
        setShort_Username(()=>{
            return name.slice(0,1)
        })
    }
    getUserDetail()
  })
  return (
    <div className='max-w-screen-xl mx-auto px-4 py-4 text-white'>
        <div className="flex justify-between items-center" role="group" aria-label="Basic example">
                <div className="text-3xl font-mono font-bold">AI Content</div> 
                <div className='flex items-center gap-3'>
                    <div className='flex items-center'><div className='text-orange-300 bg-dark font-mono rounded-full flex items-center justify-center w-7 h-7 p-2 font-extrabold'>{short_Username}</div><span className=' py-1 px-2 capitalize'>{name}</span></div>
                    <button onClick={logout} className="btn btn-dark px-2 py-1">Logout</button>
                </div>
        </div>
        <div className='h-screen flex items-center justify-center'>
            {isVerified? <h1>Please use Tools</h1>:<h1>Please Verified Account/Check Mail</h1>}
        </div>
      <Toaster />
    </div>
  )
}

export default ProfilePage
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const VerifyEmail = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState('')
    const {BASE_URL} = useContext(AuthContext)
    const verifyOtp = async(e)=>{
        e.preventDefault()
        try{
            axios.defaults.withCredentials = true
        const response = await axios.post(`${BASE_URL}/user/verifyotp`,{'OTP':formData})
        const data = await response.data
        if(data.success === true){
            toast.success(data.message)
            setTimeout(()=>{
              navigate('/dashboard')  
            }, 2000)
        }else{
            console.log(data.message)
        }
        }catch(error){
            console.log(error.message)
        }
    }
    return (
        <div className='max-w-7xl mx-auto min-h-screen flex items-center justify-center'>
            <div className='flex flex-col items-start justify-start gap-1 border border-neutral-300 rounded-lg shadow-sm px-5 py-7 w-100'>
                <div className='flex flex-col'>
                    <h1 className='text-2xl tracking-tight font-medium'>Verify Email</h1>
                    <p className='text-neutral-500 tracking-tight '>verify your account using OTP</p>
                </div>
                <form onSubmit={verifyOtp} className='flex flex-col mt-3 w-full gap-2'>
                    <label className="text-lg font-medium tracking-tight text-neutral-700">Enter OTP:</label>
                    <input type="number" onChange={(e)=>setFormData(e.target.value)} value={formData} className='text-sm w-full px-3 py-2 border border-neutral-300 rounded-lg outline-none' />
                    <button className='w-full py-2 mt-1 border border-neutral-300 rounded-lg bg-linear-to-r from-[#009689] to-[#46ecd5] text-white cursor-pointer hover:scale-102 transition-all duration-300'>Verify OTP</button>
                </form>

            </div>
        </div>
    )
}

export default VerifyEmail
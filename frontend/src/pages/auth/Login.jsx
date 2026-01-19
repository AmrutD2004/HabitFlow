import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Calendar, CalendarFold, Mail, User, Lock, ArrowRight, EyeClosed, Eye, Loader2 } from 'lucide-react'
import { toast, Toaster } from 'react-hot-toast'
import { AuthContext } from '../../context/AuthContext'


const Login = () => {
    const {BASE_URL, isLoggedIn, setIsLoggedIn, getUserData} = useContext(AuthContext)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [seePassword, setSeePassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        setIsLoggedIn(true)
        getUserData()
        toast.success(data.message)

        setTimeout(() => {
          navigate('/dashboard')
        }, 2000)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error)
      console.log(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }
    return (
        <div className='max-w-7xl min-h-screen mx-auto flex flex-col items-center justify-center space-y-2'>
            <div className='flex flex-col items-start justify-start gap-1.5 w-90  lg:w-100'>
                <h1 className='text-2xl font-semibold tracking-tight text-shadow-2xs'>Login To Your Account</h1>
                <p className='text-sm text-neutral-500'>Continue your habit tracking journey today</p>
            </div>
            <form onSubmit={handleSubmit} className='border border-neutral-300 px-4 py-3 w-90 flex flex-col space-y-4 shadow-sm lg:w-100'>
                <div className='flex flex-col items-start justify-start gap-2 pt-3'>
                    <label className='text-sm font-medium flex items-center gap-1'><Mail size={14} />Email Address</label>
                    <input onChange={handleChange} className='w-full px-3 py-2 border border-neutral-300 outline-none text-sm' type="text" name='email' placeholder='you@example.com' value={formData.email} />
                </div>
                <div className="flex items-start justify-start gap-2 w-full">
                    <div className="flex flex-col w-full gap-2 relative">

                        <label className="text-sm font-medium flex items-center gap-1">
                            <Lock size={14} />
                            Password
                        </label>

                        <input onChange={handleChange}
                            type={`${seePassword ? 'text' : 'password'}`}
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 pr-10 border border-neutral-300 outline-none text-sm"
                            name='password' value={formData.password}
                        />
                        <button type='button' onClick={() => setSeePassword(!seePassword)}>
                            {seePassword ? <EyeClosed
                                size={16}
                                className="absolute right-3 top-10 text-neutral-500 cursor-pointer hover:text-neutral-700 transition-colors duration-200"
                            /> : <Eye
                                size={16}
                                className="absolute right-3 top-10 text-neutral-500 cursor-pointer hover:text-neutral-700 transition-colors duration-200"
                            />}
                        </button>



                    </div>
                </div>

                <div className="flex items-center justify-center mx-auto w-full py-2">
                    {loading ? <button className="flex items-center justify-center gap-1 w-full bg-[#ed1d25] text-white font-medium py-2 cursor-pointer hover:scale-102 transition-all duration-300">
                        <Loader2 className='font-medium animate-spin' size={18} />please wait ...
                    </button> :
                        <button className="flex items-center justify-center gap-1 w-full bg-[#ed1d25] text-white font-medium py-2 cursor-pointer hover:scale-102 transition-all duration-300">
                            Login
                            <ArrowRight className='font-medium mt-1' size={18} />
                        </button>}

                </div>
                <div className='w-full mx-auto flex items-center justify-center text-sm text-neutral-500 gap-1'>
                    Don't have an account? <Link to={'/signup'} className='font-medium text-red-500 hover:underline'>Sign Up</Link>
                </div>
            </form>
        </div>
    )
}

export default Login
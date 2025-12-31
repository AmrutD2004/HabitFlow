import { Flame } from 'lucide-react'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const LandingNavbar = () => {
    const navigate = useNavigate()
    const { isLoggedIn } = useContext(AuthContext)
  return (
    <div className='fixed z-50 top-0 bg-white/20 backdrop-blur-sm w-full border-b border-neutral-300'>
        <div className='max-w-7xl mx-auto'>
            <div className='flex items-center justify-between py-5'>
            <Link to={'/'} className='flex items-center gap-3'>
                <div className='p-2 rounded-lg bg-[#ed1d25] text-white scale-90 '>
                    <Flame />
                </div>
                <span className='text-[#272323] font-semibold tracking-wide leading-tight text-2xl'>HabitFlow</span> 
            </Link>
            {isLoggedIn ? (
                <button onClick={()=> navigate('/dashboard')} className='px-4 py-2 bg-[#ed1d25] text-white shadow-md cursor-pointer hover:scale-102 transition-all duration-300 '>Dashboard</button>
            ) : (
                <div className='flex items-center justify-center gap-3 font-medium'>
                <button onClick={()=> navigate('/login')} className='hover:text-white hover:bg-[#ed1d25] transition-colors duration-300 cursor-pointer px-4 py-2'>Log In</button>
                <button onClick={()=> navigate('/signup')} className='px-4 py-2 bg-[#ed1d25] text-white shadow-md cursor-pointer hover:scale-102 transition-all duration-300 '>Get Started</button>
            </div>
            )}
            
        </div>
        </div>
    </div>
  )
}

export default LandingNavbar
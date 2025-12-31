import React from 'react'
import UserLayout from '../../layout/UserLayout'
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import dayjs from 'dayjs'
import { Calendar, LogOut, Mail, Save, Shield, User } from 'lucide-react'
import { AnimatePresence, motion } from "motion/react"
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()

  const [toggle, setToggel] = useState(false)

  const { setIsLoggedIn, userData, setUserData, BASE_URL, habitData, getUserData } = useContext(AuthContext)

  useEffect(() => {
    if (userData?.username) {
      setFormData({ username: userData.username });
    }
  }, [userData]);


  const [formData, setFormData] = useState({
    username: userData.username
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev, [name]: value
    }))
  }

  axios.defaults.withCredentials = true
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      
      const response = await axios.put(`${BASE_URL}/user/updateUserData`, {
        'username': formData.username
      })
      const data = await response.data
      if (data.success) {
        toast.success(data.message)
        await getUserData()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/user/logout`)
      const data = await response.data

      if (data.success === true) {
        toast.success(data.message)
        setTimeout(() => {
          setIsLoggedIn(false)
          setUserData(null)
          navigate('/login')
        }, 2000)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error.message)
    }
  }
  return (
    <UserLayout>
      <div className='max-w-4xl mx-auto'>
        <motion.div
        initial ={{
            opacity : 0,
            filter : 'blur(10px)'
          }}
          animate ={{
            opacity : 1,
            filter : 'blur(0px)',
            transition : {
              duration : 0.3,
              ease : "easeInOut"
            }
          }}
        className='flex items-start justify-start '>
          <div className='flex flex-col items-start justify-start gap-1'>
            <h1 className='text-3xl font-bold tracking-tight text-[#272323]'>Profile</h1>
            <p className='text-neutral-500 tracking-tight leading-tight text-sm'>Manage your account settings</p>
          </div>
        </motion.div>
        <motion.div
        initial ={{
        scale : 0.98,
        opacity : 0
      }}
      animate ={{
        scale : 1,
        opacity : 1,
        transition : {
          duration : 0.3,
          ease : 'easeInOut'
        }
      }}
        className='w-full border border-neutral-300 px-5 py-3 mt-4 rounded-lg shadow-sm bg-white'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-center gap-4'>
              <div className='border border-neutral-300 w-25 h-25 rounded-2xl bg-[#ed1d25] text-white flex items-center justify-center'>
                <span className='text-4xl font-bold'>{userData?.username?.[0]?.toUpperCase()}</span>
              </div>
              <div className='flex flex-col items-start justify-start gap-2'>
                <span className='text-[#272323] font-bold text-lg'>{userData?.username}</span>
                <div className='flex flex-col items-start justify-start text-neutral-500 text-sm'>
                  <span className='flex items-center gap-2'><Mail size={18} />{userData?.email}</span>
                  <span className='flex items-center gap-2'><Calendar size={18} />Joined {dayjs(userData?.created_at).format('MMMM D, YYYY')}</span>
                </div>
              </div>
            </div>
            <button onClick={() => setToggel(!toggle)} className='text-[#272323] px-4 py-2 border border-neutral-300 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors duration-300 rounded-lg shadow-sm font-medium tracking-tight leading-tight'>{!toggle ? 'Edit Profile' : 'Cancle'}</button>
          </div>
          <AnimatePresence>
          {toggle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.4 } }}
              exit={{ opacity: 0 , transition: { duration: 0.4 }}}
            >

              <hr className='mt-8 text-neutral-300' />

              <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                <div className='flex items-center justify-between gap-3 mt-6 w-full'>
                  <div className='flex flex-col items-start justify-start gap-2 w-full'>
                    <label className="text-base font-semibold tracking-tight text-neutral-600 flex items-center gap-2"><User size={18} />Display Name:</label>
                    <input onChange={handleChange} name='username' type="text" className='w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm' value={formData.username} />
                  </div>
                  <div className='flex flex-col items-start justify-start gap-2 w-full'>
                    <label className="text-base font-semibold tracking-tight text-neutral-600 flex items-center gap-2"><Mail size={18} />Email:</label>
                    <input disabled type="text" className='w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm cursor-not-allowed bg-gray-100 text-neutral-500' value={userData?.email} />
                  </div>

                </div>
                <div className='w-full flex items-end justify-end mt-5'>
                  <button className='flex items-center gap-2 font-medium px-4 py-2 border border-neutral-300 hover:scale-102 transition-all duration-300 text-sm bg-[#ed1d25] text-white   cursor-pointer'><Save size={18} />Save Changes</button>
                </div>
              </form>
            </motion.div>
          )}
          </AnimatePresence>

        </motion.div>

        <motion.div 
        initial ={{
        scale : 0.98,
        opacity : 0
      }}
      animate ={{
        scale : 1,
        opacity : 1,
        transition : {
          duration : 0.3,
          delay : 0.2,
          ease : 'easeInOut'
        }
      }}
        className='w-full border border-neutral-300 mt-10 rounded-lg px-5 py-4 bg-white flex flex-col space-y-7'>
          <h1 className='flex items-center gap-2 font-semibold tracking-tight leading-tight text-lg text-neutral-800'><Shield size={18} />Account</h1>
          <div className='flex flex-col items-start justify-start gap-1'>
            <h1 className='font-semibold tracking-tight leading-tight text-balance text-neutral-700'>Account type</h1>
            <p className='text-sm text-neutral-500 tracking-tight leading-tight'>Standard User</p>
          </div>
          <hr className='text-neutral-300' />
          <div className='flex items-center justify-between pb-4'>
            <div className='flex flex-col items-start justify-start gap-1'>
              <h1 className='font-semibold tracking-tight leading-tight text-balance text-neutral-700'>Sign Out</h1>
              <p className='text-sm text-neutral-500 tracking-tight leading-tight'>Sign out of your account on this device</p>
            </div>
            <button onClick={handleLogout} className=' px-4 py-2 border border-neutral-300 bg-gray-50 hover:bg-red-100 cursor-pointer transition-colors duration-300 rounded-lg shadow-sm font-medium tracking-tight leading-tight flex items-center gap-2 text-red-500'><LogOut className='mt-1' size={18} />Sign Out</button>
          </div>
        </motion.div>
      </div>
    </UserLayout>
  )
}

export default Profile
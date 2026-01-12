import React, { useContext, useState, useEffect } from 'react'
import UserLayout from '../../layout/UserLayout'
import { motion, AnimatePresence } from 'motion/react'
import { AuthContext } from '../../context/AuthContext'
import dayjs from 'dayjs'
import { Calendar, LogOut, Mail, Save, Shield, User } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  const [toggle, setToggle] = useState(false)

  const {
    setIsLoggedIn,
    userData,
    setUserData,
    BASE_URL,
    getUserData
  } = useContext(AuthContext)

  const [formData, setFormData] = useState({ username: '' })

  useEffect(() => {
    if (userData?.username) {
      setFormData({ username: userData.username })
    }
  }, [userData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  axios.defaults.withCredentials = true

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(`${BASE_URL}/user/updateUserData`, {
        username: formData.username
      })

      if (data.success) {
        toast.success(data.message)
        await getUserData()
        setToggle(false)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(`${BASE_URL}/user/logout`)
      if (data.success) {
        toast.success(data.message)
        setTimeout(() => {
          setIsLoggedIn(false)
          setUserData(null)
          navigate('/login')
        }, 1500)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <UserLayout>
      <div className='max-w-4xl mx-auto px-3 sm:px-0'>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          className='mb-4'
        >
          <h1 className='text-2xl sm:text-3xl font-bold'>Profile</h1>
          <p className='text-sm text-neutral-500'>Manage your account settings</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className='bg-white border border-neutral-300 rounded-lg shadow-sm p-4 sm:p-5'
        >
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div className='flex items-center gap-4'>
              <div className='w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#ed1d25] text-white flex items-center justify-center'>
                <span className='text-2xl sm:text-3xl font-bold'>
                  {userData?.username?.[0]?.toUpperCase()}
                </span>
              </div>

              <div>
                <p className='font-semibold text-lg'>{userData?.username}</p>
                <p className='text-sm text-neutral-500 flex items-center gap-1'>
                  <Mail size={16} /> {userData?.email}
                </p>
                <p className='text-sm text-neutral-500 flex items-center gap-1'>
                  <Calendar size={16} /> Joined {dayjs(userData?.created_at).format('MMMM D, YYYY')}
                </p>
              </div>
            </div>

            <button
              onClick={() => setToggle(!toggle)}
              className='w-full md:w-auto border border-neutral-300 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium'
            >
              {toggle ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {/* Edit Form */}
          <AnimatePresence>
            {toggle && (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className='mt-6 space-y-4'
              >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='text-sm font-medium flex items-center gap-1'>
                      <User size={16} /> Display Name
                    </label>
                    <input
                      name='username'
                      value={formData.username}
                      onChange={handleChange}
                      className='w-full mt-1 px-3 py-2 border border-neutral-300 rounded-lg text-sm'
                    />
                  </div>

                  <div>
                    <label className='text-sm font-medium flex items-center gap-1'>
                      <Mail size={16} /> Email
                    </label>
                    <input
                      disabled
                      value={userData?.email}
                      className='w-full mt-1 px-3 py-2 border border-neutral-300 rounded-lg bg-gray-100 text-sm text-neutral-500'
                    />
                  </div>
                </div>

                <div className='flex justify-end'>
                  <button className='flex items-center gap-2 bg-[#ed1d25] text-white px-4 py-2 rounded-lg text-sm'>
                    <Save size={16} /> Save Changes
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Account Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className='bg-white border border-neutral-300 rounded-lg p-4 sm:p-5 mt-6 space-y-6'
        >
          <h2 className='flex items-center gap-2 font-semibold'>
            <Shield size={18} /> Account
          </h2>

          <div>
            <p className='font-medium'>Account type</p>
            <p className='text-sm text-neutral-500'>Standard User</p>
          </div>

          <hr />

          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div>
              <p className='font-medium'>Sign Out</p>
              <p className='text-sm text-neutral-500'>
                Sign out of your account on this device
              </p>
            </div>

            <button
              onClick={handleLogout}
              className='flex items-center justify-center gap-2 border border-neutral-300 px-4 py-2 rounded-lg text-red-500 hover:bg-red-100'
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </motion.div>

      </div>
    </UserLayout>
  )
}

export default Profile

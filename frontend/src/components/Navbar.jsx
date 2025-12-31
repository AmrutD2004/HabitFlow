import { Bell, Search, ChevronDown, ChevronUp } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { HabitTrackingContext } from '../context/HabitTrackingContext'
import { DateTime } from 'luxon'

const Navbar = () => {
  const [toggleMenu, setToggelMenu] = useState(false)
  const { setIsLoggedIn, userData, setUserData, BASE_URL, habitData, isLoggedIn } = useContext(AuthContext)
  const { userHabitTrackingData } = useContext(HabitTrackingContext)
  const [notification, setNotification] = useState(false)
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/user/logout`, {
        withCredentials: true
      })
      const data = await response.data

      if (data.success === true) {
        toast.success(data.message)
        setTimeout(() => {
          setIsLoggedIn(false)
          setUserData(false)
          navigate('/login')
        }, 2000)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error.message)
    }
  }

  const sendVerifyEmailOtp = async () => {
    axios.defaults.withCredentials = true
    const response = await axios.post(`${BASE_URL}/user/sendotp`)
    const data = await response.data
    console.log(data)
    if (data.success === true) {
      toast.success(data.message)
      setTimeout(() => {
        navigate('/verifyEmail')
      }, 2000)
    }
  }

  const [allnotification, setAllNotification] = useState([])

  const fetchAllNotifications = async () => {
    try {

      axios.defaults.withCredentials = true
      const response = await axios.get(`${BASE_URL}/notification/getAllNotifications`)

      const data = await response.data
      setAllNotification(data.notification)

    } catch (error) {
      console.log(error)
    }
  }

  const [unreadCount, setUnreadCount] = useState(0)

  const fetchUnreadNotificationsCount = async () => {
    try {

      axios.defaults.withCredentials = true
      const response = await axios.get(`${BASE_URL}/notification/getUnreadNotificationsCount`)

      const data = await response.data
      console.log(data)
      setUnreadCount(data.unread_count)

    } catch (error) {
      console.log(error)
    }
  }

  const markAllAsRead = async()=>{
    try{
      axios.defaults.withCredentials = true
      const response = await axios.put(`${BASE_URL}/notification/markAllAsRead`)
      const data = await response.data
      console.log(data)
    }catch(error){
      console.log(error.message)
    }
  }

  // Function to handle notification toggle
  const handleNotificationToggle = () => {
    // If notification panel is currently open, mark all as read
    if (notification) {
      markAllAsRead()
      setUnreadCount(0)
    }
    // Toggle the notification panel
    setNotification(!notification)
  }

  useEffect(() => {
    if (isLoggedIn) {
      fetchAllNotifications()
      fetchUnreadNotificationsCount()

    }
  }, [isLoggedIn])

  //   const todayISO = DateTime.now().toISODate()

  // const todayHabitIDs = [
  //   ...new Set(
  //     userHabitTrackingData
  //       .filter(t => t.date === todayISO)
  //       .map(t => t.habit_id)
  //   )
  // ]


  // const todayHabits = todayHabitIDs.length


  // const completedToday = [
  //   ...new Set(
  //     userHabitTrackingData
  //       .filter(t => t.date === todayISO && t.status === true)
  //       .map(t => t.habit_id)
  //   )
  // ].length


  return (
    <nav className='sticky z-50 top-0 border-b py-[4.5px] lg:py-[16.5px] border-neutral-300 px-4 bg-transparent/20 backdrop-blur'>
      <div className='flex items-center justify-between relative '>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400' size={14} />
        <input type='text' placeholder='Search habits...' className='w-100 border border-neutral-300 rounded-lg pl-9 px-3 py-2 text-xs outline-red-400' />

        <div className='flex items-center justify-center gap-5 text-[#272323]'>
          {/* <div className='flex items-center px-3 py-3 gap-2 bg-red-100 rounded-lg'>
            <span className='p-1 rounded-full bg-red-400'></span>
            <h1 className='text-sm tracking-tight'>Today: <span className='font-medium ms-5'>{completedToday}/{todayHabits}</span></h1>
          </div> */}
          <button onClick={handleNotificationToggle} className="relative cursor-pointer">
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
            )}
            {notification && (
              <div className='flex flex-col items-start justify-start gap-2 absolute w-64 bg-white px-5 py-3 top-10 -right-40 text-sm shadow'>
                <div className='w-full border-b border-neutral-300 flex items-start'>
                  <h1 className='font-medium text-lg tracking-tight leading-tight'>Notifications</h1>
                </div>
                {allnotification ? (
                  <div className='mt-4'>
                    {allnotification.filter(items => items.is_read === false).map((items) => (
                      <h1 key={items.notification_id} className='text-neutral-500 my-2'>{items.message}</h1>
                    ))}

                  </div>
                ) : (
                  <div className='mt-4'>
                    <h1 className='text-neutral-500'>No notifications yet</h1>
                  </div>
                )}

              </div>
            )}


          </button>

          <div className='flex items-center justify-start gap-3 rounded-full'>
            <span className='bg-red-100 px-4 py-2 text-base text-red-700' style={{
              clipPath: "circle(50% at 50% 50%)"
            }}>{userData?.username?.[0]?.toUpperCase()}</span>
            <div className='relative flex items-center'>
              <button onClick={() => setToggelMenu(!toggleMenu)} className='flex items-start justify-start leading-tight gap-1 px-2 py-2 hover:bg-[#ed1d25] hover:text-white transition-all duration-300 cursor-pointer '>
                <span className='text-sm font-medium mt-1'>{userData?.username}</span>
                {toggleMenu ? <ChevronUp size={18} className='mt-1' /> : <ChevronDown size={18} className='mt-1' />}


              </button>
              {toggleMenu && (
                <div className='flex items-center justify-center absolute top-12 bg-white shadow-md border border-neutral-300 rounded-lg right-3 w-30'>
                  <div className='flex flex-col items-center text-center w-full space-y-1'>
                    <span className='border-b border-neutral-300 w-full px-3 py-2 text-base tracking-tight font-medium'>My accout</span>
                    {userData?.is_account_verified ? null : (
                      <button onClick={sendVerifyEmailOtp} to={'/verifyEmail'} className='text-sm tracking-tight hover:bg-red-100 w-full py-1.5'>Verify</button>
                    )}

                    <Link to={'/profile'} className='text-sm tracking-tight hover:bg-red-100 w-full py-1.5'>Profile</Link>
                    <button onClick={handleLogout} className='py-3 border-t w-full border-neutral-300 text-red-500 cursor-pointer hover:bg-red-50 transition-colors duration-300'>Logout</button>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
import React, { useContext, useEffect, useState } from 'react'
import UserLayout from '../layout/UserLayout'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import dayjs from 'dayjs'
import { Bell, BrushCleaning, Handshake } from 'lucide-react'
import toast from 'react-hot-toast'

const AllNotification = () => {
  const { isLoggedIn, BASE_URL } = useContext(AuthContext)
  const [allnotification, setAllNotification] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAllNotifications = async () => {
    try {
      axios.defaults.withCredentials = true
      const res = await axios.get(
        `${BASE_URL}/notification/getAllNotifications`
      )
      setAllNotification(res.data.notification || [])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isLoggedIn) fetchAllNotifications()
  }, [isLoggedIn])


  const handleClick = async(e)=>{
    try{
      axios.defaults.withCredentials = true
      const response = await axios.post(`${BASE_URL}/notification/clearNotification`)
      const data = response.data
      console.log(data)
      if(data.success){
        toast.success(data.message)
        setAllNotification([])
      }else{
        toast.error(data.message)
      }
    }catch(error){
      console.log(error.message)
    }
  }

  return (
    <UserLayout>
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className='flex items-center justify-between mx-4'>
          <div className="flex flex-col gap-1 mb-5">
          <h1 className="text-2xl font-medium text-neutral-800">
            Notifications
          </h1>
          <p className="text-neutral-500 text-sm tracking-tight">
            View all your notifications
          </p>
        </div>
        <button onClick={handleClick} className='text-white bg-[#ed1d25] px-3 py-2 shadow-sm flex items-center gap-2 hover:scale-102 transition-all duration-300 cursor-pointer text-sm font-medium'><BrushCleaning size={18}/>Clear All</button>
        </div>

        {/* Content */}
        {loading ? (
          <p className="text-neutral-500">Loading notifications...</p>
        ) : allnotification.length === 0 ? (
          <div className="min-h-screen flex flex-col items-center justify-center py-16 text-neutral-500">
            <Bell size={40} className="mb-3" />
            <p className="font-medium">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {allnotification.map(item => (
              <div
                key={item.notification_id}
                className={`border rounded-md p-4 transition-all
                  ${
                    item.is_read
                      ? 'bg-white border-neutral-200'
                      : 'bg-red-50 border-red-200'
                  }
                `}
              >
                <p className="text-sm font-medium text-neutral-800">
                  {item.message}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  {dayjs(item.sent_at).format('DD MMM YYYY, hh:mm A')}
                </p>
              </div>
            ))}
          </div>
        )}
        <div className='flex items-end justify-end w-full'>
          
        </div>
      </div>
    </UserLayout>
  )
}

export default AllNotification

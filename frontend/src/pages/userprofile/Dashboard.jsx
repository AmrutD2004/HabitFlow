import React, { useContext, useEffect, useState } from 'react'
import UserLayout from '../../layout/UserLayout'
import { AuthContext } from '../../context/AuthContext'
import { FlameKindling, Loader2 } from 'lucide-react'
import HabitTrackerTable from '../../components/HabitTrackerTable'
import StatsOverview from '../../components/StatsOverview'
import { motion } from 'motion/react'
import Quotes from '../../components/Quotes'


const Dashboard = () => {
  const { BASE_URL, userData, authChecked, habitData } = useContext(AuthContext)
  const [todayHour, setTodayHour] = useState('')
  const [openModal, setOpenModal] = useState(false)


  const getTimeofDay = () => {
    const hour = new Date().getHours()

    if (hour >= 5 && hour < 12) {
      return 'morning';
    }

    if (hour >= 12 && hour < 17) {
      return 'afternoon';
    }

    if (hour >= 17 && hour < 21) {
      return 'evening';
    }

    return 'night';
  }
  useEffect(() => {
    setTodayHour(getTimeofDay())
  }, [])

  if (!authChecked) {
    return (
      <UserLayout>
        <div className='max-w-7xl mx-auto min-h-screen flex items-center justify-center'>
          <Loader2 size={32} className='animate-spin' />
        </div>
      </UserLayout>

    )
  }
  return (
    <UserLayout>
      <div className='max-w-7xl mx-auto flex flex-col'>
        <div className='flex items-center justify-between'>
          <motion.div
            initial={{
              opacity: 0,
              filter: 'blur(10px)'
            }}
            animate={{
              opacity: 1,
              filter: 'blur(0px)',
              transition: {
                duration: 0.3,
                ease: "easeInOut"
              }
            }}
            className='flex flex-col items-start justify-start gap-1'>
            <h1 className='text-3xl text-shadow-xs font-bold tracking-tight text-[#272323]'>Good {todayHour}, Hello! 👋</h1>
            <p className='text-sm font-medium text-neutral-500'>Welcome Back, {userData?.username} !</p>
          </motion.div>
        </div>
        <div className='w-full mt-6'>
          <StatsOverview />
        </div>
        {habitData.length === 0 ? (
          <div className='flex items-center justify-center h-30'>
            <h1 className='text-neutral-500'>You haven’t added any habits yet. Create one to get started.</h1>
          </div>
        ) : (
          <>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.98,
                filter: 'blur(10px)'
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
                transition: {
                  duration: 0.5,
                  ease: "easeInOut"
                }
              }}
              className='my-10 rounded-lg shadow overflow-hidden'>
              <motion.div
                initial={{
                  filter: 'blur(10px)'
                }}
                animate={{
                  filter: 'blur(0px)',
                  transition: {
                    duration: 0.3,
                    delay: 0.2
                  }
                }}
                className='flex items-start justify-start px-5 py-4'>
                <h1 className='text-lg font-semibold tracking-tight text-neutral-800 flex items-center gap-3'>
                  <span className='p-3 bg-[#ec3e55] text-white font-semibold scale-90 shadow-inner'><FlameKindling /></span>
                  Track Your Habits Day by Day
                </h1>
              </motion.div>
              <HabitTrackerTable habitData={habitData} />
            </motion.div>
          </>
        )}
      {/* <div className='w-full mt-10'>
        <Quotes />
      </div> */}
      </div>
    </UserLayout>
  )
}
export default Dashboard
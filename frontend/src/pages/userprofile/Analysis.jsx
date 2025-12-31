import React , {useContext}from 'react'
import UserLayout from '../../layout/UserLayout'
import { motion } from 'motion/react'
import BarChart from '../analysis/BarChart'
import DoughnutChart from '../analysis/DoughnutChart'
import LineChart from '../analysis/LineChart'
import { HabitTrackingContext } from '../../context/HabitTrackingContext'
import { AuthContext } from '../../context/AuthContext'

const Analysis = () => {
  const { userHabitTrackingData } = useContext(HabitTrackingContext)
  const {habitData} = useContext(AuthContext)
  return (
    <UserLayout>
      <div className='max-w-5xl mx-auto'>
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
          className='flex items-start justify-start '>
          <div className='flex flex-col items-start justify-start gap-1'>
            <h1 className='text-3xl font-bold tracking-tight text-[#272323]'>Analytics</h1>
            <p className='text-neutral-500 tracking-tight leading-tight text-sm'>Track your progress and insights</p>
          </div>
        </motion.div>
        <motion.div
        initial = {{
          opacity : 0,
          scale : 0.98
        }}
        animate = {{
          opacity : 1,
          scale : 1,
          transition : {duration : 0.3,
            ease : 'easeInOut'
          }
        }}
        className='w-full border border-neutral-300 shadow-sm px-5 py-3 mt-10 '>
          <h2 className='text-sm font-medium text-neutral-600 mb-2'>
              Monthly completion trend
            </h2>
          <LineChart userHabitTrackingData={userHabitTrackingData} habitData={habitData}/>
        </motion.div>
        <motion.div 
        initial = {{
          opacity : 0,
          scale : 0.98
        }}
        animate = {{
          opacity : 1,
          scale : 1,
          transition : {duration : 0.3,
            delay : 0.2,
            ease : 'easeInOut'
          }
        }}
        className='flex gap-4 mt-10'>
          {/* Bar Chart */}
          <motion.div 
          initial = {{
          opacity : 0,
          scale : 0.98
        }}
        animate = {{
          opacity : 1,
          scale : 1,
          transition : {duration : 0.3,
            delay : 0.3,
            ease : 'easeInOut'
          }
        }}
          className='flex-1 border border-neutral-300 shadow-sm p-5 h-[350px] flex flex-col w-full'>
            <h2 className='text-sm font-medium text-neutral-600 mb-2'>
              Habit Completions by Day
            </h2>
            <div className='flex-1 flex items-center justify-center'>
              <BarChart userHabitTrackingData={userHabitTrackingData}/>
            </div>
          </motion.div>

          {/* Doughnut Chart */}
          <div className='flex-1 border border-neutral-300 shadow-sm p-5 h-[350px] flex flex-col '>
            <h2 className='text-sm font-medium text-neutral-600 mb-2'>
              Category Distribution
            </h2>
            <div className='flex-1 flex items-center justify-center'>
              <DoughnutChart habitData={habitData}/>
            </div>
          </div>
        </motion.div>

      </div>
    </UserLayout>
  )
}

export default Analysis
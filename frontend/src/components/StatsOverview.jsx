import { Calendar, Flame, Target, TrendingUp } from 'lucide-react'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { HabitTrackingContext } from '../context/HabitTrackingContext'
import { motion } from 'motion/react'
import { calculateStreak } from '../utils/Streack'

const StatsOverview = () => {
    const { habitData, getHabitData, } = useContext(AuthContext)
    const { userHabitTrackingData } = useContext(HabitTrackingContext)
    const totalHabit = habitData.length
    const totalActiveHabit = habitData.filter((f) => f.is_active === true).length

    const totalCountofCompletions = (userHabitTrackingData || []).filter((f) => f.status === true).length

    const streak = calculateStreak(userHabitTrackingData)
    return (    
        <div className='grid grid-cols-2 lg:grid-cols-2 gap-4'>
            <motion.div
            initial = {{
                y : -25,
                opacity : 0
            }}
            animate ={{
                opacity : 1,
                y : 0,
                transition : {
                    duration : 0.3,
                    ease : "easeInOut"
                }
            }}
            className='flex flex-col items-start justify-start px-5 py-4 border border-neutral-300 bg-[#fefffe] gap-3 shadow-sm'>
                <div className='p-2 bg-[#ec3e55] text-white shadow-inner'>
                    <Flame />
                </div>
                <div className='flex items-center gap-2'>
                    <h1 className='text-3xl leading-tight font-semibold flex-row items-end'>{streak } <span className='text-sm text-neutral-600'>days</span></h1>
                </div>
                <h1 className='text-sm text-neutral-500 tracking-wide leading-2'>Current Streak</h1>
            </motion.div>
            <motion.div
            initial = {{
                y : -25,
                opacity : 0
            }}
            animate ={{
                opacity : 1,
                y : 0,
                transition : {
                    duration : 0.3,
                    delay : 0.1,
                    ease : "easeInOut"
                }
            }}
            className='flex flex-col items-start justify-start px-5 py-4 border border-neutral-300 bg-[#fefffe] gap-3 shadow-sm'>
                <div className='p-2 bg-[#49bc95] text-white shadow-inner'>
                    <Target />
                </div>
                <div className='flex items-center gap-2'>
                    <h1 className='text-3xl leading-tight font-semibold flex-row items-end'>{totalCountofCompletions}</h1>
                </div>
                <h1 className='text-sm text-neutral-500 tracking-wide leading-2'>Total Completion</h1>
            </motion.div>
            <motion.div
            initial = {{
                y : -25,
                opacity : 0
            }}
            animate ={{
                opacity : 1,
                y : 0,
                transition : {
                    duration : 0.3,
                    delay : 0.2,
                    ease : "easeInOut"
                }
            }}
            className='flex flex-col items-start justify-start px-5 py-4 border border-neutral-300 bg-[#fefffe] gap-3 shadow-sm'>
                <div className='p-2 bg-[#f0c613] text-white shadow-inner'>
                    <TrendingUp />
                </div>
                <div className='flex items-center gap-2'>
                    <h1 className='text-3xl leading-tight font-semibold flex-row items-end'>{totalActiveHabit} </h1>
                </div>
                <h1 className='text-sm text-neutral-500 tracking-wide leading-2'>Active Habits</h1>
            </motion.div>
            <motion.div
            initial = {{
                y : -25,
                opacity : 0
            }}
            animate ={{
                opacity : 1,
                y : 0,
                transition : {
                    duration : 0.3,
                    delay : 0.3,
                    ease : "easeInOut"
                }
            }}
            className='flex flex-col items-start justify-start px-5 py-4 border border-neutral-300 bg-[#fefffe] gap-3 shadow-sm'>
                <div className='p-2 bg-[#2c303b] text-white shadow-inner'>
                    <Calendar />
                </div>
                <div className='flex items-center gap-2'>
                    <h1 className='text-3xl leading-tight font-semibold flex-row items-end'>{totalHabit}</h1>
                </div>
                <h1 className='text-sm text-neutral-500 tracking-wide leading-2'>Total Habits</h1>
            </motion.div>
        </div>
    )
}

export default StatsOverview
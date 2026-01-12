import React, { useContext } from 'react'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProgessBar from './ProgessBar'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'
import dayjs from 'dayjs'
import { DateTime, Info, Interval } from 'luxon'
import { HabitTrackingContext } from '../context/HabitTrackingContext'

const HabitTrackerTable = ({ habitData }) => {
    const { BASE_URL, setPoints } = useContext(AuthContext)  
    const POINTS_PER_HABIT = 10
    const { checkedMap, firstDayOfActiveMonth, daysOfMonth, toggleCell, getPreviousMonth, getNextMonth, getUserHabitTrackingData } = useContext(HabitTrackingContext)

    const handleSubmit = async (habit_id, date, status) => {
        const payload = {
            'habit_id': habit_id,
            'date': date,
            'status': status
        }

        try {
            axios.defaults.withCredentials = true
            const response = await axios.post(`${BASE_URL}/user/habitTracking`, payload)

            const data = await response.data
            if (data.success) {
                toast.success('Habit Checked')
            }

            await getUserHabitTrackingData()
        } catch (error) {
            toast.error(error.message)
        }
    }

    const today = new Date().toISOString().split('T')[0]


    return (
        <div className='overflow-x-auto '>
            <div className='inline-block min-w-max'>
                <div className='flex items-center gap-5 py-4 px-3 font-medium bg-red-50 border-b border-red-500 w-full'>
                    <button onClick={getPreviousMonth}><ChevronLeft /></button>
                    <span className='text-center'>{firstDayOfActiveMonth.monthLong}, {firstDayOfActiveMonth.year}</span>
                    <button onClick={getNextMonth}><ChevronRight /></button>
                </div>
                <table className='w-full text-xs font-medium text-neutral-800 border-collapse'>
                    <thead className='bg-red-100 border-b border-red-500'>
                        <tr>
                            <th className="text-left px-4 py-3 border-r border-neutral-300  font-medium text-red-600 text-sm w-64">Habits</th>
                            <th className=" px-4 py-3 border-r border-neutral-300 w-20 text-center  font-medium text-red-600 text-sm">Category</th>
                            {daysOfMonth.map((day, idx) => (
                                <th key={idx} className={`px-4 py-3 border-r border-neutral-300 w-10 text-center  font-medium text-red-600 text-sm`}>{day.month === firstDayOfActiveMonth.month ? day.day : ''}
                                
                                </th>
                            ))}
                            <th className=" px-4 py-3 border-r border-neutral-300  w-10 text-center  font-medium text-red-600 text-sm">Status</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white'>

                        {habitData.filter(items=> items.is_active).map((items, idx) => {

                            const scheduledDates = daysOfMonth.filter(day => {
                                const weekday = day.toFormat('ccc') // "Mon"
                                return (
                                    day.month === firstDayOfActiveMonth.month &&
                                    items.days.includes(weekday)
                                )
                            })

                            const totalDays = scheduledDates.length
                            const completedDays = scheduledDates.filter(day => {
                                const isoDate = day.toISODate()
                                const key = `${items.habit_id}-${isoDate}`
                                return checkedMap[key]
                            }).length
                            const percentage = totalDays === 0 ? 0 : Math.round((completedDays / totalDays) * 100)
                            
                            return (
                                <tr key={items.habit_id}>
                                    <td className='px-4 py-2 text-left border-r border-b border-neutral-300'>{items.habit_title}</td>
                                    <td className='px-4 py-2 border-r text-center border-b border-neutral-300'>{items.category}</td>
                                    {daysOfMonth.map((day) => {
                                        const isoDate = day.toISODate()
                                        const cellKey = `${items.habit_id}-${isoDate}`
                                        const isChecked = checkedMap[cellKey] || false
                                        const dayWeekday = day.toFormat('ccc') // "Mon", "Tue", etc
                                        const isHabitDay = items.days.includes(dayWeekday)

                                        const isToday = isoDate === today



                                        return (
                                            <td className="px-4 py-2 border-r border-b border-neutral-300 text-center">
                                                {day.month === firstDayOfActiveMonth.month && isHabitDay && (
                                                    <label
                                                        className={`inline-flex items-center justify-center w-4 h-4 rounded 
        ${isChecked ? 'bg-green-600' : 'bg-neutral-300 '}
        ${isToday ? 'cursor-pointer hover:bg-neutral-400 transition-colors duration-300' : 'cursor-not-allowed opacity-60 bg-gray-200' }`}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={isChecked}
                                                            // disabled={!isToday}
                                                            onChange={() => {
                                                                if(!isToday){
                                                                    toast.error("You can mark today's habit only!")
                                                                    return
                                                                }
                                                                toggleCell(items.habit_id, isoDate)
                                                                setPoints(prev => isChecked ? Math.max(prev - POINTS_PER_HABIT, 0) : prev + POINTS_PER_HABIT)
                                                                handleSubmit(items.habit_id, isoDate, !isChecked)
                                                            }}
                                                            className="hidden "
                                                        />
                                                    </label>
                                                )}
                                            </td>

                                        )
                                    })}
                                    <td className='px-4 py-2 border-r border-b border-neutral-300 text-center'>
                                        <ProgessBar percentage={percentage} />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default HabitTrackerTable
import React, { useEffect, useState } from 'react'
import { DateTime, Info, Interval } from 'luxon'
import { ChevronsRight, ChevronsLeft } from 'lucide-react'

const Calender = ({ habitData }) => {
    const today = DateTime.local() //Display current date
    const weekDays = Info.weekdays('short') //Display Days in week like ['Mon', 'Tue',]

    const [firstDayOfActiveMonth, setFirstDayOfActiveMonth] = useState(today.startOf('month'))

    //Active date
    const [activedDate, setActiveDate] = useState(today)
    const [activeDateMeetings, setActiveDateMeetings] = useState([])

    useEffect(() => {
        if (!activedDate) return

        const filtered = habitData.filter(habit =>
            DateTime.fromISO(habit.created_at).hasSame(activedDate, 'day')
        )

        setActiveDateMeetings(filtered)
    }, [habitData, activedDate])


    //Display All days in the month
    const daysOfMonth = Interval.fromDateTimes(
        firstDayOfActiveMonth.startOf('week'),
        firstDayOfActiveMonth.endOf('month').endOf('week')
    ).splitBy({ day: 1 }).map(day => day.start)


    return (
        <div className='border border-neutral-300 px-5 py-3 rounded-lg w-full'>
            <div className='flex flex-col items-center justify-center'>
                <div className='flex items-center justify-between w-full text-sm'>
                    <button><ChevronsLeft size={18} /></button>
                    <div className='flex flex-col items-center gap-2 justify-center'>
                        <h1 className='font-medium text-[#272323]'>{firstDayOfActiveMonth.monthLong}, {firstDayOfActiveMonth.year}</h1>
                        <span className='font-medium hover:underline cursor-pointer'>Today</span>
                    </div>
                    <button><ChevronsRight size={18} /></button>
                </div>
                <div className="grid grid-cols-7 mt-4 w-full">
                    {weekDays.map((weekday, idx) => (
                        <span
                            key={idx}
                            className="text-center text-sm font-medium text-neutral-600 mx-auto"
                        >
                            {weekday}
                        </span>
                    ))}
                </div>
                <div className='grid grid-cols-7 space-y-2 mt-4 w-full border-b border-t py-3'>
                    {daysOfMonth.map((day, idx) => (
                        <span onClick={() => setActiveDate(day)}
                            key={idx}
                            className={`text-center text-sm font-medium text-neutral-900 mx-auto hover:bg-black rounded-full px-2.5 py-2 hover:text-white transition-all duration-300 cursor-pointer ${day.month !== firstDayOfActiveMonth.month
                                ? 'hidden'
                                : null} ${activedDate?.toISODate() === day.toISODate() && 'bg-black text-white'}`}
                        >
                            {day.day}
                        </span>
                    ))}
                </div>
                <div className='flex items-end justify-end mt-2 w-full'>
                    {!activedDate && <span>Please Select Date</span>}

                    {activedDate && (
                        <>
                            <span className='ms-auto'>{activedDate.toLocaleString(DateTime.DATE_MED)}</span>
                            <span className=' text-neutral-500 ms-auto text-lg'>
                                Habits: {activeDateMeetings.length}
                            </span>
                        </>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Calender
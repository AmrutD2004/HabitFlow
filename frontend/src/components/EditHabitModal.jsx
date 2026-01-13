import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Plus, Save, X, Zap } from 'lucide-react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const EditHabitModal = ({ onClose, habitID, habit }) => {
    const [repeatDays, setRepeatDays] = useState([]);


    const [formData, setFormData] = useState({
        habit_title: '',
        description: '',
        category: '',
        reminder_time: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const habitCategory = [
        { title: "Productive", emoji: "⚡" },
        { title: "Health", emoji: "❤️" },
        { title: "Social", emoji: "👥" },
        { title: "Learning", emoji: "📘" },
        { title: "Mindfullness", emoji: "🧠" },
        { title: "Creative", emoji: "🎨" },
        { title: "Finance", emoji: "💰" },
        { title: "Fitness", emoji: "🏋️" },
        { title: "Other", emoji: "✨" }
    ];

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const { BASE_URL, userData, getHabitData, habitData } = useContext(AuthContext)
    useEffect(() => {
        console.log(habit)
    }, [])

    axios.defaults.withCredentials = true


    const toggleDay = (day) => {
        setRepeatDays((prev) =>
            prev.includes(day)
                ? prev.filter(d => d !== day)
                : [...prev, day]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.put(`${BASE_URL}/habit/editHabit`, {
                habitID,
                ...formData,
                'repeat_days': repeatDays
            })
            const data = await response.data
            if (data.success) {
                toast.success(data.message)
                await getHabitData()
                setTimeout(() => {
                    toast.dismiss()
                    onClose();
                }, 2000)

            }
        } catch (error) {
            toast.error(error.message)
            console.log(data.error)
        }
    }

    useEffect(() => {
        if (habit) {
            setFormData({
                habit_title: habit.habit_title,
                description: habit.description,
                category: habit.category,
                reminder_time: habit.reminder_time
            })
            setRepeatDays(habit.days || [])
        }
    }, [habit])
    return (
        <div
            className={`fixed inset-0 top-0 z-50 flex items-start justify-center backdrop-blur-[5px] `}>
            <div className='max-w-4xl mx-auto'>
                <form onSubmit={handleSubmit}

                    className='border border-neutral-300 rounded-lg w-90 py-6 px-4 bg-white flex flex-col space-y-4 lg:w-110'>
                    <div className='flex items-center justify-between'>
                        <h1 className=' tracking-tight font-medium leading-tight text-[#272323]'>Edit Habit {habit.habit_title}</h1>
                        <X onClick={onClose} size={18} className='text-neutral-600 hover:text-black transition-colors duration-300 cursor-pointer' />
                    </div>
                    <div className='flex flex-col items-start justify-start gap-2 w-full'>
                        <label className="text-sm font-medium text-[#272323]">Habit title *</label>
                        <input onChange={handleChange} type="text" name='habit_title' placeholder='eg., Morning Meditation ' className='text-xs px-3 py-3 border border-neutral-300 w-full rounded-lg' value={formData.habit_title} />
                    </div>
                    <div className='flex flex-col items-start justify-start gap-2 w-full'>
                        <label className="text-sm font-medium text-[#272323]">Description (optional)</label>
                        <textarea onChange={handleChange} type="text" name='description' placeholder='eg., Morning Meditation ' className='text-xs px-3 py-3 border border-neutral-300 w-full rounded-lg' value={formData.description} />
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <label className="text-sm font-medium text-[#272323]">Category</label>
                        <select value={formData.category} onChange={handleChange} name='category' className='text-xs px-3 py-2 border border-neutral-300 w-full rounded-lg outline-none'>
                            <option value="">Select a category</option>
                            {habitCategory.map((items, idx) => (

                                <option key={idx} value={items.title} className='flex items-center gap-1'>{items.emoji} {items.title}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <p className="text-sm font-medium mb-2 text-[#272323]">Repeat on</p>

                        <div className="flex gap-2 flex-wrap">
                            {days.map((day) => {
                                const active = repeatDays.includes(day);

                                return (
                                    <button
                                        key={day}
                                        type="button"
                                        onClick={() => toggleDay(day)}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition
                            ${active
                                                ? "bg-[#ed1d25] text-white"
                                                : "bg-red-100 text-red-700 hover:bg-red-200"}
                            `}
                                    >
                                        {day}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className="text-sm font-medium text-[#272323]">Reminder Time (optional)</label>
                        <input onChange={handleChange} type="time" className='text-xs px-3 py-2 border border-neutral-300 w-full rounded-lg' name='reminder_time' value={formData.reminder_time} />
                    </div>

                    <div className='flex items-end justify-end'>
                        <div className='flex items-center gap-3 text-sm'>
                            <button onClick={onClose} className='px-2 py-1 hover:bg-[#ed1d25] text-neutral-700 border border-neutral-300 cursor-pointe transition-colors duration-300 shadow-sm cursor-pointer font-medium hover:text-white'>Cancle</button>
                            <button className='px-2 py-1 bg-[#ed1d25] cursor-pointer text-white shadow-sm flex items-center gap-2 font-medium'><Save size={14} />Save Changes</button>
                        </div>
                    </div>
                </form>
            </div>
            <Toaster />
        </div>
    )
}

export default EditHabitModal
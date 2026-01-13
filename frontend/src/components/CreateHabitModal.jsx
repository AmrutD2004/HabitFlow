import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Plus, X, Zap } from 'lucide-react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


const CreateHabitModal = ({ onClose }) => {
  const [open, setOpen] = useState(false)

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

  const { BASE_URL, userData, getHabitData } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    axios.defaults.withCredentials = true
    try {
      const payload = {
        ...formData,
        'repeat_days': repeatDays
      }
      const response = await axios.post(`${BASE_URL}/habit/createHabit`, payload)
      const data = await response.data
      if (data.success) {
        toast.success(data.message)
        await getHabitData();
        onClose()
        setRepeatDays([])
        setFormData({
          habit_title: '',
          description: '',
          category: '',
          reminder_time: ''
        })
      } else {
        toast.error(data.message)
      }
    }
    catch (error) {
      console.log(error.message)
    }
  }

  const toggleDay = (day) => {
    setRepeatDays((prev) =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop`}>
      <div className='max-w-4xl mx-auto'>
        <form onSubmit={handleSubmit}

          className='border border-neutral-300 rounded-lg w-90 py-6 px-4 bg-[#fefffe] flex flex-col space-y-4 lg:w-110'>
          <div className='flex items-center justify-between'>
            <h1 className=' tracking-tight font-medium leading-tight text-[#272323]'>Create New Habit</h1>
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
            <select onChange={handleChange} name='category' className='text-xs px-3 py-2 border border-neutral-300 w-full rounded-lg outline-none'>
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
              <button onClick={onClose} className='px-2 py-1 hover:bg-[#ed1d25] text-[#272323] border border-neutral-300 cursor-pointe transition-colors duration-300 font-medium hover:text-white  shadow-sm cursor-pointer'>Cancle</button>
              <button className='px-2 py-1 bg-[#ed1d25] font-medium hover:scale-102 transition-all duration-300 text-white cursor-pointer rounded-lg shadow-sm'>Create Habit</button>
            </div>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  )
}

export default CreateHabitModal
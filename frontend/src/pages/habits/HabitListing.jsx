import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Check, EllipsisVertical, Loader2, Pencil, Trash2Icon } from 'lucide-react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import EditHabitModal from '../../components/EditHabitModal'

const HabitListing = () => {
    const { habitData, getHabitData, BASE_URL, isLoggedIn } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const [menu, setMenu] = useState(null)
    const [checkedHabits, setCheckedHabits] = useState([]);

    const [searched, setSearched] = useState([])

    const handleSearched = (s)=>{
        const keyword = s.toLowerCase()
        if(!keyword){
            setSearched(habitData)
        }else{
            const filtered = habitData.filter(f=> f?.habit_title.toLowerCase().includes(keyword)) || f?.category?.toLowerCase().includes(keyword)
            setSearched(filtered)
        }
    }
    const handleCategorySearch = (category) => {
  if (!category) {
    setSearched(habitData)
    return
  }

  const filtered = habitData.filter(
    habit => habit.is_active && habit.category === category
  )

  setSearched(filtered)
}


    useEffect(()=>{
        setSearched(habitData)
    },[habitData])

    const toggleHabit = (id) => {
        setCheckedHabits(prev =>
            prev.includes(id)
                ? prev.filter(h => h !== id)
                : [...prev, id]
        );
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true)
            axios.defaults.withCredentials = true
            const response = await axios.put(`${BASE_URL}/habit/deleteHabit`, {
                'habit_id': id
            })
            const data = await response.data
            if (data.success) {
                toast.success(data.message)
                setMenu(null)
                getHabitData()
            }
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    const [openEditModal, setOpenEditModal] = useState(false)
    const [selectedHabit, setSelectedHabit] = useState(null)


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
    return (
        <>
            {loading ? (
                <div className="max-w-7xl mx-auto min-h-screen flex items-center justify-center">
                    <Loader2 size={32} className='animate-spin' />
                </div>
            ) : (

                <div className='max-w-7xl mx-auto'>
                    {habitData.length === 0 && (
                        <div className='flex items-center justify-center'>
                            <h1 className='text-neutral-500'>You haven’t added any habits yet. Create one to get started.</h1>
                        </div>

                    )}
                    <div className='w-full border rounded-md border-neutral-300 py-3 px-5 bg-gray-50 my-4'>
                        <div className='w-full flex items-center justify-between gap-3'>
                            <input onChange={(e)=>handleSearched(e.target.value)} type="text" className='px-3 py-2 border border-neutral-300 w-full rounded-md text-sm outline-none bg-white' placeholder='Search habit by Habit name...' />
                            <select onChange={(e)=> handleCategorySearch(e.target.value)}  className='px-3 py-2 border border-neutral-300 rounded-md text-sm outline-none bg-white' name="" id="">
                                <option value="">Select Category</option>
                                {habitCategory.map((category, idx)=>(
                                    <option key={idx}>{category.title}</option>
                                ))}
                                
                            </select>
                        </div>
                    </div>
                    {searched.map((items, idx) =>
                        items.is_active ? (
                            <div key={items.habit_id} className={`w-full border  py-6 px-4 rounded-lg  mb-4 shadow-sm ${checkedHabits.includes(items.habit_id) ? 'bg-green-100 border-green-300' : 'bg-white border-neutral-300'}`}>

                                <div className='flex items-center justify-between w-full'>
                                    <div className='flex items-center justify-start gap-4 w-full'>
                                        <div className='flex flex-col items-start justify-start gap-4 w-full'>
                                            <h1 className='text-lg font-semibold tracking-tight leading-tight text-neutral-800'>{items.habit_title}</h1>
                                            <p className='text-sm tracking-tight'>{items.description}</p>
                                            <p className='text-xs text-neutral-500 w-32 text-left'><span className='font-semibold '>Category:</span> {items.category}</p>
                                        </div>
                                    </div>
                                    <div className='relative'>
                                        <button onClick={() => setMenu(menu === items.habit_id ? null : items.habit_id)} className='p-2 hover:bg-gray-100 cursor-pointer transition-colors duration-300 rounded-lg'>
                                            <EllipsisVertical size={18} />
                                        </button>
                                        {menu === items.habit_id && (
                                            <div className='absolute bg-white border border-neutral-300 w-24 right-4 rounded-lg px-3 py-2 text-sm shadow-sm '>
                                                <div className='flex flex-col items-start  justify-start space-y-2'>
                                                    <button onClick={() => {
                                                        setSelectedHabit(items)
                                                        setOpenEditModal(true)
                                                        setMenu(null)
                                                    }} className='flex items-center gap-2 cursor-pointer'><Pencil className='mt-[4px]' size={14} />Edit</button>
                                                    <button onClick={() => handleDelete(items.habit_id)} className='flex items-center gap-2 text-red-500 cursor-pointer'><Trash2Icon size={14} />Delete</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>
                        ) : null

                    )}

                    <Toaster />
                </div>
            )}
            {openEditModal && (<EditHabitModal onClose={() => setOpenEditModal(false)} habit={selectedHabit} habitID={selectedHabit.habit_id} />)}
        </>
    )
}

export default HabitListing
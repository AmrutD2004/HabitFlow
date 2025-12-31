import React, { useContext, useState } from 'react'
import UserLayout from '../../layout/UserLayout'
import HabitListing from '../habits/HabitListing'
import { AuthContext } from '../../context/AuthContext'
import { Plus } from 'lucide-react'
import CreateHabitModal from '../../components/CreateHabitModal'
import { motion } from 'motion/react'
const AllHabits = () => {
  const { habitData } = useContext(AuthContext)
  const [openModal, setOpenModal] = useState(false)

  const activeHabit = habitData.filter((f) => f.is_active === true).length
  return (
    <UserLayout>
      <div className='max-w-7xl mx-auto'>
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
            className='flex flex-col items-start justify-start gap-2'>
            <h1 className='text-3xl text-shadow-xs font-bold tracking-tight text-[#272323]'>My Habits</h1>
            <p className='text-sm font-medium text-neutral-500'>{activeHabit} active habits </p>
            <p className='text-sm font-medium text-neutral-500'>{habitData.length} Total habits </p>
          </motion.div>
          <motion.div
            initial={{
              x: 100,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeInOut"
              }
            }}
          >
            <button
              className='px-3 py-2 border border-neutral-300 text-sm font-medium tracking-tight leading-tight bg-[#ed1d25] text-white cursor-pointer hover:scale-102 transition-all duration-300 flex items-center gap-1 shadow-sm' onClick={() => setOpenModal(true)}><Plus size={18} />Add habit</button>
          </motion.div>
        </div>
        {openModal && (<CreateHabitModal onClose={() => setOpenModal(false)} />)}
      </div>
            
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
      >
        <HabitListing />
      </motion.div>
    </UserLayout>
  )
}

export default AllHabits
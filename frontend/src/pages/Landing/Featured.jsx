import { ArrowRight } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'

const Featured = () => {
   const navigate = useNavigate()
  return (
    <>
        <motion.div
        initial={{
          scale : 1
        }}
        whileInView={{
          scale : 1.1,
           transition: {
                duration: 0.5,
                delay: 0.3,
                stiffness : 120
              },
        }}
        className='flex flex-col items-center justify-center gap-3'>
            <h1 className='text-4xl text-white font-semibold tracking-wide w-100 lg:w-full'>Ready to transform your <span className='bg-[#ed1d25] text-white'>habits?</span></h1>
            <span className='text-neutral-400'>Join thousands building better habits every day.</span>
            <button onClick={()=> navigate('/login')} className='bg-[#ed1d25] text-white px-9 py-3 font-medium flex items-center gap-3 mt-10 cursor-pointer hover:scale-102 transition-all duration-300 '>Get started — it's free <ArrowRight size={18}/></button>
        </motion.div>

    </>
  )
}

export default Featured
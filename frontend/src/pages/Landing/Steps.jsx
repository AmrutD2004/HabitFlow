import React from 'react'
import { ArrowRight, ChartColumn, Check, Flame, Target, Zap } from 'lucide-react'
import {motion} from 'motion/react'

const Steps = () => {
  return (
    <>
    <div className='w-full flex flex-col items-center justify-center mt-5 tracking-wide relative'>
        <motion.div
        initial={{
          opacity : 0,
          y : -80
        }}
        whileInView={{
          y:0,
          opacity : 1,
           transition: {
                duration: 0.5,
                delay: 0.6,
              }
          
        }}
        className='flex gap-3 translate-x-10 scale-90'>
          
          <img src='/analytics.png' className='absolute scale-80 transform-3d rotate-x-20 rotate-y-28 -rotate-z-20  -translate-x-8 mask-b-from-10% mask-r-from-50% border-4 border-neutral-200' />
          <img src="/image.png" alt="" className='scale-80 transform-3d rotate-x-20 rotate-y-28 -rotate-z-20 -translate-x-8 mask-r-from-50% border-3 border-neutral-200'/>
        </motion.div>
        <motion.div
        initial={{
          opacity : 0,
          x : -40
        }}
        whileInView={{
          x:0,
          opacity : 1,
           transition: {
                duration: 0.5,
                delay: 0.3,
                stiffness : 120
              }
          
        }}
        className='flex flex-col items-center justify-center gap-4 mt-24'>
            <h1 className='font-semibold text-4xl'>Everything you need</h1>
            <p className='text-neutral-500'>Simple tools to build lasting habits</p>
        </motion.div>
    </div>
    <motion.div
    initial={{
      x : 40,
          opacity : 0
        }}
        whileInView={{
          x : 0,
          opacity : 1,
           transition: {
                duration: 0.5,
                delay: 0.3,
                stiffness : 120
              }
          
        }}
    className='grid grid-cols-1 lg:grid-cols-3 gap-4 w-full scale-90'>
        <div className='border border-neutral-300 px-5 py-5'>
            <div className='flex flex-col items-start justify-start gap-4'>
                <div className="p-2 rounded-lg bg-red-100">
                  <Target className="text-red-500" />
                </div>
                <h1 className='text-xl font-semibold tracking-wide text-neutral-800'>Set Goals</h1>
                <p className='w-64 text-neutral-500'>Define your habits and set achievable daily, weekly, or monthly goals.</p>
            </div>
        </div>
        <div className='border border-neutral-300 px-5 py-5'>
            <div className='flex flex-col items-start justify-start gap-4'>
                <div className="p-2 rounded-lg bg-red-100">
                  <Flame className="text-red-500" />
                </div>
                <h1 className='text-xl font-semibold tracking-wide text-neutral-800'>Build Streaks</h1>
                <p className='w-64 text-neutral-500'>Stay motivated with streak tracking. Don't break the chain!</p>
            </div>
        </div>
        <div className='border border-neutral-300 px-5 py-5'>
            <div className='flex flex-col items-start justify-start gap-4'>
                <div className="p-2 rounded-lg bg-red-100">
                  <ChartColumn className="text-red-500" />
                </div>
                <h1 className='text-xl font-semibold tracking-wide text-neutral-800'>Track Progress</h1>
                <p className='w-64 text-neutral-500'>Visualize your journey with beautiful charts and insights.</p>
            </div>
        </div>
    </motion.div>
    </>
  )
}

export default Steps
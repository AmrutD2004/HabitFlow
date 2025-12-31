import React from 'react'
import LandingNavbar from '../../components/LandingNavbar'
import { ArrowRight, Check, Flame, Zap } from 'lucide-react'
import Steps from './Steps'
import Featured from './Featured'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'

const Landing = () => {
  const navigate = useNavigate()
  return (
    <>
      <div>
        <LandingNavbar />
      </div>

      <div className='max-w-7xl mx-auto mt-40 bg-[#fefffe]'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <div
            className='flex flex-col items-center justify-center lg:items-start lg:justify-start gap-8'>
            <motion.div
              initial={{
                x: -40,
                opacity: 0
              }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  duration: 0.5,
                  delay: 0.2,
                }
              }}
              className='flex items-center gap-2 px-6 py-2 leading-tight rounded-full text-sm bg-red-100 text-red-500 font-semibold' >
              <Zap size={18} />
              Build habits that stick
            </motion.div>
            <motion.div
              initial={{
                x: -40,
                opacity: 0
              }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  duration: 0.7,
                  delay: 0.2,
                }
              }}
              className='flex flex-col items-center justify-center lg:items-start lg:justify-start'>
              <h1 className='text-6xl font-semibold text-[#272323] leading-tight'>Small habits.</h1>
              <h1 className='text-6xl font-semibold text-[#ed1d25] leading-12'>Big results.</h1>
            </motion.div>
            <motion.div
              initial={{
                x: -40,
                opacity: 0
              }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  duration: 0.8,
                  delay: 0.1,
                }
              }}
              className='w-100 text-neutral-500 text-base tracking-wide'>
              <p>
                Track your daily habits, build streaks, and transform your life one day at a time. Simple, beautiful, effective.
              </p>
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
                x : -40
              }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  duration: 0.8,
                  delay: 0.3,
                  stiffness: 120
                }
              }}
            >
              <button
                onClick={() => navigate('/login')} className='px-6 py-4 bg-[#ed1d25] flex items-center gap-2 text-white shadow-md font-medium cursor-pointer hover:scale-102 hover:drop-shadow-lg transition-all duration-300'>
                Start tracking free <ArrowRight size={14} />
              </button>
            </motion.div>

            <motion.div
              initial={{
                x: -40,
                opacity: 0
              }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  duration: 0.8,
                  delay: 0.1,
                }
              }}
              className='flex items-center justify-start gap-4 text-sm'>
              <span className='flex items-center gap-2 text-neutral-500'><Check className='text-red-500' size={18} />Free forever</span>
              <span className='flex items-center gap-2 text-neutral-500'><Check className='text-red-500' size={18} />No credit card</span>
            </motion.div>
          </div>

          <motion.div
            initial={{

              opacity: 0,
            }}
            animate={{
              x: 30,
              opacity: 1,
              transition: {
                duration: 0.5,
                delay: 0.3,
                stiffness: 120
              }
            }}
            className='flex items-center justify-center px-10 lg:px-0'>
            <div className='bg-[#272323] w-full px-5 py-7 shadow-lg relative'>
              <div className='flex items-center justify-between'>
                <h1 className='text-[#fefffe] font-medium'>Today's Habits</h1>
                <span className='text-neutral-500'>3/3 done</span>
              </div>
              <div className='w-full bg-neutral-700 px-4 py-2 mt-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='bg-[#ed1d25] text-white rounded-full px-1.5 py-1.5 font-medium scale-70'>
                      <Check size={18} />
                    </div>
                    <h1 className='font-semibold text-white leading-tight'>Morning workout</h1>
                  </div>
                  <div className='flex items-center gap-2 text-red-500'>
                    <Flame size={18} />
                    <span>12</span>
                  </div>
                </div>
              </div>
              <div className='w-full bg-neutral-700 px-4 py-2 mt-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='bg-[#ed1d25] text-white rounded-full px-1.5 py-1.5 font-medium scale-70'>
                      <Check size={18} />
                    </div>
                    <h1 className='font-semibold text-white leading-tight'>Read 30 mins</h1>
                  </div>
                  <div className='flex items-center gap-2 text-red-500'>
                    <Flame size={18} />
                    <span>8</span>
                  </div>
                </div>
              </div>
              <div className='w-full bg-neutral-700 px-4 py-2 mt-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='border border-neutral-500 rounded-full px-1.5 py-1.5 font-medium scale-70'>
                      <Check size={18} className='text-neutral-700' />
                    </div>
                    <h1 className='font-semibold text-white leading-tight'>Morning workout</h1>
                  </div>
                  <div className='flex items-center gap-2 text-red-500'>
                    <Flame size={18} />
                    <span>5</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-10 bg-white px-4 py-3 drop-shadow-lg drop-shadow-red-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-100">
                    <Flame className="text-red-500" />
                  </div>
                  <div>
                    <h1 className="font-bold text-lg">12</h1>
                    <span className="text-sm text-neutral-500">Day streak</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Steps */}
        <div className='flex flex-col items-center justify-center border-t border-neutral-300 mt-34 '>
          <Steps />
        </div>
        <hr className='text-neutral-300 mt-10' />
        {/* Fetured Section */}
        <div className='flex flex-col items-center justify-center border-neutral-300 mt-24 py-24 w-full bg-[#272323] px-10 lg:px-0'>
          <Featured />
        </div>
        <footer className='mt-10'>
          <Footer />
        </footer>
      </div>
    </>
  )
}

export default Landing
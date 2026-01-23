import React from 'react'
import UserLayout from '../../layout/UserLayout'
import { Lock, Trophy } from 'lucide-react'

const Achievements = () => {
  return (
    <UserLayout>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col items-start justify-start gap-1'>
          <h1 className='text-2xl font-semibold tracking-tight text-neutral-800 leading-tight'>Achievements</h1>
          <p className='text-sm text-neutral-500'>0 of 6 unlocked</p>
        </div>
        <div className='flex items-center gap-4 border border-neutral-300 px-5 py-5 mt-8'>
          <div className='bg-[#ec3e55] p-6 shadow-sm'>
            <Trophy className='text-white' size={36} />
          </div>
          <div className='flex flex-col items-start justify-start gap-2 w-full'>
            <h1 className='text-lg font-medium tracking-tight'>Achievement Progress</h1>
            <div className="w-full h-2 bg-neutral-200 rounded overflow-hidden">
              <div
                className="h-full w-64 bg-green-600 transition-all duration-300"
              />
            </div>
            <p className='text-sm text-neutral-500'>0% complete • 6 remaining</p>
          </div>
        </div>
        <div className='w-full flex items-start justify-start mt-5'>
          <h1 className='text-lg font-semibold tracking-tight text-neutral-900'>Tasks</h1>
        </div>
        <div className='w-full grid grid-cols-1 lg:grid-cols-2 mt-4 gap-5'>
          <div className='flex items-center gap-4 border border-neutral-300 px-5 py-5'>
            <div className='bg-neutral-200 p-4 shadow-sm'>
              <Lock className='text-neutral-500' size={18} />
            </div>
            <div className='flex flex-col items-start justify-start gap-2 w-full'>
              <div className='leading-tight'>
                <h1 className='text-lg font-medium tracking-tight text-neutral-600'>First Step</h1>
                <p className='text-neutral-500 text-sm'>Create your first habit</p>
              </div>
              <div className='flex items-center justify-between w-full'>
                <p className='text-sm text-neutral-500'>Progress</p>
                <span className='text-sm text-neutral-500'>0%</span>
              </div>
              <div className="w-full h-2 bg-neutral-200 rounded overflow-hidden">
              <div
                className="h-full w-64 bg-green-600 transition-all duration-300"
              />
            </div>

            </div>
          </div>
          <div className='flex items-center gap-4 border border-neutral-300 px-5 py-5'>
            <div className='bg-neutral-200 p-4 shadow-sm'>
              <Lock className='text-neutral-500' size={18} />
            </div>
            <div className='flex flex-col items-start justify-start gap-2 w-full'>
              <div className='leading-tight'>
                <h1 className='text-lg font-medium tracking-tight text-neutral-600'>First Step</h1>
                <p className='text-neutral-500 text-sm'>Create your first habit</p>
              </div>
              <div className='flex items-center justify-between w-full'>
                <p className='text-sm text-neutral-500'>Progress</p>
                <span className='text-sm text-neutral-500'>0%</span>
              </div>
              <div className="w-full h-2 bg-neutral-200 rounded overflow-hidden">
              <div
                className="h-full w-64 bg-green-600 transition-all duration-300"
              />
            </div>

            </div>
          </div>
          <div className='flex items-center gap-4 border border-neutral-300 px-5 py-5'>
            <div className='bg-neutral-200 p-4 shadow-sm'>
              <Lock className='text-neutral-500' size={18} />
            </div>
            <div className='flex flex-col items-start justify-start gap-2 w-full'>
              <div className='leading-tight'>
                <h1 className='text-lg font-medium tracking-tight text-neutral-600'>First Step</h1>
                <p className='text-neutral-500 text-sm'>Create your first habit</p>
              </div>
              <div className='flex items-center justify-between w-full'>
                <p className='text-sm text-neutral-500'>Progress</p>
                <span className='text-sm text-neutral-500'>0%</span>
              </div>
              <div className="w-full h-2 bg-neutral-200 rounded overflow-hidden">
              <div
                className="h-full w-64 bg-green-600 transition-all duration-300"
              />
            </div>

            </div>
          </div>

        </div>
      </div>
    </UserLayout>
  )
}

export default Achievements
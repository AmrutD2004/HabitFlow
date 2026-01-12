import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import {motion} from 'motion/react'

const UserLayout = ({ children }) => {
  
  return (
    <div className="flex h-screen overflow-hidden">

      <motion.div
      initial ={{
        x : -50,
        opacity : 0
      }}
      animate ={{
        x : 0,
        opacity : 1,
        transition : {
          duration : 0.3,
          ease : 'easeInOut'
        }
      }}
      className=''
      >
        <Sidebar />
      </motion.div>

      <div className="flex flex-col flex-1 overflow-hidden">
        
        {/* Navbar */}
        <motion.div
        initial ={{
        y : -50,
        opacity : 0
      }}
      animate ={{
        y : 0,
        opacity : 1,
        transition : {
          duration : 0.3,
          ease : 'easeInOut'
        }
      }}
        >
          <Navbar />
        </motion.div>
        <main className="flex-1 overflow-y-auto px-6 py-4 bg-[#fefffe]">
          {children}
        </main> 

      </div>
    </div>
  )
}

export default UserLayout

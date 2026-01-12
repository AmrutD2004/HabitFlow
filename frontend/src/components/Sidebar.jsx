import React, { useContext, useEffect, useState } from 'react'
import {
  LayoutDashboard,
  ListTodo,
  ChartNoAxesCombined,
  Trophy,
  User,
  Flame,
  Sparkles,
  ArrowLeftToLine
} from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Sidebar = () => {
  const { userData, points } = useContext(AuthContext)

  const [sidebarCollapse, setSidebarCollapse] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const Menus = [
    { title: 'Dashboard', icon: <LayoutDashboard size={16} />, path: '/dashboard' },
    { title: 'My Habits', icon: <ListTodo size={16} />, path: '/allhabits' },
    { title: 'Analysis', icon: <ChartNoAxesCombined size={16} />, path: '/analysis' },
    { title: 'Achievements', icon: <Trophy size={16} />, path: '/achievements' },
    { title: 'Profile', icon: <User size={18} />, path: '/profile' },
  ]

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setSidebarCollapse(mobile)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div
      className={`h-screen transition-all duration-300 overflow-hidden
        ${sidebarCollapse ? 'w-16' : 'w-64'}`}
    >
      <aside className='flex flex-col h-full w-full border-r border-neutral-300 bg-white'>

        {/* Header */}
        <div className='flex items-center gap-2 border-b border-neutral-300 py-4 px-3'>
          {!sidebarCollapse && (
            <div className='p-2 rounded-lg bg-[#ed1d25] text-white'>
              <Flame />
            </div>
          )}

          {!sidebarCollapse && (
            <Link to='/' className='flex-1'>
              <div className='leading-tight'>
                <h1 className='font-medium'>HabitFlow</h1>
                <p className='text-xs text-neutral-500'>Track your growth</p>
              </div>
            </Link>
          )}

          <button
            onClick={() => setSidebarCollapse(!sidebarCollapse)}
            className='transition-transform duration-300 ms-2'
          >
            <ArrowLeftToLine
              size={20}
              className={`${sidebarCollapse ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Points */}
        {!sidebarCollapse && (
          <div className='px-3 py-4'>
            <div className='flex items-center gap-3 bg-red-100 px-3 py-3'>
              <div className='p-2 rounded-full bg-linear-to-tl from-[#ffdd00] to-[#e6bc18] text-white'>
                <Sparkles size={18} />
              </div>
              <div>
                <p className='text-xs text-neutral-500'>Total Points</p>
                <p className='font-semibold text-sm'>{points}</p>
              </div>
            </div>
          </div>
        )}

        {/* Menu */}
        <nav className='flex-1 px-2 space-y-2 mt-5'>
          {Menus.map((item, idx) => (
            <div key={idx} className='relative group'>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-medium transition-all
                  ${sidebarCollapse ? 'justify-center' : 'gap-3'}
                  ${isActive
                    ? 'bg-[#ed1d25] text-white'
                    : 'text-[#272323] hover:bg-red-100'
                  }`
                }
              >
                {item.icon}
                {!sidebarCollapse && item.title}
              </NavLink>

              {/* Tooltip */}
              {sidebarCollapse && (
                <span
                  className='pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3
                  opacity-0 group-hover:opacity-100 group-hover:translate-x-1
                  transition-all duration-200
                  bg-[#272323] text-white text-xs px-3 py-1 rounded-md shadow-md whitespace-nowrap z-50'
                >
                  {item.title}
                </span>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className='border-t border-neutral-300 px-3 py-4'>
          <div className={`flex items-center ${sidebarCollapse ? 'justify-center' : 'gap-3'}`}>
            <span className='bg-red-100 text-red-700 text-lg px-3 py-2 rounded-full'>
              {userData?.username?.[0]?.toUpperCase()}
            </span>

            {!sidebarCollapse && (
              <div>
                <p className='text-sm font-medium'>{userData?.username}</p>
                <p className='text-xs text-neutral-500'>{userData?.email}</p>
              </div>
            )}
          </div>
        </div>

      </aside>
    </div>
  )
}

export default Sidebar

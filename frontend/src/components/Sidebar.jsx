import React, { useContext, useState } from 'react'
import { LayoutDashboard, ListTodo, ChartNoAxesCombined, Trophy, User, Flame, Sparkles } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Sidebar = () => {
    const { userData, points } = useContext(AuthContext)
    const Menus = ([
        { title: 'Dashboard', icon: <LayoutDashboard size={16} />, path: '/dashboard' },
        { title: 'My Habits', icon: <ListTodo size={16} />, path: '/allhabits' },
        { title: 'Analysis', icon: <ChartNoAxesCombined size={16} />, path: '/analysis' },
        // { title: 'Achievements', icon: <Trophy size={16} />, path: '/achievements' },
        { title: 'Profile', icon: <User size={18} />, path: '/profile' },
    ])
    return (
        <div className='flex h-screen w-64 overflow-hidden'>
            <aside className='flex flex-col h-full w-full border border-neutral-300'>

                <div className='flex  w-full items-center justify-start ps-4 gap-2 border-b py-4 border-neutral-300'>
                    <div className='p-2 rounded-lg bg-[#ed1d25] text-white scale-90'>
                        <Flame />
                    </div>
                    <Link to={'/'}>
                        <div className='flex flex-col items-start justify-start leading-tight'>
                            <h1 className='font-medium'>HabitFlow</h1>
                            <p className='text-xs tracking-tight text-neutral-500'>Track your growth</p>
                        </div>
                    </Link>
                </div>
                <div className='w-55 flex-1 mx-auto py-4 space-y-4'>
                    <div className='flex items-center justify-start gap-2 bg-red-100 px-4 py-3'>
                        <div className='p-2 rounded-full bg-linear-to-tl from-[#ffdd00] to-[#e6bc18] text-white'>
                            <Sparkles size={18} />
                        </div>
                        <div className='flex flex-col items-start justify-start leading-tight'>
                            <p className='text-xs text-neutral-500 tracking-tight leading-tight'>Total Points</p>
                            <h1 className='font-semibold text-[#272323] text-sm'>{points}</h1>
                        </div>
                    </div>
                    <div className='w-full flex flex-col items-start justify-start gap-1 py-2 space-y-3'>
                        {Menus.map((items, idx) => (
                            <NavLink
                                key={idx}
                                to={items.path}
                                className={({ isActive }) =>
                                    `flex font-medium text-sm items-center gap-3 w-full px-3 py-2 group
                                    ${isActive
                                        ? 'bg-[#ed1d25] text-white'
                                        : 'text-[#272323] hover:bg-red-100 transition-all duration-300'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <span
                                            className={`transition-transform duration-200 ${isActive ? 'scale-105' : 'group-hover:scale-105'
                                                }`}
                                        >
                                            {items.icon}
                                        </span>
                                        {items.title}
                                    </>
                                )}
                            </NavLink>
                        ))}

                    </div>
                </div>
                <div className='border-t w-full py-4 px-3 border-neutral-300'>
                    <div className='flex items-center justify-start gap-3 rounded-full'>
                        <span className='bg-red-100 px-4 py-2  text-2xl text-red-700' style={{
                            clipPath: "circle(50% at 50% 50%)"
                        }}>
                            {userData?.username?.[0]?.toUpperCase()}
                        </span>
                        <div className='flex flex-col items-start justify-start leading-tight'>
                            <span className='text-lg font-medium tracking-tight'>{userData?.username}</span>
                            <span className='text-neutral-500 text-xs tracking-tight'>{userData?.email}</span>
                        </div>
                    </div>

                </div>
            </aside>
        </div>
    )
}

export default Sidebar
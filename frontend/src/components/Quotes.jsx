import { motion } from 'motion/react'
import React from 'react'

const Quotes = () => {
    const quotes = [
        {
            author: '― Stephen R. Covey',
            quote: '“I am what I am today because of the choices I made yesterday.”'
        },
        {
            author: '― William Durant',
            quote: '“We are what we repeatedly do. Excellence, then, is not an act, but a habit.”'
        },
        {
            author: '— Robert Collier',
            quote: '“Success is the sum of small efforts repeated day in and day out.”'
        },
    ]
    return (
        <div className='flex items-center justify-center gap-10'>
            {quotes.map((items, idx) => (
                <motion.div key={idx} 
                initial = {{
                    opacity : 0,
                    scale : 0.98
                }}
                animate = {{
                    opacity: 1,
                    scale : 1,
                    transition : {
                        duration : 0.3,
                        ease : 'easeInOut',
                        delay : 0.8,
                    }
                }}
                className='flex flex-col items-center justify-center gap-3 border border-neutral-300 shadow-sm w-50 rounded-lg'>

                        <h1 className='text-sm tracking-wide leading-tight font-serif italic text-center px-5 py-4 font-semibold text-neutral-500'>{items.quote}</h1>
                        <p className='text-sm tracking-wide leading-tight font-serif italic text-center px-5 py-4 text-neutral-500'>{items.author}</p>
                </motion.div>
            ))}

        </div>
    )
}

export default Quotes
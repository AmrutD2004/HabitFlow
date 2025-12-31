import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full border-t border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-center gap-2">
        
        <span className="text-sm text-neutral-500">
          © {new Date().getFullYear()} Habit Tracker. All rights reserved.
        </span>
      </div>
    </footer>
  )
}

export default Footer

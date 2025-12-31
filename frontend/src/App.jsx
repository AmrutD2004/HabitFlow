import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Signup from './pages/auth/Signup'
import Dashboard from './pages/userprofile/Dashboard'
import AllHabits from './pages/userprofile/AllHabits'
import Analysis from './pages/userprofile/Analysis'
import Achievements from './pages/userprofile/Achievements'
import Profile from './pages/userprofile/Profile'
import Login from './pages/auth/Login'
import VerifyEmail from './pages/userprofile/VerifyEmail'
import Protected from './ProtectedRoute/Protected'
import Landing from './pages/Landing/Landing'

const App = () => {
  return (
    <Router>
      <div>
        <Toaster />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/allhabits' element={<Protected><AllHabits /></Protected>} />
          <Route path='/analysis' element={<Protected><Analysis /></Protected>} />
          <Route path='/achievements' element={<Protected><Achievements /></Protected>} />
          <Route path='/profile' element={<Protected><Profile /></Protected>} />
          <Route path='/dashboard' element={<Protected><Dashboard /></Protected>} />
          <Route path='/verifyEmail' element={<Protected><VerifyEmail /></Protected>} />
        </Routes>
      </div>

    </Router>
  )
}

export default App
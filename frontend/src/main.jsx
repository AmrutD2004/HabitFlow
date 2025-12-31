import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { HabitTrackingProvider } from './context/HabitTrackingContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
    <HabitTrackingProvider>
      <App />
    </HabitTrackingProvider>
    </AuthContextProvider>
  </StrictMode>,
)

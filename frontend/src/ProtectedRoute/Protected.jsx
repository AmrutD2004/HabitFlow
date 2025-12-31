import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const Protected = ({children}) => {
    const {isLoggedIn, authChecked} = useContext(AuthContext)
    if (!authChecked) {
    return null // or spinner
  }

    if(!isLoggedIn){
      return <Navigate to={'/login'} replace/>
    }
    return children
}

export default Protected
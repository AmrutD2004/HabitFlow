import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext()

export const AuthContextProvider = (props) => {
    const BASE_URL = import.meta.env.VITE_BACKEND_URL
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [authChecked, setAuthChecked] = useState(false)
    const [userData, setUserData] = useState(false)
    const [points, setPoints] = useState(0)

    axios.defaults.withCredentials = true

    const getUserData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user/userData`)
            const data = response.data
            console.log(data)
            if (data.success === true) {
                setUserData(data.userData)
                setPoints(data.userData.points)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAuthStatus = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user/is-auth`)
            const data = response.data
            if (data.success === true) {
                setIsLoggedIn(true)
                await getUserData()
            } else {
                setIsLoggedIn(false)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setAuthChecked(true)
        }

    }

    useEffect(() => {
        getAuthStatus()
    }, [])
    
    //Getting all habits of user
    const [habitData, setHabitData] = useState([])
    const getHabitData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/habit/getHabits`)
            const data = await response.data
            console.log(data)
            if (data.success) {
                setHabitData(data.habits)
            }
        } catch (error) {
            console.error(error.message)
        }
    }
    
    useEffect(()=>{
       if(isLoggedIn){
        getHabitData()
       }
    },[isLoggedIn])
    const value = {
        BASE_URL,
        isLoggedIn, setIsLoggedIn,
        userData, setUserData,
        getUserData, authChecked,
        habitData, getHabitData, points, setPoints
    }
    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}
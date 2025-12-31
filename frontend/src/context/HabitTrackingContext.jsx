import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DateTime, Info, Interval } from 'luxon'
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const HabitTrackingContext = createContext()

export const HabitTrackingProvider = (props) => {
    const { BASE_URL, user, isLoggedIn } = useContext(AuthContext)
    const today = DateTime.local()
    const [checkedMap, setCheckedMap] = useState({})

    const [firstDayOfActiveMonth, setFirstDayOfActiveMonth] = useState(today.startOf('month'))
    const toggleCell = (habitID, isoDate) => {
        const key = `${habitID}-${isoDate}`

        setCheckedMap(prev => ({
            ...prev, [key]: !prev[key]
        }))
    }

    const daysOfMonth = Interval.fromDateTimes(
        firstDayOfActiveMonth.startOf('week'),
        firstDayOfActiveMonth.endOf('month').endOf('week')
    ).splitBy({ day: 1 }).map(day => day.start)


    const getPreviousMonth = () => {
        setFirstDayOfActiveMonth(firstDayOfActiveMonth.minus({ month: 1 }))
        setCheckedMap({})
    }
    const getNextMonth = () => {
        setFirstDayOfActiveMonth(firstDayOfActiveMonth.plus({ month: 1 }))
        setCheckedMap({})
    }

    useEffect(() => {
        const hydrateCheckedMap = async () => {
            try {
                //  Compute month range
                const start = firstDayOfActiveMonth.startOf('month').toISODate()
                const end = firstDayOfActiveMonth.endOf('month').toISODate()
                axios.defaults.withCredentials = true
                //  Fetch backend data
                const response = await axios.get(
                    `${BASE_URL}/user/getHabitTracking`,
                    {
                        params: { start, end }
                    }
                )

                //  Build checkedMap from backend data
                const map = {}

                response.data.data.forEach(record => {
                    const key = `${record.habit_id}-${record.date}`
                    map[key] = record.status
                })

                console.log(response.data)

                //  Replace UI state
                setCheckedMap(map)

            } catch (error) {
                console.error('Failed to hydrate habit tracking', error)
            }
        }

        hydrateCheckedMap()
    }, [firstDayOfActiveMonth])

    const [userHabitTrackingData, setUserHabitTrackingData] = useState([])

    const getUserHabitTrackingData = async () => {
        axios.defaults.withCredentials = true
        const response = await axios.get(`${BASE_URL}/user/getUserHabitTracking`)
        const data = await response.data
        setUserHabitTrackingData(data.habitTrackingdata ?? [])
        console.log(data)
    }

    useEffect(() => {

        if (isLoggedIn) {
            getUserHabitTrackingData()
        }
    }, [isLoggedIn])


    const value = {
        // state
        checkedMap,
        firstDayOfActiveMonth,
        daysOfMonth,

        // actions
        toggleCell,
        getPreviousMonth,
        getNextMonth,

        userHabitTrackingData,
        getUserHabitTrackingData
    }

    return (
        <HabitTrackingContext.Provider value={value}>
            {props.children}
        </HabitTrackingContext.Provider>
    )
}
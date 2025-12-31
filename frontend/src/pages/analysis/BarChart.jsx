import React, { useContext } from 'react'
import { DateTime } from 'luxon'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
)

const BarChart = ({userHabitTrackingData}) => {
  const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const weekCounts = {
  Mon: 0,
  Tue: 0,
  Wed: 0,
  Thu: 0,
  Fri: 0,
  Sat: 0,
  Sun: 0,
}

userHabitTrackingData.forEach(item => {
  if (!item.status) return

  const weekday = DateTime.fromISO(item.date).toFormat('ccc')
  weekCounts[weekday] += 1
})

  const data = {
    labels: weekLabels,
    datasets: [
      {
        label: 'Habits',
        data: weekCounts,
        backgroundColor: '#ed1d25',
        borderRadius : 3,
        borderColor : '#ed1d25',
        borderWidth : 2,
         maxBarThickness: 60
      },
    ],
  }

  const option = {
     cutout: '70%',
  }

  return (
    <>
    <div className='scale-120'>
      <Bar data={data} options={option}/>
    </div>

    </>
  )
}

export default BarChart

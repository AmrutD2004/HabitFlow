import React from 'react'
import {DateTime} from 'luxon'
import {
  Chart as ChartJS, CategoryScale,
  LinearScale,
  LineElement,
PointElement,

  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
PointElement,

  Tooltip,
  Legend
)



const LineChart = ({userHabitTrackingData , habitData }) => {

  const activeHabitsCount = habitData.filter(h => h.is_active).length
  if (activeHabitsCount === 0) return null

  const now = DateTime.local()
  const daysInMonth = now.daysInMonth

  const labels = Array.from({ length: daysInMonth }, (_, i) => i + 1)


  const dailyCompletionCount = {}
  labels.forEach(day => (dailyCompletionCount[day] = 0))


  userHabitTrackingData.forEach(item => {
    if (!item.status) return

    const date = DateTime.fromISO(item.date)
    if (date.month === now.month && date.year === now.year) {
      dailyCompletionCount[date.day] += 1
    }
  })

  const percentages = labels.map(day =>
    Math.round((dailyCompletionCount[day] / activeHabitsCount) * 100)
  )

  const data = {
    labels,
    datasets: [
      {
        label: 'Daily Completion %',
        data: percentages,
        borderColor: '#ed1d25',
        backgroundColor: 'rgba(237, 29, 37, 0.15)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
      },
    ],
  }

  const options = {
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          callback: value => `${value}%`,
        },
      },
    },
  }

  return <Line data={data} options={options}/>
}

export default LineChart


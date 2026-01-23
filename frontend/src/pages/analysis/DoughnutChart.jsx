import React from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const DoughnutChart = ({ habitData = [] }) => {

  const categoryCount = {}

  habitData.forEach(item => {
    const category = item.category
    categoryCount[category] = (categoryCount[category] || 0) + 1
  })

  const labels = Object.keys(categoryCount)
  const values = Object.values(categoryCount)

  const data = {
    labels,
    datasets: [
      {
        label: 'Habits by Category',
        data: values,
        backgroundColor: [
          '#ed1d25',
          '#ff2056',
          '#ff6467',
          '#ffc857',
          '#4caf50',
        ],
        borderWidth: 0,
        spacing: 6,
        hoverOffset: 8,
      },
    ],
  }

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }

  return (
    <div style={{ width: 300, height: 300 }}>
      <Doughnut data={data} options={options} />
    </div>
  )
}


export default DoughnutChart

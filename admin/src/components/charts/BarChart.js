import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getBudgetStats } from '../../api/statsApi';

// Register the chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart() {
  const [budgetData, setBudgetData] = useState({
    restaurant: [],
    cafe: [],
    shopping: [],
    entertainment: []
  });

  useEffect(() => {
    const getBudgetData = async () => {
      const response = await getBudgetStats();
      const reversedRestaurant = response.restaurant.reverse();
      const reversedCafe = response.cafe.reverse();
      const reversedShopping = response.shopping.reverse();
      const reversedEntertainment = response.entertainment.reverse();

      setBudgetData({
        restaurant: reversedRestaurant,
        cafe: reversedCafe,
        shopping: reversedShopping,
        entertainment: reversedEntertainment
      });
    }
    getBudgetData();
  }, [])

  const currentMonth = new Date().getMonth() + 1;
  const labels = Array.from({ length: currentMonth }, (_, i) => `Tháng ${i + 1}`);

  const allBudgets = [
    ...budgetData.restaurant,
    ...budgetData.cafe,
    ...budgetData.shopping,
    ...budgetData.entertainment
  ];
  const maxBudget = Math.max(...allBudgets);
  const stepSize = 1000000;
  const suggestedMax = Math.ceil(maxBudget / stepSize) * stepSize + stepSize;

  const barData = {
    labels: labels,
    datasets: [
      {
        label: 'Nhà hàng',
        backgroundColor: '#34C759',
        borderColor: '#34C759',
        borderWidth: 1,
        data: budgetData.restaurant
      },
      {
        label: 'Cafe và bánh',
        backgroundColor: '#FF9500',
        borderColor: '#FF9500',
        borderWidth: 1,
        data: budgetData.cafe
      },
      {
        label: 'Mua sắm',
        backgroundColor: '#FF3B30',
        borderColor: '#FF3B30',
        borderWidth: 1,
        data: budgetData.shopping
      },
      {
        label: 'Giải trí',
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
        borderWidth: 1,
        data: budgetData.entertainment
      },
    ],
  };
      
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Tháng',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Ngân sách (VNĐ)',
        },
        ticks: {
          callback: (value) => `${(value / 1000000).toLocaleString('vi-VN')} triệu`,
        },
        min: 0,
        max: suggestedMax,
        stepSize: 2000000,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw.toLocaleString('vi-VN')} VNĐ`,
        },
      },
    },    
  }   

  return (
    <div style={{ width: '100%', height: '900px' }}>
      <Bar data={barData} options={barOptions} />
    </div>
  );
}

export default BarChart;

  
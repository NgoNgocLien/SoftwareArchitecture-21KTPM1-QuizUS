import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components for chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function LineChart() {
  // Data for the chart
  const data = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8'], // Most recent 8 months
    datasets: [
      {
        label: 'Đăng ký',
        data: [10, 15, 20, 25, 30, 35, 30, 25], // Amount of money in millions for "Đăng ký"
        borderColor: '#007AFF', // Blue color
        backgroundColor: 'rgba(0, 122, 255, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Tham gia sự kiện',
        data: [5, 10, 15, 20, 25, 30, 20, 15], // Amount of money in millions for "Tham gia sự kiện"
        borderColor: '#34C759', // Green color
        backgroundColor: 'rgba(52, 199, 89, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Trao đổi vật phẩm',
        data: [8, 12, 18, 22, 28, 32, 25, 18], // Amount of money in millions for "Trao đổi vật phẩm"
        borderColor: '#FF3B30', // Red color
        backgroundColor: 'rgba(255, 59, 48, 0.2)',
        tension: 0.4,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Disable aspect ratio to control height
    plugins: {
      legend: {
        position: 'top', // Legend position
      },
      title: {
        display: true,
        text: 'Biểu đồ theo dõi số lượng người chơi theo tháng (triệu đồng)', // Chart title
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value + ' triệu'; // Show Y-axis as "triệu đồng"
          },
        },
        suggestedMax: 40, // Set the max value to 40 million
      },
    },
  };

  return (
    <div style={{ height: '500px' }}>
      <Line data={data} options={options} />
    </div>
  );
}

export default LineChart;

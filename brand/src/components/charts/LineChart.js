import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { getPlayerStats } from '../../api/statsApi';

// Register necessary components for chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function LineChart() {
  const storedBrand = localStorage.getItem('brand');
  const brand = storedBrand ? JSON.parse(storedBrand) : null;

  const [playerData, setPlayerData] = useState({
    recentPlayerCount: [],
    recentPlayerGames: [],
    recentItemGifts: [],
  });

  useEffect(() => {
    const getPlayerData = async () => {
      const response = await getPlayerStats(brand.id_brand);

      const reversedPlayerCount = response?.recentPlayerCount ? response.recentPlayerCount : [];
      const reversedPlayerGames = response?.recentPlayerGames ? response.recentPlayerGames : [];
      const reversedItemGifts = response?.recentItemGifts ? response.recentItemGifts : [];

      setPlayerData({
        recentPlayerCount: reversedPlayerCount,
        recentPlayerGames: reversedPlayerGames,
        recentItemGifts: reversedItemGifts
      });
    }
    getPlayerData();
}, [])

  console.log(playerData)

  const currentMonth = new Date().getMonth() + 1;
  const labels = Array.from({ length: currentMonth }, (_, i) => `Tháng ${i + 1}`);

  // Data for the chart
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Đăng ký',
        data: playerData.recentPlayerCount, 
        borderColor: '#007AFF', // Blue color
        backgroundColor: 'rgba(0, 122, 255, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Tham gia sự kiện',
        data: playerData.recentPlayerGames, 
        borderColor: '#34C759', // Green color
        backgroundColor: 'rgba(52, 199, 89, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Trao đổi vật phẩm',
        data: playerData.recentItemGifts,
        borderColor: '#FF3B30', // Red color
        backgroundColor: 'rgba(255, 59, 48, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const maxDataValue = Math.max(
    ...(playerData?.recentPlayerCount.length ? playerData.recentPlayerCount : [0]),
    ...(playerData?.recentPlayerGames.length ? playerData.recentPlayerGames : [0]),
    ...(playerData?.recentItemGifts.length ? playerData.recentItemGifts : [0])
  );
  const suggestedMax = maxDataValue + 10;

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
        text: 'Biểu đồ theo dõi số lượng người chơi theo tháng', // Chart title
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value; // Show Y-axis
          },
        },
        suggestedMax: suggestedMax
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

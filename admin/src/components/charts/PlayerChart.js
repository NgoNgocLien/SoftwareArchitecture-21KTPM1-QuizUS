import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getPlayerByGameStats } from '../../api/statsApi';
ChartJS.register(ArcElement, Tooltip, Legend);

const PlayerChart = () => {
  const [playerByGameData, setPlayerByGameData] = useState({});

  useEffect(() => {
      const getPlayerByGameData = async () => {
          const response = await getPlayerByGameStats();
          setPlayerByGameData(response);
      }
      getPlayerByGameData();
  }, [])

  const data = {
    labels: ['Lắc vật phẩm', 'Trắc nghiệm'],
    datasets: [
      {
        data: [playerByGameData.itemGamePlayerCount, playerByGameData.quizGamePlayerCount],
        backgroundColor: ['#007AFF', '#34C759'],
        hoverBackgroundColor: ['#007AFF', '#34C759'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Số lượng: ${tooltipItem.raw}`,
        },
      },
    },
    cutout: '70%',
  };

  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default PlayerChart;

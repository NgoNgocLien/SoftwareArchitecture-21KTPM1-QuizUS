import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart() {
    const barData = {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8'],
        datasets: [
          {
            label: 'Nhà hàng',
            backgroundColor: '#34C759',
            borderColor: '#34C759',
            borderWidth: 1,
            data: [2000000, 4000000, 6000000, 8000000, 10000000, 6000000, 4000000, 2000000],
          },
          {
            label: 'Cafe và bánh',
            backgroundColor: '#FF9500',
            borderColor: '#FF9500',
            borderWidth: 1,
            data: [4000000, 6000000, 8000000, 6000000, 4000000, 2000000, 10000000, 8000000],
          },
          {
            label: 'Mua sắm',
            backgroundColor: '#FF3B30',
            borderColor: '#FF3B30',
            borderWidth: 1,
            data: [6000000, 8000000, 10000000, 8000000, 6000000, 4000000, 2000000, 10000000],
          },
          {
            label: 'Giải trí',
            backgroundColor: '#007AFF',
            borderColor: '#007AFF',
            borderWidth: 1,
            data: [10000000, 8000000, 6000000, 4000000, 2000000, 10000000, 8000000, 6000000],
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
              callback: (value) => `${(value / 1000000)} triệu`,
            },
            min: 0,
            max: 10000000,
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
              label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw.toLocaleString()} VNĐ`,
            },
          },
        },
        

    }   

    return (
        <div style={{ width: '790px', height: '400px' }}>
          <Bar data={barData} options={barOptions} />
        </div>
    );
}

export default BarChart;

  
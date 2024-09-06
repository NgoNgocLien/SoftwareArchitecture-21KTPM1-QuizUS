import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const VoucherChart = () => {
  const data = {
    labels: ['Đã sử dụng', 'Còn hạn sử dụng', 'Hết hạn sử dụng'],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ['#D5D5D5', '#007AFF', '#34C759'],
        hoverBackgroundColor: ['#D5D5D5', '#007AFF', '#34C759'],
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
    },
    cutout: '70%', // Adjust the size of the donut hole
  };

  return (
    <div>
      <Doughnut data={data} options={options} />
      <p>Tổng giá trị voucher: 8.120.000 VNĐ</p>
    </div>
  );
};

export default VoucherChart;

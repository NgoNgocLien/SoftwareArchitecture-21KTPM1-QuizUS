import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const VoucherChart = ({ chartData }) => {
  const data = {
    labels: ['Đã sử dụng', 'Chưa sử dụng', 'Hết hạn sử dụng'],
    datasets: [
      {
        data: [chartData?.validUsedVouchers || 0, chartData?.validUnusedVouchers || 0, chartData?.expiredVouchers || 0],
        backgroundColor: ['#34C759', '#007AFF', '#D5D5D5'],
        hoverBackgroundColor: ['#34C759', '#007AFF', '#D5D5D5'],
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
      <p>Tổng giá trị voucher: {chartData?.totalValue || 0} VNĐ</p>
    </div>
  );
};

export default VoucherChart;

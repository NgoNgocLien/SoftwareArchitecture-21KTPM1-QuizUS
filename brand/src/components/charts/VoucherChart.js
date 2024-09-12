import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const VoucherChart = ({ chartData }) => {
  console.log("chartData: ", chartData);

  const data = {
    labels: ['Đã sử dụng', 'Chưa sử dụng', 'Hết hạn sử dụng'],
    datasets: [
      {
        data: [chartData?.used_vouchers || 0, chartData?.unused_vouchers || 0, chartData?.expired_vouchers || 0],
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
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
      <Doughnut data={data} options={options} />
      <p>Tổng giá trị voucher: {chartData?.total_value?.toLocaleString('vi-VN') || 0} VNĐ</p>
    </div>
  );
};

export default VoucherChart;

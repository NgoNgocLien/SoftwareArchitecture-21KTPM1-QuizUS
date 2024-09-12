import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getBudgetStats } from '../../api/statsApi';

// Register the chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart() {
  const storedBrand = localStorage.getItem('brand');
  const brand = storedBrand ? JSON.parse(storedBrand) : null;

  const [budgetData, setBudgetData] = useState([]);

  useEffect(() => {
    const getBudgetData = async () => {
      const response = await getBudgetStats(brand.id_brand);
      setBudgetData(response.campaigns || []); // Dữ liệu bao gồm tên campaign và ngân sách
    };
    getBudgetData();
  }, []);

  const currentMonth = new Date().getMonth() + 1;
  const labels = Array.from({ length: currentMonth }, (_, i) => `Tháng ${i + 1}`);

  // Hàm để tạo màu ngẫu nhiên
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Chuẩn bị datasets cho từng chiến dịch theo tháng
  const datasets = budgetData.map((campaign) => {
    const monthlyBudgets = new Array(currentMonth).fill(0); // Khởi tạo mảng cho ngân sách theo tháng

    // Giả sử mỗi campaign có thuộc tính start_month và used_budget
    const campaignStartMonth = new Date(campaign.start_datetime).getMonth(); // Lấy tháng bắt đầu của chiến dịch
    if (campaignStartMonth < currentMonth) {
      monthlyBudgets[campaignStartMonth] = campaign.used_budget; // Gán ngân sách cho tháng bắt đầu
    }

    return {
      label: campaign.campaign_name, // Tên của chiến dịch
      data: monthlyBudgets, // Ngân sách của chiến dịch theo từng tháng
      backgroundColor: getRandomColor(), // Gọi hàm để lấy màu ngẫu nhiên
      borderColor: '#34C759',
      borderWidth: 1,
    };
  });

  const barData = {
    labels: labels, // Tháng từ đầu năm đến tháng hiện tại
    datasets: datasets, // Gán datasets đã tạo
  };

  const maxBudget = Math.max(...budgetData.map(campaign => campaign.total_budget), 0);
  const stepSize = 1000000;
  const suggestedMax = Math.ceil(maxBudget / stepSize) * stepSize + stepSize;

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
  };

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <Bar data={barData} options={barOptions} />
    </div>
  );
}

export default BarChart;

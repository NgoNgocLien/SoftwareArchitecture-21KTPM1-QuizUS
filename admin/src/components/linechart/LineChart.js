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
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Tham gia sự kiện',
        data: [5, 10, 15, 20, 25, 30, 20, 15], // Amount of money in millions for "Tham gia sự kiện"
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Trao đổi vật phẩm',
        data: [8, 12, 18, 22, 28, 32, 25, 18], // Amount of money in millions for "Trao đổi vật phẩm"
        borderColor: 'rgba(255, 99, 132, 1)',
       

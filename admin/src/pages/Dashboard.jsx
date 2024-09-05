import React, { useState } from 'react';
import Chart from "chart.js/auto";
import LineChart from '../components/linechart/LineChart';
import "../styles/common.css";
import "../styles/dashboard.css";

export default function Dashboard() {
    return (
        <div>
            {/* Số lượng */}
            <div className='total-ctn'>
                <div className='total d-flex flex-column'>
                    <p>Tổng nhãn hàng</p>
                    <h5>2420</h5>
                </div>
                <div className='total d-flex flex-column'>
                    <p>Tổng sự kiện</p>
                    <h5>2420</h5>
                </div>
                <div className='total d-flex flex-column'>
                    <p>Tổng người chơi</p>
                    <h5>2420</h5>
                </div>
                <div className='total d-flex flex-column'>
                    <p>Tổng mã giảm giá</p>
                    <h5>2420</h5>
                </div>
            </div>

            {/* Thống kê */}
            <div className='col-9 statistics-ctn'>
                {/* Thống kê người chơi */}
                <div className='user-chart'>
                    <p>Thống kê</p>
                    <h6>Người chơi</h6>
                    <LineChart />
                </div>
                
                {/* Thống kê tình trạng vouchers */}
                <div className='voucher-chart'>

                </div>
                {/* Thống kê người chơi theo loại trò chơi */}
            </div>
            


            {/* Thống kê ngân sách */}
        </div>
    );
};
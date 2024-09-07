import React, { useState } from 'react';
import Chart from "chart.js/auto";
import LineChart from '../components/charts/LineChart';
import VoucherChart from '../components/charts/VoucherChart';
import PlayerChart from '../components/charts/PlayerChart';
import BarChart from '../components/charts/BarChart';
import "../styles/common.css";
import "../styles/dashboard.css";

export default function Dashboard() {
    return (
        <div>
            {/* Số lượng */}
            <div className='total-ctn'>
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
            <div className='statistics-ctn gap-2'>
                {/* Thống kê người chơi */}
                <div className='user-chart'>
                    <p>Thống kê</p>
                    <h6>Người chơi</h6>
                    <LineChart />
                </div>
                
                <div className='piechart d-flex flex-column'>
                    {/* Thống kê tình trạng vouchers */}
                    <div className='voucher-chart'>
                        <p>Thống kê</p>
                        <h6>Tình trạng voucher</h6>
                        <VoucherChart />
                    </div>
                    {/* Thống kê người chơi theo loại trò chơi */}
                    <div className='player-chart'>
                        <p>Thống kê</p>
                        <h6>Người chơi theo loại trò chơi</h6>
                        <PlayerChart />
                    </div>
                </div>
                
                
            </div>
            
            {/* Thống kê ngân sách */}
            <div className='budget-chart'>
                <p>Thống kê</p>
                <h6>Ngân sách đã sử dụng theo lĩnh vực</h6>
                <BarChart />
            </div>
        </div>
    );
};
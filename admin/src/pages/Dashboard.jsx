import React, { useState } from 'react';
import Chart from "chart.js/auto";
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
            <div className='statistics-ctn'>
                {/* Thống kê người chơi */}
                
                {/* Thống kê tình trạng vouchers */}

                {/* Thống kê người chơi theo loại trò chơi */}
            </div>
            


            {/* Thống kê ngân sách */}
        </div>
    );
};
import React, { useState, useEffect } from 'react';
import Chart from "chart.js/auto";
import LineChart from '../components/charts/LineChart';
import VoucherChart from '../components/charts/VoucherChart';
import PlayerChart from '../components/charts/PlayerChart';
import BarChart from '../components/charts/BarChart';
import EventChart from '../components/charts/EventChart';
import "../styles/common.css";
import "../styles/dashboard.css";
import { getStats, getVoucherStats } from '../api/statsApi';

export default function Dashboard() {
    const [data, setData] = useState({});
    const [voucherData, setVoucherData] = useState({});
    const storedBrand = localStorage.getItem('brand');
    const brand = storedBrand ? JSON.parse(storedBrand) : null;

    useEffect(() => {
        const getData = async () => {
            const response = await getStats(brand.id_brand);
            setData(response);
        }
        getData();

        const getVoucherData = async () => {
            const response = await getVoucherStats(brand.id_brand);
            setVoucherData(response);
        }
        getVoucherData();
    }, [])
    console.log(voucherData)
    return (
        <div>
            {/* Số lượng */}
            <div className='total-ctn'>
                <div className='total d-flex flex-column'>
                    <p>Tổng sự kiện</p>
                    <h5>{data?.campaignCount || 0}</h5>
                </div>
                <div className='total d-flex flex-column'>
                    <p>Tổng người chơi</p>
                    <h5>{data?.playerCount || 0}</h5>
                </div>
                <div className='total d-flex flex-column'>
                    <p>Tổng mã giảm giá</p>
                    <h5>{data?.voucherCount || 0}</h5>
                </div>
            </div>

            {/* Thống kê */}
            <div className='statistics-ctn gap-2'>
                <div className='vertical-ctn'>
                    {/* Thống kê người chơi */}
                    <div className='user-chart'>
                        <p>Thống kê</p>
                        <h6>Người chơi</h6>
                        <LineChart />
                    </div>
                    {/* Thống kê ngân sách */}
                    <div className='budget-chart'>
                        <p>Thống kê</p>
                        <h6>Ngân sách đã sử dụng</h6>
                        <BarChart />
                    </div>
                </div>
                
                <div className='piechart d-flex flex-column'>
                    {/* Thống kê tình trạng vouchers */}
                    <div className='voucher-chart'>
                        <p>Thống kê</p>
                        <h6>Tình trạng voucher</h6>
                        <VoucherChart chartData={voucherData}/>
                    </div>
                    {/* Thống kê người chơi theo loại trò chơi */}
                    <div className='player-chart'>
                        <p>Thống kê</p>
                        <h6>Người chơi theo loại trò chơi</h6>
                        <PlayerChart />
                    </div>
                    {/* Thống kê tình trạng sự kiện */}
                    <div className='voucher-chart'>
                        <p>Thống kê</p>
                        <h6>Tình trạng sự kiện</h6>
                        {/* <EventChart /> */}
                    </div>
                </div>
                
                
            </div>
        </div>
    );
};
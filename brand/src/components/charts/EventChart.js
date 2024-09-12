import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getEventStats } from '../../api/statsApi';

ChartJS.register(ArcElement, Tooltip, Legend);

const EventChart = ({ chartData }) => {
    const storedBrand = localStorage.getItem('brand');
    const brand = storedBrand ? JSON.parse(storedBrand) : null;

    const [eventData, setEventData] = useState({});

    useEffect(() => {
        const getEventData = async () => {
            const response = await getEventStats(brand.id_brand);
            setEventData(response);
        }
        getEventData();
    }, [])

    console.log(eventData)
    const data = {
        labels: ['Đang diễn ra', 'Sắp diễn ra', 'Đã kết thúc'],
        datasets: [
        {
            data: [eventData?.ongoing || 0, eventData?.upcoming || 0, eventData?.finished || 0],
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
        cutout: '70%',
    };

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
        <Doughnut data={data} options={options} />
        <p>Tổng số sự kiện: {(eventData.ongoing + eventData.upcoming + eventData.finished) || 0}</p>
        </div>
    );
};

export default EventChart;
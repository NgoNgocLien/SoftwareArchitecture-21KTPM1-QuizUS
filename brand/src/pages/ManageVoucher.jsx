import React, { useState, useEffect } from 'react';
import "../styles/common.css";
import "../styles/manage.css";
import { useNavigate } from 'react-router-dom';

import { getAll } from '../api/voucherApi';

export default function ManageVoucher() {
    const navigate = useNavigate();
    const storedBrand = localStorage.getItem('brand');
    const brand = storedBrand ? JSON.parse(storedBrand) : null;
    const [data, setData] = useState([]);
    const [fullData, setFullData] = useState([]);
    
    const handleSearch = (e) => {
        let searchText = e.target.value.toLowerCase();
        if (!searchText || searchText.length === 0)
            setData(fullData);
        let result = fullData.filter( data => data?.name?.toLowerCase().includes(searchText));
        setData(result);
    };

    function formatDate(isoDateString) {
        const date = new Date(isoDateString);
    
        if (isNaN(date.getTime())) {
            throw new TypeError('Invalid date string');
        }
    
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
        const year = date.getUTCFullYear();
    
        return `${day}-${month}-${year}`;
    }

    useEffect(() => {
        const getData = async () => {
            const data = await getAll(brand?.id_brand || 1); 
            if (data?.length > 0) {
                setData(data);
                setFullData(data);
            }
        }
        getData();
    }, [brand?.id_brand]);

    return (
        <div>
            <div className="add-voucher-container">
                <button className="add-voucher-btn" onClick={() => navigate('/create-voucher')}>
                    <img src="/icons/plus.svg" alt="add-voucher-icon" className="add-voucher-icon" />
                    Thêm voucher
                </button>
            </div>

            {/* Search bar */}
            <div className="search-bar">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Tìm kiếm theo ID, tên sự kiện"
                    onChange={handleSearch}
                />
                <img src="/icons/search.svg" alt="search-icon" className="search-icon" />
            </div>

            {/* Table */}
            <div className='manage-voucher'>
                <table className="voucher-table">
                    <thead>
                        <tr>
                            <th><input type="checkbox" />ID</th>
                            <th>Tên voucher</th>
                            <th>Hạn sử dụng</th>
                            <th>Giá trị VND</th>
                            <th>Giá đổi xu</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* Row */}
                        {
                            data.length > 0 ?
                            data.map(item => (
                                <tr key={item._id}>
                                    <td><input type="checkbox" />{item._id.substr(-5, 5)}</td>

                                    <td>
                                        <div className="voucher-info">
                                            <img src={item.photo} alt="" />
                                            <span>{item.name ||'Voucher chưa đặt tên'}</span>
                                        </div>
                                    </td>

                                    {/* Expired date */}
                                    <td>{formatDate(item.expired_date)}</td>
                                    
                                    {/* Giá trị voucher */}
                                    <td>{item.price}</td>

                                    {/* Người tham gia */}
                                    <td>{item.score_exchange}</td>
                                </tr>
                            ))
                            :
                            <tr>
                                <td colSpan={7} style={{width: '100%', textAlign: 'center'}}>
                                    <p style={{width: '100%'}}>Không có dữ liệu</p>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

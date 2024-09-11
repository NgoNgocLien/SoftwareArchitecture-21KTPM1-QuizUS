import React, { useState, useEffect } from 'react';
import "../styles/common.css";
import "../styles/manage.css";
import { useNavigate } from 'react-router-dom';
import { getAll } from '../api/campaignApi';

export default function Manageevent() {
    const navigate = useNavigate();
    const storedBrand = localStorage.getItem('brand');
    const brand = storedBrand ? JSON.parse(storedBrand) : null;
    const [data, setData] = useState([]);
    const [fullData, setFullData] = useState([]);
    // const [selectedField, setSelectedField] = useState('');
    
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

    const handleSearch = (e) => {
        let searchText = e.target.value.toLowerCase();
        if (!searchText || searchText.length === 0)
            setData(fullData);
        let result = fullData.filter( data => data?.name?.toLowerCase().includes(searchText));
        setData(result);
    };

    useEffect(() => {
        const getData = async () => {
            const data = await getAll(brand?.id_brand); 
            if (data?.length > 0) {
                setData(data);
                setFullData(data);
            }
        }
        getData();
    }, [brand?.id_brand]);

    console.log(data);
    return (
        <div>
            <div className="add-event-container">
                <button className="add-event-btn" onClick={() => {navigate('/create-event')}}>
                    <img src="/icons/plus.svg" alt="add-event-icon" className="add-event-icon" />
                    Thêm sự kiện
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
            <div className='manage-event'>
                <table className="event-table">
                    <thead>
                        <tr>
                            <th><input type="checkbox" />ID</th>
                            <th>Tên sự kiện</th>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày kết thúc</th>
                            {/* <th>Voucher</th> */}
                            <th>Số lượng voucher</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* Row */}
                        {
                            data.length > 0 ?
                            data.map (item => (
                                <tr key={item._id}>
                                    <td><input type="checkbox" />{item._id.substr(-5, 5)}</td>

                                    <td>
                                        <div className="event-info">
                                            <img src={item.photo} alt="event-logo" className="event-logo" />
                                            <span>{item.name}</span>
                                        </div>
                                    </td>

                                    {/* Ngày bắt đầu - Ngày kết thúc */}
                                    <td>{formatDate(item.start_datetime)}</td>
                                    <td>{formatDate(item.end_datetime)}</td>
                                    
                                    {/* Tên voucher */}
                                    {/* <td>
                                        <select
                                            className="field-select"
                                            value={selectedField}
                                            onChange={handleFieldChange}
                                        >
                                            <option value="Nhà hàng">Tên voucher</option>
                                        </select>
                                    </td> */}
                                    
                                    {/* Số lượng vouchers */}
                                    <td>{item.max_amount_voucher}</td>

                                    {/* Hành động */}
                                    <td className='action-buttons'>
                                        <button className="edit-btn">
                                            <img src="/icons/edit.svg" alt="edit-btn" />
                                                    Sửa
                                        </button>
                                        {/* <button className="delete-btn">
                                            <img src="/icons/delete.svg" alt="delete-btn" />
                                                    Xóa
                                        </button> */}
                                    </td>
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

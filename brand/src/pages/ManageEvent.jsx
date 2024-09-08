import React, { useState } from 'react';
import "../styles/common.css";
import "../styles/manage.css";

export default function Manageevent() {
    const [searchText, setSearchText] = useState('');
    const [selectedField, setSelectedField] = useState('');
    
    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const handleFieldChange = (e) => {
        setSelectedField(e.target.value);
    };

    return (
        <div>
            <div className="add-event-container">
                <button className="add-event-btn">
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
                    value={searchText}
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
                            <th>Voucher</th>
                            <th>Số lượng voucher</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* Row */}
                        <tr>
                            <td><input type="checkbox" />123456</td>

                            <td>
                                <div className="event-info">
                                    <img src="/images/event-logo.svg" alt="event-logo" className="event-logo" />
                                    <span>Tên sự kiện</span>
                                </div>
                            </td>

                            {/* Ngày bắt đầu - Ngày kết thúc */}
                            <td>22/03/2024</td>
                            <td>22/03/2024</td>
                            
                            {/* Tên voucher */}
                            <td>
                                <select
                                    className="field-select"
                                    value={selectedField}
                                    onChange={handleFieldChange}
                                >
                                    <option value="Nhà hàng">Tên voucher</option>
                                </select>
                            </td>
                            
                            {/* Số lượng vouchers */}
                            <td>100</td>

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
                    </tbody>
                </table>
            </div>
        </div>
    )
}

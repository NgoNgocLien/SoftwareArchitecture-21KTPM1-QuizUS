import React, { useState } from 'react';
import "../styles/common.css";
import "../styles/manage.css";

export default function ManageVoucher() {
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
            <div className="add-voucher-container">
                <button className="add-voucher-btn">
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
                    value={searchText}
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
                            <th>% Giảm giá</th>
                            <th>Giảm tối đa</th>
                            <th>Số xu</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* Row */}
                        <tr>
                            <td><input type="checkbox" />#123456</td>

                            <td>
                                <div className="voucher-info">
                                    <img src="/images/voucher-logo.svg" alt="voucher-logo" className="voucher-logo" />
                                    <span>Tên voucher</span>
                                </div>
                            </td>

                            {/* Expired date */}
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

                            {/* Người tham gia */}
                            <td>1000</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

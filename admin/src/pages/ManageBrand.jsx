import React, { useState } from 'react';
import "../styles/common.css";
import "../styles/manage.css";

export default function ManageBrand() {
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
            {/* Add brand */}
            <div className="add-brand-container">
                <button className="add-brand-btn">
                    <img src="/icons/plus.svg" alt="add-brand-icon" className="add-brand-icon" />
                    Thêm nhãn hàng
                </button>
            </div>
            
            {/* Search bar */}
            <div className="search-bar">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Tìm kiếm theo ID, tên, email người dùng"
                    value={searchText}
                    onChange={handleSearch}
                />
                <img src="/icons/search.svg" alt="search-icon" className="search-icon" />
            </div>

            {/* Table */}
            <div className='manage-brand'>
                <table className="brand-table">
                    <thead>
                        <tr>
                            <th><input type="checkbox" />ID</th>
                            <th>Tên</th>
                            <th>Địa chỉ</th>
                            <th>Lĩnh vực</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* Row */}
                        <tr>
                            <td><input type="checkbox" />#123456</td>

                            <td>
                                <div className="brand-info">
                                    <img src="/images/brand-logo.svg" alt="brand-logo" className="brand-logo" />
                                    <span>Shopee</span>
                                </div>
                            </td>

                            <td>123 Đường A, Phường B, Thành phố C, Việt Nam</td>
                            
                            <td>
                                <select
                                    className="field-select"
                                    value={selectedField}
                                    onChange={handleFieldChange}
                                >
                                    <option value="">Chọn lĩnh vực</option>
                                    <option value="Nhà hàng">Nhà hàng</option>
                                    <option value="Cafe & bánh">Cafe & bánh</option>
                                    <option value="Mua sắm">Mua sắm</option>
                                    <option value="Giải trí">Giải trí</option>
                                </select>
                            </td>

                            <td className='action-buttons'>
                                <button className="edit-btn">
                                    <img src="/icons/edit.svg" alt="edit-btn" />
                                    Sửa
                                </button>
                                <button className="delete-btn">
                                    <img src="/icons/delete.svg" alt="delete-btn" />
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
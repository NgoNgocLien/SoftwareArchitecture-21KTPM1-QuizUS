import React, { useState, useEffect } from 'react';
import "../styles/common.css";
import "../styles/manage.css";
import { getAllBrands, searchBrand } from '../api/brandApi';

export default function ManageBrand() {
    // const [searchText, setSearchText] = useState('');
    const [selectedField, setSelectedField] = useState('');
    const [brandData, setBrandData] = useState([]);
    
    const handleSearch = async (e) => {
        // setSearchText(e.target.value);
        const result = await searchBrand(e.target.value);
        console.log(result)
        if (result.length > 0) 
            setBrandData(result);
    };

    const handleFieldChange = (e) => {
        setSelectedField(e.target.value);
    };

    useEffect(() => {
        const getData = async () => {
            const data = await getAllBrands();
            if (data.length > 0) 
                setBrandData(data);
        }
        getData();
    }, [])

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
                    // value={searchText}
                    onChange={(e) => {handleSearch(e)}}
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
                        {
                            brandData.length > 0 ?
                            brandData.map((item, index) => (
                                <tr key={item.id_brand}>
                                    <td><input type="checkbox" />#{item.id_brand}</td>

                                    <td>
                                        <div className="brand-info">
                                            <img src={item.logo} alt="brand-logo" className="brand-logo" />
                                            <span>{item.name}</span>
                                        </div>
                                    </td>

                                    <td>{item.address}</td>
                                    
                                    <td>
                                        <select
                                            className="field-select"
                                            value={item.field}
                                            onChange={handleFieldChange}
                                        >
                                            <option value="">Chọn lĩnh vực</option>
                                            <option value="Nhà hàng">Nhà hàng</option>
                                            <option value="Cafe & Bánh">Cafe & Bánh</option>
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
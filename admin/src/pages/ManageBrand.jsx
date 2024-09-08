import React, { useState, useEffect } from 'react';
import "../styles/common.css";
import "../styles/manage.css";
import { getAllBrands, searchBrand } from '../api/brandApi';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

export default function ManageBrand() {
    // const [selectedField, setSelectedField] = useState('');
    const [brandData, setBrandData] = useState([]);
    
    const handleSearch = async (e) => {
        const result = await searchBrand(e.target.value);
        setBrandData(result);
    };

    // const handleFieldChange = (e) => {
    //     setSelectedField(e.target.value);
    // };

    // const onDelete = () => {
    //     confirmAlert({
    //         message: 'Bạn có chắc chắn muốn xóa nhãn hàng này không?',
    //         buttons: [
    //             {
    //                 label: 'Có',
    //                 onClick: () => {
                        
    //                 }
    //             },
    //             {
    //                 label: 'Không'
    //             }
    //         ]
    //     });
    // }

    useEffect(() => {
        const getData = async () => {
            const data = await getAllBrands();
            if (data.length > 0) 
                setBrandData(data);
        }
        getData();
    }, [])

    const navigate = useNavigate();

    const handleAddBrand = () => {
        navigate('/add-brand');
    };

    const handleEdit = (brand) => {
        navigate('/edit-brand', { state: { brand } });
    };

    return (
        <div>
            {/* Add brand */}
            <Link to="/add-brand" className='add-brand-ctn'>
                <button className="add-brand-btn">
                    <img src="/icons/plus.svg" alt="add-brand-icon" className="add-brand-icon" />
                    Thêm nhãn hàng
                </button>
            </Link>
            
            {/* Search bar */}
            <div className="search-bar">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Tìm kiếm theo ID, tên, email người dùng"
                    onChange={(e) => handleSearch(e)}
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* Row */}
                        {
                            brandData.length > 0 ?
                            brandData.map((item, index) => (
                                <tr key={item.id_brand}>
                                    <td><input type="checkbox" />{item.id_brand}</td>

                                    <td>
                                        <div className="brand-info">
                                            <img src={item.logo} alt="brand-logo" className="brand-logo" />
                                            <span>{item.name}</span>
                                        </div>
                                    </td>

                                    <td>{item.address}</td>
                                    
                                    <td>
                                        {/* <select
                                            className="field-select"
                                            value={item.field}
                                            onChange={handleFieldChange}
                                        >
                                            <option value="">Chọn lĩnh vực</option>
                                            <option value="Nhà hàng">Nhà hàng</option>
                                            <option value="Cafe & Bánh">Cafe & Bánh</option>
                                            <option value="Mua sắm">Mua sắm</option>
                                            <option value="Giải trí">Giải trí</option>
                                        </select> */}
                                        <div className="brand-info">
                                            <span>{item.field}</span>
                                        </div>
                                    </td>

                                    <td className='action-buttons'>
                                        <button className="edit-btn" onClick={() => handleEdit(item)}>
                                            <img src="/icons/edit.svg" alt="edit-btn" />
                                            Sửa
                                        </button>
                                        {/* <button className="delete-btn" onClick={onDelete}>
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
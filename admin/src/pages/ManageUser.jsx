import React, { useState, useEffect } from 'react';
import "../styles/common.css";
import "../styles/manage.css";
import { getAllPlayers } from '../api/playerApi';

export default function ManageUser() {
    const [searchText, setSearchText] = useState('')
    const [playerData, setPlayerData] = useState([]);
    
    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    useEffect(() => {
        const getData = async () => {
            const data = await getAllPlayers();
            if (data.length > 0) 
                setPlayerData(data);
        }
        getData();
    }, [])

    return (
        <div>
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
            <div className='manage-user'>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th><input type="checkbox" />ID</th>
                            <th>Họ tên</th>
                            <th>Email</th>
                            <th>Điện thoại</th>
                            <th>Giới tính</th>
                            <th>Ngày sinh</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* Row */}
                        {
                            playerData.length > 0 ?
                            playerData.map(item => (
                                <tr key={item.id_player}>
                                    <td><input type="checkbox" />#{item.id_player}</td>

                                    <td>
                                        <div className="user-info">
                                            <img src={item.avatar} alt="user-avatar" className="user-avatar" />
                                            <span>{item.username}</span>
                                            {/* <span>{user.name}</span> */}
                                        </div>
                                    </td>
                                    
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.dob}</td>
                                    {/* <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.birthdate}</td>*/}

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

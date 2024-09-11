import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/common.css";
import "../styles/manage.css";
import { getAllPlayers, searchPlayer } from '../api/playerApi';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

export default function ManagePlayer() {
    const [playerData, setPlayerData] = useState([]);
    const navigate =  useNavigate();
    
    const handleSearch = async (e) => {
        const result = await searchPlayer(e.target.value);
        if (typeof result === 'object' && !Array.isArray(result)) {
            setPlayerData([result]);
        } else {
            setPlayerData(result);
        }
    };

    const onEdit = (id) => {
        navigate(`/edit-user/${id}`);
    }

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
                    placeholder="Tìm kiếm theo email, số điện thoại người chơi"
                    onChange={(e) => handleSearch(e)}
                />
                <img src="/icons/search.svg" alt="search-icon" className="search-icon" />
            </div>

            {/* Table */}
            <div className='manage-user'>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" />
                                <span>ID</span>
                            </th>
                            <th>Họ tên</th>
                            <th>Email</th>
                            <th>Điện thoại</th>
                            <th>Giới tính</th>
                            <th>Ngày sinh</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* Row */}
                        {
                            playerData.length > 0 ?
                            playerData.map(item => (
                                <tr key={item.id_player}>
                                    <td><input type="checkbox" />
                                    <span>{item.id_player}</span></td>

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
                                        <button className="edit-btn" onClick={() => {onEdit(item.id_player)}}>
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

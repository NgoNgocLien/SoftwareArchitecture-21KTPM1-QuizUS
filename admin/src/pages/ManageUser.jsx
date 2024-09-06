import React, { useState } from 'react';
import "../styles/common.css";
import "../styles/manage.css";

export default function ManageUser() {
    const [searchText, setSearchText] = useState('')
    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

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
                        <tr>
                            <td><input type="checkbox" />#123456</td>

                            <td>
                                <div className="user-info">
                                    <img src="/images/user-avatar.svg" alt="user-avatar" className="user-avatar" />
                                    <span>Nguyen Van A</span>
                                    {/* <span>{user.name}</span> */}
                                </div>
                            </td>
                            
                            <td>email@example.com</td>
                            <td>0901234567</td>
                            <td>Nam</td>
                            <td>01/01/1990</td>
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
                    </tbody>
                </table>
            </div>
        </div>
    )
}

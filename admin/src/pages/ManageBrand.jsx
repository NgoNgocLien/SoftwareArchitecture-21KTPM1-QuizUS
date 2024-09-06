import React, { useState } from 'react';
import "../styles/common.css";
import "../styles/manage.css";

export default function ManageBrand() {
    return (
        <div>
            {/* Search bar */}
            
            {/* Brand list */}
            <div className='manage-user'>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th><input type="checkbox" /></th>
                            <th>Họ tên</th>
                            <th>Email</th>
                            <th>Điện thoại</th>
                            <th>Giới tính</th>
                            <th>Ngày sinh</th>
                            <th>Facebook</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* Row */}
                        <tr>
                            <td><input type="checkbox" /></td>
                            <td>
                                <div className="user-info">
                                    <img src="/images/user-avatar.svg" alt="user-avatar" className="user-avatar" />
                                    <span>Nguyễn Văn A</span>
                                </div>
                            </td>
                            <td>email@example.com</td>
                            <td>0901234567</td>
                            <td>Nam</td>
                            <td>01/01/1990</td>
                            <td><a href="https://facebook.com">Facebook Link</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}
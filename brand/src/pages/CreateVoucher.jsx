import React, { useState } from "react";
import "../styles/common.css";
import "../styles/input.css";

export default function CreateVoucher() {
    const [start, setStart] = useState('');
    
    return (
        <div className="ctn">
            {/* Voucher img */}
            <div className="event-img-ctn">
                <img src="/images/image 41.png" alt="event-img" className="event-img" />
                <div className="event-btn-ctn">
                    <button className="event-upload-btn"> {/* Button giả */}
                        <img src="/icons/camera-plus.svg" alt="upload-img" />
                        Chọn ảnh
                    </button> 
                    <input type="file" id="file-upload" />
                </div>
            </div>

            <div className='input-ctn'>
                <h6>Thông tin sự kiện</h6>

                {/* Tên */}
                <div className='form-row'>
                    <div className="form-group">
                        <label id="name">Tên voucher</label>
                        <input type="text" placeholder="Nhập tên sự kiện" required/>
                    </div>
                </div>

                {/* Điều khoản */}
                <div className='form-row'>
                    <div className="form-group">
                        <label>Điều khoản áp dụng</label>
                        <textarea placeholder="Mô tả sự kiện" maxLength="500"required ></textarea>
                    </div>
                </div>

                {/* Hạn sử dụng */}
                <div className='form-row'>
                    <div className="row-input">
                        <label style={{ fontFamily: 'semibold-font', fontSize: '14px', marginBottom: '4px'}}>Ngày bắt đầu</label>
                        <input type="datetime-local" placeholder="Chọn ngày hết hạn" required/>
                    </div>
                </div>

                <div className='form-row'>
                    {/* Đổi bằng */}
                    <div className="form-group">
                        <label>Đổi bằng (xu)</label>
                        <input type="number" />
                    </div>
                    {/* Giá trị */}
                    <div className="form-group">
                        <label>Giá trị</label>
                        <input type="number" />
                    </div>
                </div>


            </div>
        </div>
    )
}
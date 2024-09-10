import React, { useState } from 'react';
import "../styles/common.css";
import "../styles/input.css";

export default function CreateEvent() {
    // Dropdown voucher
    const [selectedOption, setSelectedOption] = useState('');

    const handleOption = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div className="ctn">
            {/* Event img */}
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

                {/* Name */}
                <div className='form-row'>
                    <div className="form-group">
                        <label htmlFor="name">Tên sự kiện</label>
                        <input type="text" id="name" placeholder="Nhập tên đăng nhập" />
                    </div>
                </div>

                {/* Description */}
                <div className='form-row'>
                    <div className="form-group">
                        <label htmlFor="description">Mô tả</label>
                        <textarea id="description" placeholder="Mô tả sự kiện" maxLength="500"></textarea>
                    </div>
                </div>

                {/* Date time */}
                <div className='form-row'>
                    <div className="row-input">
                        <label htmlFor="start_datetime">Ngày bắt đầu</label>
                        <input type="datetime-local" id="start_datetime" placeholder="Chọn ngày bắt đầu" />
                    </div>
                    <div className="row-input">
                        <label htmlFor="end_datetime">Ngày kết thúc</label>
                        <input type="datetime-local" id="end_datetime" placeholder="Chọn ngày bắt đầu" />
                    </div>
                </div>

                {/* Voucher */}
                <div className='form-row'>
                    <div className="row-input">
                        <select className="field-select"
                                value={selectedOption}
                                onChange={handleOption}
                                label="Chọn voucher">
                            <option value="">Chọn voucher</option>
                            <option value="voucher">Tên voucher</option>
                        </select>
                    </div>
                    <div className="row-input">
                        <input type="range" />
                    </div>
                </div>

            </div>

        </div>
    );
}
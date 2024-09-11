import React, { useState } from 'react';
import "../styles/common.css";
import "../styles/input.css";

export default function EditEvent() {
    
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
                        <label id="name">Tên sự kiện</label>
                        <input type="text" id="name" placeholder="Nhập tên đăng nhập" required value={name} onChange={(e) => {setName(e.target.value)}}/>
                    </div>
                </div>

                {/* Description */}
                <div className='form-row'>
                    <div className="form-group">
                        <label id="description">Mô tả</label>
                        <textarea id="description" placeholder="Mô tả sự kiện" maxLength="500"required value={description} onChange={(e) => {setDescription(e.target.value)}}></textarea>
                    </div>
                </div>

                {/* Date time */}
                <div className='form-row'>
                    <div className="row-input">
                        <label id="start_datetime" style={{ fontFamily: 'semibold-font', fontSize: '14px', marginBottom: '4px'}}>Ngày bắt đầu</label>
                        <input type="datetime-local" id="start_datetime" placeholder="Chọn ngày bắt đầu" required value={start} onChange={(e) => {setStart(e.target.value)}}/>
                    </div>
                    <div className="row-input">
                        <label id="end_datetime" style={{ fontFamily: 'semibold-font', fontSize: '14px', marginBottom: '4px'}}>Ngày kết thúc</label>
                        <input type="datetime-local" id="end_datetime" placeholder="Chọn ngày bắt đầu" required value={end} onChange={(e) => {setEnd(e.target.value)}}/>
                    </div>
                </div>

                {/* Max Voucher */}
                <div className='form-row'>
                    <div className="row-input">
                        <label id="id_voucher" style={{ fontFamily: 'semibold-font', fontSize: '14px', marginBottom: '4px'}}>Chọn voucher</label>
                        <select className="field-select"
                                value={selectedOption}
                                onChange={handleOption}
                                label="Chọn voucher">
                            <option value="">Chọn voucher</option>
                            <option value="voucher">
                                <img src="/images/image 41.png" className="voucher-thumb"/>
                                Tên voucher
                            </option>
                        </select>
                    </div>

                    <div className="row-input">
                        <label id="max_amount_voucher" style={{ fontFamily: 'semibold-font', fontSize: '14px', marginBottom: '4px'}}>Số lượng</label>
                        <input type="number" required value={amount} onChange={(e) => {setAmount(e.target.value)}}/>
                    </div>
                </div>

                {/* Budget */}
                <div className='form-row'>
                    <div className="form-group">
                        <label>Ngân sách</label>
                        <input type="number" /> {/* Lấy số lượng x price voucher */}
                    </div>
                </div>

                {/* Given Vouchers */}
                <div className='form-row'>
                    <div className='form-group'>
                        <label>Voucher đã phát</label>
                        <input  type="number" 
                                value="Số lượng voucher đã phát sẽ được thống kê khi sự kiện diễn ra" 
                                readOnly/> 
                    </div>
                </div>

                {/* Game */}
                <div className='form-row'>
                    <div className='form-group'>
                        <label>Trò chơi</label>
                        <div className='radio-group'>
                            <input type="radio" value="Trắc nghiệm" id="quiz" onChange={((e) => { onTypeChanged(e) })} checked/>
                            <label style={{ fontSize: '16px', fontFamily: 'regular-font'}}>Trắc nghiệm</label>

                            <input type="radio" value="Lắc vật phẩm" id="shake" onChange={((e) => { onTypeChanged(e) })}/>
                            <label style={{ fontSize: '16px', fontFamily: 'regular-font'}}>Lắc vật phẩm</label>
                        </div>
                    </div>
                </div>
                
                {/* Buttons */}
                <div className="button-group">
                    <button className="cancel-btn" onClick={() => {navigate('/event')}}>Hủy</button>
                    <button className="save-btn" onClick={onNext}>Tiếp theo</button>
                </div>

            </div>

        </div>
    )
}
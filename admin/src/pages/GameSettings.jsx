import React from "react";
import "../styles/common.css";
import "../styles/input.css";

export default function GameSettings() {

    return (
        <div className="ctn">
            <div className="input-ctn">
                <h6>Thiết lập quiz</h6>
                
                <div className="form-row">
                    <select className="field-select"
                            label="Loại trò chơi">
                            <option value="">Chọn</option>
                            <option value="">Trắc nghiệm</option>
                            <option value="">Lắc vật phẩm</option>
                            {/* {vouchers.map((voucher) => (
                                <option key={voucher._id} value={voucher._id}>
                                    {voucher.name}
                                </option>
                            ))} */}
                    </select>
                </div>

                <div className="form-row">
                    <div className="row-input">
                        <label style={{ fontFamily: 'semibold-font', fontSize: '14px', marginBottom: '4px'}}>Số lượng câu hỏi</label>
                        <input type="number" value="10"></input>
                    </div>
                    <div className="row-input">
                        <label style={{ fontFamily: 'semibold-font', fontSize: '14px', marginBottom: '4px'}}>Số xu thưởng</label>
                        <input type="number" value="100"></input>
                    </div>
                </div>

                <div className="form-row">
                    <div className="row-input">
                        <label style={{ fontFamily: 'semibold-font', fontSize: '14px', marginBottom: '4px'}}>Số mảnh ghép</label>
                        <input type="number" value="2"></input>
                    </div>
                    <div className="row-input">
                        <label style={{ fontFamily: 'semibold-font', fontSize: '14px', marginBottom: '4px'}}>Voucher thưởng</label>
                        <input type="number" value="1"></input> 
                    </div>
                </div>

                {/* Buttons */}
                <div className="button-group">
                    <button className="cancel-btn" onClick={() => {navigate('/game')}}>Hủy</button>
                    <button className="save-btn">Lưu</button>
                </div>

            </div>
        </div>
    )
}
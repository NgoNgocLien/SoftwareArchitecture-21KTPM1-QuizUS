import React, { useState } from "react";
import "../styles/common.css";
import "../styles/input.css";

export default function CreateShake() {
    
    return (
        <div className="ctn">
            <div className="input-ctn">
                <h6>Lắc vật phẩm</h6>
                <p>Người chơi cần thu thập đủ 2 mảnh ghép để đổi 1 voucher của nhãn hàng.</p>
                <div className="form-row">
                    {/* Vật phẩm 1 */}
                    <div className="form-group" style={{ flex: '1'}}>
                        <label>Vật phẩm 1</label>
                        <input type="file"/>
                        <img src="" alt="item1_photo" className="item-img" />
                    </div>

                    {/* Vật phẩm 2 */}
                    <div className="form-group" style={{ flex: '1'}}>
                        <label>Vật phẩm 2</label>
                        <input type="file" />
                        <img src="" alt="item2_photo" className="item-img" />
                    </div>
                </div>

                {/* Buttons */}
                <div className="button-group" >
                        <button className="cancel-btn">Hủy</button>
                        <button className="save-btn">Lưu</button>
                    </div>
            </div>
        </div>
    )
}
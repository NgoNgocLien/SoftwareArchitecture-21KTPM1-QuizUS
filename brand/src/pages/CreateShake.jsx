import React, { useState } from "react";
import "../styles/common.css";
import "../styles/input.css";
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { createEvent } from "../api/campaignApi"; 

export default function CreateShake() {
    const storedBrand = localStorage.getItem('brand');
    const brand = storedBrand ? JSON.parse(storedBrand) : null;
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [item1, setItem1] = useState('');
    const [item2, setItem2] = useState('');

    // Hàm xử lý khi submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const campaign = {
           name: searchParams.get('name'),
           description: searchParams.get('description'),
           start_datetime: searchParams.get('start'),
           end_datetime: searchParams.get('end'),
           max_amount_voucher: searchParams.get('amount'),
           given_amount_voucher: 0,
           id_brand1: brand?.id_brand || 1,
           budget: searchParams.get('budget'),
           id_voucher: searchParams.get('id_voucher'),
           item1_photo: item1 || '',
           item2_photo: item2 || '',
        }
        const success = await createEvent(campaign, {});

        if (success) {
            confirmAlert({
                message: 'Tạo sự kiện thành công!',
                buttons: [
                    {
                        label: 'Xác nhận',
                        onClick: () => {
                            navigate(`/event`);
                        }
                    }
                ]
            });
        }
        else {
            confirmAlert({
                message: 'Tạo sự kiện thất bại!',
                buttons: [
                    {
                        label: 'Xác nhận'
                    }
                ]
            });
        }
    };

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
                        <button className="cancel-btn" onClick={() => {navigate('/create-event')}}>Hủy</button>
                        <button className="save-btn" onClick={handleSubmit}>Lưu</button>
                    </div>
            </div>
        </div>
    )
}
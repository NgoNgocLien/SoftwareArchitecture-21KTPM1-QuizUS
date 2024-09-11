import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/common.css";
import "../styles/input.css";
import { getGameById } from '../api/gameApi';

export default function GameSettings() {
    const { id_game } = useParams();
    const navigate = useNavigate();

    const [field, setField] = useState('');

    useEffect(() => {
        const getData = async () => {
            const data = await getGameById(id_game);

            console.log(data)
            if (data) {
                setField(data.name || '');
            }
        }
        getData();
    }, [id_game]);

    return (
        <div className="ctn">
            <div className="input-ctn">
                <h6>Thiết lập quiz</h6>
                
                <div className="form-row">
                    <div className="row-input" style={{ width: '100%'}}>
                        <label style={{ fontSize: '14px'}}>Chọn loại trò chơi</label>
                        <select className="field-select" value={field} onChange={(e) => {setField(e.target.value)}}>
                                <option value="Trắc nghiệm">Trắc nghiệm</option>
                                <option value="Lắc vật phẩm">Lắc vật phẩm</option>
                                {/* {vouchers.map((voucher) => (
                                    <option key={voucher._id} value={voucher._id}>
                                        {voucher.name}
                                    </option>
                                ))} */}
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group" style={{width: '100%'}}>
                        <label style={{ fontFamily: 'semibold-font', fontSize: '14px', marginBottom: '4px'}}>Số lượng câu hỏi</label>
                        <input type="number" style={{width: '100%', boxSizing: 'border-box', fontSize: '16px'}} value="10"></input>
                    </div>
                </div>

                <div className='form-row'>
                    <div className="form-group" style={{width: '100%'}}>
                        <label style={{ fontFamily: 'semibold-font', fontSize: '14px', marginBottom: '4px'}}>Số xu thưởng</label>
                        <input type="number" style={{width: '100%', boxSizing: 'border-box', fontSize: '16px'}} value="100"></input>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label style={{ fontFamily: 'semibold-font', fontSize: '14px', marginBottom: '4px'}}>Số mảnh ghép</label>
                        <input type="number" style={{width: '100%', boxSizing: 'border-box', fontSize: '16px'}} value="2"></input>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label style={{ fontFamily: 'semibold-font', fontSize: '14px', marginBottom: '4px'}}>Số loại voucher</label>
                        <input type="number" style={{width: '100%', boxSizing: 'border-box', fontSize: '16px'}} value="1"></input>
                    </div>
                </div>

                {/* Buttons */}
                <div className="button-group">
                    <button className="cancel-btn" onClick={() => {navigate('/game')}}>Hủy</button>
                    <button className="save-btn">Lưu</button>
                </div>

            </div>
        </div>
    );
}
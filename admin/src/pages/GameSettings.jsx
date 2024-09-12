import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/common.css";
import "../styles/input.css";
import { getGameById, updateGame } from '../api/gameApi';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

export default function GameSettings() {
    const { id_game } = useParams();
    const navigate = useNavigate();

    const [field, setField] = useState('');
    const [award, setAward] = useState('');
    const [question, setQuestion] = useState('');
    const [voucher, setVoucher] = useState('');

    useEffect(() => {
        const getData = async () => {
            const data = await getGameById(id_game);

            console.log(data)
            if (data) {
                setField(data.name || '');
                if(data.name == "Trắc nghiệm")
                    setAward("Xu thưởng")
                else
                    setAward("Mảnh ghép")
                setQuestion("10");
                setVoucher("1");
            }
        }
        getData();
    }, [id_game]);

    const onSave = async () => {
        let updatedData = {
            id_game,
            name: field
        }
        
        let success = await updateGame(updatedData);
        if (success) {
            confirmAlert({
                message: 'Chỉnh sửa trò chơi thành công!',
                buttons: [
                    {
                        label: 'Xác nhận',
                        onClick: () => {
                            navigate(`/game`);
                        }
                    }
                ]
            });
        }
        else {
            confirmAlert({
                message: 'Chỉnh sửa trò chơi thất bại!',
                buttons: [
                    {
                        label: 'Xác nhận'
                    }
                ]
            });
        }
    }

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
                        <input type="number" style={{width: '100%', boxSizing: 'border-box', fontSize: '16px'}} value={question} onChange={(e) => {setQuestion(e.target.value)}}></input>
                    </div>
                </div>

                {/* <div className='form-row'>
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
                </div> */}
                <div className="form-row" style={{ width: '30%'}}>
                    <label style={{ fontFamily: 'semibold-font', fontSize: '14px', marginBottom: '4px'}}>Phần thưởng</label>
                    <input type="checkbox" style={{ height: '18px', width: '18px', margin: '0'}} checked={award === "Xu thưởng"} onChange={(e) => {setAward(e.target.value)}}/>
                    <label style={{ margin: '0'}}>Xu thưởng</label>
                    <input type="checkbox" style={{ height: '18px', width: '18px', margin: '0'}} checked={award === "Mảnh ghép"} onChange={(e) => {setAward(e.target.value)}}/>
                    <label style={{ margin: '0'}}>Mảnh ghép</label>
                </div>
                
                

                <div className="form-row">
                    <div className="form-group">
                        <label style={{ fontFamily: 'semibold-font', fontSize: '14px', marginBottom: '4px'}}>Số loại voucher</label>
                        <input type="number" style={{width: '100%', boxSizing: 'border-box', fontSize: '16px'}} readOnly value={voucher} onChange={(e) => {setVoucher(e.target.value)}}></input>
                    </div>
                </div>

                {/* Buttons */}
                <div className="button-group">
                    <button className="cancel-btn" onClick={() => {navigate('/game')}}>Hủy</button>
                    <button className="save-btn" onClick={() => {onSave()}}>Lưu</button>
                </div>

            </div>
        </div>
    );
}
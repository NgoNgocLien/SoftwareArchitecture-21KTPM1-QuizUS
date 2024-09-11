import React, { useState, useEffect } from 'react';
import "../styles/common.css";
import "../styles/input.css";
import { useNavigate, useParams } from 'react-router-dom';
import { getCampaignById, updateCampaign } from '../api/campaignApi';
import { getAll } from '../api/voucherApi';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

export default function EditEvent() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [amount, setAmount] = useState('0');
    const [gameType, setGameType] = useState('Trắc nghiệm');
    const [vouchers, setVouchers] = useState([]);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [budget, setBudget] = useState(0);

    // Fetch events
    useEffect(() => {
        const fetchEvent = async () => {
            const data = await getCampaignById(id);
            console.log(data);
            if (data) {
                setName(data.name);
                setDescription(data.description);
                setStart(data.start);
                setEnd(data.end); 
                setAmount(data.amount);
                setGameType(data.gameType);
                setSelectedVoucher(data.selectedVoucher);
            }
        };

        const fetchVouchers = async () => {
            const brand = JSON.parse(localStorage.getItem('brand'));
            const voucherData = await getAll(brand?.id_brand);
            setVouchers(voucherData);
            console.log(voucherData);
        };

        fetchEvent();
        fetchVouchers();
    }, [id]);
    
    // Calculate budget
    useEffect(() => {
        if (selectedVoucher && amount) {
            setBudget(selectedVoucher.price * amount);
        }
    }, [selectedVoucher, amount]);

    const handleVoucherChange = (e) => {
        const selectedId = e.target.value;
        setSelectedVoucher(vouchers.find(voucher => voucher._id === selectedId));
    };

    const onSave = async () => {
        const updatedEvent = {
            name,
            description,
            start, 
            end,
            amount,
            gameType,
            selectedVoucher
        };

        const success = await updateCampaign(id, updatedEvent);
        if (success) {
            confirmAlert({
                message: 'Sự kiện đã được cập nhật thành công!',
                buttons: [{ label: 'Xác nhận', onClick: () => navigate('/event') }]
            });
        } else {
            confirmAlert({
                message: 'Cập nhật sự kiện thất bại!',
                buttons: [{ label: 'Xác nhận' }]
            });
        }
    };

    const onCancel = () => navigate('/event');

    return (
        <div className="ctn">
            {/* Event Image */}
            <div className="event-img-ctn">
                <img src="/images/image 41.png" alt="event-img" className="event-img" />
                <div className="event-btn-ctn">
                    <button className="event-upload-btn">
                        <img src="/icons/camera-plus.svg" alt="upload-img" />
                        Chọn ảnh
                    </button>
                    <input type="file" id="file-upload" />
                </div>
            </div>

            <div className='input-ctn'>
                <h6>Thông tin sự kiện</h6>

                {/* Name */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="name">Tên sự kiện</label>
                        <input type="text" id="name" value={name} placeholder="Nhập tên sự kiện" onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>

                {/* Description */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="description">Mô tả</label>
                        <textarea id="description" value={description} placeholder="Mô tả sự kiện" maxLength="500" onChange={(e) => setDescription(e.target.value)} />
                    </div>
                </div>

                {/* Date Time */}
                <div className="form-row">
                    <div className="row-input">
                        <label htmlFor="start_datetime">Ngày bắt đầu</label>
                        <input type="datetime-local" id="start_datetime" value={start} onChange={(e) => setStart(e.target.value)} />
                    </div>
                    <div className="row-input">
                        <label htmlFor="end_datetime">Ngày kết thúc</label>
                        <input type="datetime-local" id="end_datetime" value={end} onChange={(e) => setEnd(e.target.value)} />
                    </div>
                </div>

                {/* Vouchers */}
                <div className="form-row">
                    <div className="row-input">
                        <label htmlFor="id_voucher">Chọn voucher</label>
                        <select value={selectedVoucher?._id} onChange={handleVoucherChange}>
                            <option value="">Chọn voucher</option>
                            {vouchers.map(voucher => (
                                <option key={voucher._id} value={voucher._id}>{voucher.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="row-input">
                        <label>Số lượng</label>
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                </div>

                {/* Budget */}
                <div className="form-row">
                    <div className="form-group">
                        <label>Ngân sách</label>
                        <input type="number" value={budget} readOnly />
                    </div>
                </div>

                {/* Game Type */}
                <div className="form-row">
                    <div className="form-group">
                        <label>Trò chơi</label>
                        <div className="radio-group">
                            <input type="radio" value="Trắc nghiệm" id="quiz" onChange={() => setGameType('Trắc nghiệm')} checked={gameType === 'Trắc nghiệm'} />
                            <label htmlFor="quiz">Trắc nghiệm</label>

                            <input type="radio" value="Lắc vật phẩm" id="shake" onChange={() => setGameType('Lắc vật phẩm')} checked={gameType === 'Lắc vật phẩm'} />
                            <label htmlFor="shake">Lắc vật phẩm</label>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="button-group">
                    <button className="cancel-btn" onClick={onCancel}>Hủy</button>
                    <button className="save-btn" onClick={onSave}>Lưu</button>
                </div>
            </div>
        </div>
    );
}
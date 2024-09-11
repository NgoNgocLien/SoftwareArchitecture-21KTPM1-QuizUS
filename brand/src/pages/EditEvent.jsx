import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/common.css";
import "../styles/input.css";
import { getCampaignById, updateCampaign } from '../api/campaignApi';
import { getAll } from '../api/voucherApi';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { getVoucherById } from '../api/voucherApi';
import { uploadImgToCloudinary } from '../api/cloudinary';

export default function EditEvent() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [amount, setAmount] = useState('');
    const [gameType, setGameType] = useState('Trắc nghiệm');
    const [vouchers, setVouchers] = useState([]);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [budget, setBudget] = useState(0);
    const [avatar, setAvatar] = useState('');
    const [avatarFile, setAvatarFile] = useState(null);
    const [photo, setPhoto] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    // Fetch event
    useEffect(() => {
        const fetchEvent = async () => {
            const  event = await getCampaignById(id);
            setName(event?.name);
            setDescription(event?.description);
            setStart(event?.start_datetime);
            setEnd(event?.end_datetime);
            setAmount(event?.max_amount_voucher);
            setPhoto(event?.photo);
            setGameType(event?.gameType);
            setSelectedOption(event?.id_voucher);
        };

        fetchEvent();
    }, [id]);

    // Fetch all vouchers
    useEffect(() => {
        const storeBrand = localStorage.getItem('brand');
        const brand = storeBrand ? JSON.parse(storeBrand) : null;
        const fetchVouchers = async () => {
            const voucherData = await getAll(brand?.id_brand || 1);
            setVouchers(voucherData); 
        };

        fetchVouchers();
    }, []);

    const handleOption = (e) => {
        const selectedVoucherId = e.target.value;
        setSelectedOption(selectedVoucherId);
        
        const voucher = vouchers.find(voucher => voucher._id === selectedVoucherId);
        setSelectedVoucher(voucher);
    };

    // Calculate budget
    useEffect(() => {
        if (selectedVoucher && amount) {
            setBudget(selectedVoucher.price * amount);
        }
    }, [selectedVoucher, amount]);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];

        setAvatarFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatar(reader.result); 
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };
        
    // Save the updated event
    const onSave = async () => {
        var imageUrl;
        if (avatarFile) {
            try {
                imageUrl = await uploadImgToCloudinary(avatarFile);

                if (imageUrl) {
                    console.log('imageUrl:', imageUrl);
                } else {
                    console.error('Failed to upload image');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }

        const updatedEvent = {
            _id: id,
            name,
            description,
            start_datetime: start,
            end_datetime: end,
            photo: imageUrl || photo, 
            max_amount_voucher: amount,
            selectedVoucher: selectedVoucher?._id || null,
            budget,
            id_voucher: selectedOption
        };

        const success = await updateCampaign(updatedEvent);
        if (success) {
            confirmAlert({
                message: 'Sự kiện đã được cập nhật thành công!',
                buttons: [{ label: 'Xác nhận', 
                    onClick: () => navigate('/event') 
                }]
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
                <img src={avatar || photo || "/images/image 41.png"} alt="event-img" className="event-img" />
                <div className="event-btn-ctn">
                    <button className="event-upload-btn">
                        <img src="/icons/camera-plus.svg" alt="upload-img" />
                        Chọn ảnh
                    </button>
                    <input type="file" id="file-upload"  accept="image/*" onChange={handleAvatarChange}/>
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
                        <input type="datetime-local" id="start_datetime" value={start.slice(0, 16)} onChange={(e) => setStart(e.target.value)} />
                    </div>
                    <div className="row-input">
                        <label htmlFor="end_datetime">Ngày kết thúc</label>
                        <input type="datetime-local" id="end_datetime" value={end.slice(0, 16)} onChange={(e) => setEnd(e.target.value)} />
                    </div>
                </div>

                {/* Vouchers */}
                <div className="form-row">
                    <div className="row-input">
                        <label htmlFor="id_voucher">Chọn voucher</label>
                        <select className="field-select"
                                value={selectedOption}
                                onChange={handleOption}
                                label="Chọn voucher">
                            <option value="">Chọn voucher</option>
                            {vouchers.map((voucher) => (
                                <option key={voucher._id} value={voucher._id}>
                                    {voucher.name}
                                </option>
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
                {/* <div className="form-row">
                    <div className="form-group">
                        <label>Trò chơi</label>
                        <div className="radio-group">
                            <input type="radio" value={gameType} id="quiz" onChange={(e) => setGameType(e.target.value)} checked={gameType === 'Trắc nghiệm'} />
                            <label htmlFor="quiz">Trắc nghiệm</label>

                            <input type="radio" value={gameType} id="shake" onChange={(e) => setGameType(e.target.value)} checked={gameType === 'Lắc vật phẩm'} />
                            <label htmlFor="shake">Lắc vật phẩm</label>
                        </div>
                    </div>
                </div> */}

                {/* Buttons */}
                <div className="button-group">
                    <button className="cancel-btn" onClick={onCancel}>Hủy</button>
                    <button className="save-btn" onClick={onSave}>Lưu</button>
                </div>
            </div>
        </div>
    );
}
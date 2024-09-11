import React, { useState, useEffect } from 'react';
import "../styles/common.css";
import "../styles/input.css";
import { useNavigate } from 'react-router-dom';
import { getAll } from '../api/voucherApi';
import { uploadImgToCloudinary } from '../api/cloudinary';

export default function CreateEvent() {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [amount, setAmount] = useState('0');
    const [gameType, setGameType] = useState('Trắc nghiệm');
    const [vouchers, setVouchers] = useState([]);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [budget, setBudget] = useState(0);
    const [avatar, setAvatar] = useState('');
    const [photo, setPhoto] = useState('');
    const [avatarFile, setAvatarFile] = useState(null);


    const onNext = async () => {
        var imageUrl;
        if (avatarFile) {
            try {
                imageUrl = await uploadImgToCloudinary(avatarFile);

                if (imageUrl) {
                    console.log('imageUrl:', imageUrl);
                    setPhoto(imageUrl);
                } else {
                    console.error('Failed to upload image');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
        const prefix = gameType === 'Trắc nghiệm' ? '/create-game' : '/create-shake';
        const url = `${prefix}?name=${name}&description=${description}&start=${start}&end=${start}&amount=${amount}&budget=${budget}&id_voucher=${selectedVoucher?._id || ""}&photo=${imageUrl}`
        navigate(url);
    }

    const onTypeChanged = (e) => {
        setGameType(e.currentTarget.value);
    }

    const handleOption = (e) => {
        const selectedVoucherId = e.target.value;
        setSelectedOption(selectedVoucherId);
        
        const voucher = vouchers.find(voucher => voucher._id === selectedVoucherId);
        setSelectedVoucher(voucher);
    };

    // Get voucher name
    useEffect(() => {
        const storeBrand = localStorage.getItem('brand');
        const brand = storeBrand ? JSON.parse(storeBrand) : null;
        const fetchVouchers = async () => {
            const voucherData = await getAll(brand?.id_brand || 1);
            setVouchers(voucherData); 
        };

        fetchVouchers();
    }, []);

    // Calculate budget
    useEffect(() => {
        if (selectedVoucher && amount) {
            setBudget(selectedVoucher.price * amount);
        }
    }, [selectedVoucher, amount]);

    const onSave = async () => {
        const Event = {
            name,
            description,
            start,
            end,
            amount,
            gameType,
            selectedVoucher: selectedVoucher?._id || null,
            budget
        };
    };

    const onCancel = () => navigate('/event');

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

    return (
        <div className="ctn">
            {/* Event img */}
            <div className="event-img-ctn">
                <img src={avatar?.length > 0 ? avatar : "/images/image 41.png"} alt="event-img" className="event-img" />
                <div className="event-btn-ctn">
                    <button className="event-upload-btn"> {/* Button giả */}
                        <img src="/icons/camera-plus.svg" alt="upload-img" />
                        Chọn ảnh
                    </button> 
                    <input type="file" id="file-upload"  accept="image/*" onChange={handleAvatarChange}/>
                </div>
            </div>

            <div className='input-ctn'>
                <h6>Thông tin sự kiện</h6>

                {/* Name */}
                <div className='form-row'>
                    <div className="form-group">
                        <label id="name">Tên sự kiện</label>
                        <input type="text" id="name" placeholder="Nhập tên sự kiện" required value={name} onChange={(e) => {setName(e.target.value)}}/>
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
                            {vouchers.map((voucher) => (
                                <option key={voucher._id} value={voucher._id}>
                                    {voucher.name}
                                </option>
                            ))}
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
                        <input  type="number"
                                value={budget}
                                readOnly
                        />
                    </div>
                </div>

                {/* Given Vouchers */}
                <div className='form-row'>
                    <div className='form-group'>
                        <label>Voucher đã phát</label>
                        <input  type="number"  
                                readOnly/> 
                    </div>
                </div>

                {/* Game */}
                <div className='form-row'>
                    <div className='form-group'>
                        <label>Trò chơi</label>
                        <div className='radio-group'>
                            <input name="game_type" type="radio" value="Trắc nghiệm" id="quiz" onChange={((e) => { onTypeChanged(e) })} checked/>
                            <label style={{ fontSize: '16px', fontFamily: 'regular-font'}}>Trắc nghiệm</label>

                            <input name="game_type" type="radio" value="Lắc" id="shake" onChange={((e) => { onTypeChanged(e) })}/>
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
    );
}
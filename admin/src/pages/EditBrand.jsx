import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBrandByID, uploadImgToCloudinary } from '../api/brandApi';
import "../styles/common.css";
import "../styles/input.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

export default function EditBrand() {
    const { id_brand } = useParams();
    const navigate =  useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    const [name, setName] = useState('');
    const [field, setField] = useState('');
    const [address, setAddress] = useState('');
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
    const [phone, setPhone] = useState('');

    const [isActive, setIsActive] = useState(false);

    const [logo, setLogo] = useState('');
    const [logoFile, setLogoFile] = useState(null);

    const onCancel  = () => {
        navigate(`/brand`);
    }

    useEffect(() => {
        const getData = async () => {
            const data = await getBrandByID(id_brand);

            console.log(data)
            if (data) {
                setUsername(data.username || '');
                setEmail(data.email || '');
                setPwd(data.pwd || '');

                setName(data.name || '');
                setField(data.field || '');
                setAddress(data.address || '');
                setLat(data.lat || '');
                setLong(data.long || '');
                setPhone(data.phone || '');
                
                setIsActive(data.is_active || false);
                setLogo(data.logo);
            }
        }
        getData();
    }, [id_brand]);

    const onSave = async () => {
        var imageUrl;
        if (logoFile) {
            try {
                imageUrl = await uploadImgToCloudinary(logoFile);

                if (imageUrl) {
                    console.log('imageUrl:', imageUrl);
                } else {
                    console.error('Failed to upload image');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }

        let updatedData = {
            id_brand,
            name,
            field,
            address,
            lat,
            long,
            username,
            pwd,
            phone,
            email,
            logo: imageUrl
        }
        
        // let success = await updatePlayer(updatedData);
        // if (success) {
        //     confirmAlert({
        //         message: 'Chỉnh sửa người dùng thành công!',
        //         buttons: [
        //             {
        //                 label: 'Xác nhận',
        //                 onClick: () => {
        //                     navigate(`/player`);
        //                 }
        //             }
        //         ]
        //     });
        // }
        // else {
        //     confirmAlert({
        //         message: 'Chỉnh sửa người dùng thất bại!',
        //         buttons: [
        //             {
        //                 label: 'Xác nhận'
        //             }
        //         ]
        //     });
        // }
    }

    const handleToggleActivation = async () => {
        if (isActive) {
            // Khóa tài khoản
            // let success = await deactivatePlayer(id);
            // if (success) {
            //     setIsActive(false); 
            //     confirmAlert({
            //         message: 'Tài khoản đã bị khóa!',
            //         buttons: [{ label: 'Xác nhận' }]
            //     });
            // } else {
            //     confirmAlert({
            //         message: 'Khóa tài khoản thất bại!',
            //         buttons: [{ label: 'Xác nhận' }]
            //     });
            // }
        } else {
            // Kích hoạt tài khoản
            // let success = await activatePlayer(id);
            // if (success) {
            //     setIsActive(true); 
            //     confirmAlert({
            //         message: 'Tài khoản đã được kích hoạt!',
            //         buttons: [{ label: 'Xác nhận' }]
            //     });
            // } else {
            //     confirmAlert({
            //         message: 'Kích hoạt tài khoản thất bại!',
            //         buttons: [{ label: 'Xác nhận' }]
            //     });
            // }
        }
    }

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        console.log("file: ", file)

        setLogoFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setLogo(reader.result); 
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return(
        <div className='ctn'>
            <div className='brand-logo-ctn'>
                <img src={logo?.length > 0 ? logo : "/images/placeholder-img.jpg"} alt="brand-logo" className='profile-avatar'/>
                <div className="upload-btn-ctn">
                    <button className="upload-btn">
                        <img src="/icons/camera-plus.svg" alt="upload-img" />
                        Chọn ảnh
                    </button> 
                    <input type="file" id="file-upload" accept="image/*" onChange={handleLogoChange}/> 
                </div>
            </div>
            
            <div className='input-ctn'>
                <h6>Thông tin đăng nhập</h6>
                <div className='form-row'>
                    <div className="form-group">
                        <label htmlFor="username">Tên đăng nhập</label>
                        <input type="text" id="username" placeholder="Nhập tên đăng nhập" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                    </div>
                </div>
                <div className='form-row'>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" placeholder="Nhập email nhãn hàng" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    </div>
                </div>
                <div className='form-row'>
                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu mới</label>
                        <input type="text" id="pwd" placeholder="Nhập mật khẩu mới" onChange={(e) => {setPwd(e.target.value)}}/>
                    </div>
                </div>

            </div>

            <div className='input-ctn'>
                <h6>Thông tin chung</h6>

                {/* Name & Field */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="brand-name">Tên nhãn hàng</label>
                        <input type="text" id="brand-name" placeholder="Nhập tên nhãn hàng" value={name} onChange={(e) => {setName(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="field">Lĩnh vực</label>
                        <select id="field" value={field} onChange={(e) => {setField(e.target.value)}}>
                            <option value="restaurant">Nhà hàng</option>
                            <option value="cafe">Cafe & Bánh</option>
                            <option value="shopping">Mua sắm</option>
                            <option value="entertainment">Giải trí</option>
                        </select>
                    </div>
                </div>

                {/* Address */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="address">Địa chỉ</label>
                        <input type="text" id="address" placeholder="Nhập địa chỉ" value={address} onChange={(e) => {setAddress(e.target.value)}}/>
                    </div>
                </div>

                {/* Phone */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="phone">Số điện thoại</label>
                        <input type="text" id="phone" placeholder="Nhập số điện thoại" value={phone} onChange={(e) => {setPhone(e.target.value)}}/>
                    </div>
                </div>

                {/* Buttons */}
                <div className="button-row">
                    <button className={isActive ? "lock-user" : "activate-user"} onClick={handleToggleActivation}>
                        {isActive ? 'Khóa tài khoản' : 'Kích hoạt tài khoản'}
                    </button>
                    <div className="button-group">
                        <button className="cancel-brand-btn" onClick={onCancel}>Hủy</button>
                        <button className="save-brand-btn" onClick={() => {onSave()}}>Lưu</button>
                    </div>
                </div>

            </div>
        </div>
    );
}
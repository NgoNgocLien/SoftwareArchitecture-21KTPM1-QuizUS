import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "../styles/common.css";
import "../styles/input.css";
import { getPlayerById, updatePlayer, deactivatePlayer, activatePlayer } from '../api/playerApi';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

export default function EditUser() {
    const { id } = useParams();
    const navigate =  useNavigate();

    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [facebook, setFacebook] = useState('');
    const [avatar, setAvatar] = useState('');
    const [isActive, setIsActive] = useState(false);

    const onCancel  = () => {
        navigate(`/player`);
    }

    useEffect(() => {
        const getData = async () => {
            const data = await getPlayerById(id);

            if (data) {
                setFullname(data.username || '');
                setEmail(data.email || '');
                setPhone(data.phone || '');
                setDob(data.dob || '');
                setGender(data.gender || '');
                setFacebook(data.facebook || '');
                setAvatar(data.avatar);
                setIsActive(data.is_active || false);
            }
        }
        getData();
    }, [id]);

    const onSave = async () => {
        let updatedData = {
            id_player: id,
            username: fullname,
            score: 0,
            email,
            phone,
            dob,
            gender,
            facebook,
            avatar
        }
        let success = await updatePlayer(updatedData);
        if (success) {
            confirmAlert({
                message: 'Chỉnh sửa người dùng thành công!',
                buttons: [
                    {
                        label: 'Xác nhận',
                        onClick: () => {
                            navigate(`/player`);
                        }
                    }
                ]
            });
        }
        else {
            confirmAlert({
                message: 'Chỉnh sửa người dùng thất bại!',
                buttons: [
                    {
                        label: 'Xác nhận'
                    }
                ]
            });
        }
    }

    const handleToggleActivation = async () => {
        if (isActive) {
            // Khóa tài khoản
            let success = await deactivatePlayer(id);
            if (success) {
                setIsActive(false); 
                confirmAlert({
                    message: 'Tài khoản đã bị khóa!',
                    buttons: [{ label: 'Xác nhận' }]
                });
            } else {
                confirmAlert({
                    message: 'Khóa tài khoản thất bại!',
                    buttons: [{ label: 'Xác nhận' }]
                });
            }
        } else {
            // Kích hoạt tài khoản
            let success = await activatePlayer(id);
            if (success) {
                setIsActive(true); 
                confirmAlert({
                    message: 'Tài khoản đã được kích hoạt!',
                    buttons: [{ label: 'Xác nhận' }]
                });
            } else {
                confirmAlert({
                    message: 'Kích hoạt tài khoản thất bại!',
                    buttons: [{ label: 'Xác nhận' }]
                });
            }
        }
    }

    return(
        <div className='ctn'>
            <div className='brand-logo-ctn'>
                <img src={avatar?.length > 0 ? avatar : '/icons/camera-plus.svg'} alt="brand-logo"  className='profile-avatar'/>
                <div className="upload-btn-ctn">
                    <button className="upload-btn"> {/* Button giả */}
                        <img src="/icons/camera-plus.svg" alt="upload-img" />
                        Chọn ảnh
                    </button> 
                    <input type="file" id="file-upload" /> {/* Code backend cho input này nha */}
                </div>
            </div>
            
            <div className='input-ctn'>
                <h6>Thông tin chung</h6>

                {/* Name */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="name">Họ tên</label>
                        <input type="text" id="name" placeholder="Họ tên" value={fullname} onChange={(e) => {setFullname(e.target.value)}}/>
                    </div>
                </div>

                {/* Email & Phone */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Số điện thoại</label>
                        <input type="text" id="phone" placeholder="Số điện thoại" value={phone} onChange={(e) => {setPhone(e.target.value)}}/>
                    </div>
                </div>

                {/* Birthday & Gender */}
                <div className="form-row">
                    <div className="form-group" style={{ flex: '1'}}>
                        <label >Sinh nhật</label>
                        <input type="text" id="birthday" placeholder="Sinh nhật" value={dob} onChange={(e) => {setDob(e.target.value)}}/>
                    </div>
                    
                    <div className='form-group' style={{ flex: '1'}}>
                        <label>Giới tính</label>
                        <div className='radio-group'>
                            <input type="radio" name="gender" id="nam" value="Nam" checked={gender === 'nam'} onChange={(e) => setGender(e.target.value)} />
                            <label htmlFor="nam">Nam</label>
                            <input type="radio" name="gender" id="nữ" value="Nữ" checked={gender === 'nữ'} onChange={(e) => setGender(e.target.value)} />
                            <label htmlFor="nữ">Nữ</label>
                        </div>
                    </div>
                    
                </div>

                {/* Facebook */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="website">Facebook</label>
                        <input type="url" id="website" placeholder="Link Facebook" value={facebook} onChange={(e) => {setFacebook(e.target.value)}}/>
                    </div>
                </div>
                
                
                {/* Buttons */}
                <div className="button-row">
                    <button className={isActive ? "lock-user" : "activate-user"} onClick={handleToggleActivation}>
                        {isActive ? 'Khóa tài khoản' : 'Kích hoạt tài khoản'}
                    </button>
                    <div className="button-group">
                        <button className="cancel-btn" onClick={onCancel}>Hủy</button>
                        <button className="save-btn" onClick={() => {onSave()}}>Lưu</button>
                    </div>
                </div>
                

            </div>
        </div>
    );
}
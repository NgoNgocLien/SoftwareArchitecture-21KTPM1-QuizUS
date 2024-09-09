import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Loading from '../components/system-feedback/Loading';

import "../styles/common.css";
import "../styles/signup.css";

export default function Signup(props) {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault()
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!fullname){
            alert("Fullname is empty. Please try again!!!");
            return;
        }
        if(password.length >= 8 && regex.test(email)){
            const user_signup = {
                fullname: fullname,
                email: email,
                password: password,
                //id_role: roleId
            };
            try {
                //const result = await dispatch(signupAction(user_signup));
                const result = "";
                if (result?.status === 200 && result?.data.message === "Signup successfully") {
                    setShowNotification(true);
                    setTimeout(() => setShowNotification(false), 2000); // Hide after 2 seconds
                }
                else{
                    alert("Email is existing");
                }
                
            } catch (error) {
                console.log("error", error.message);   
            }
        }
        else if (!regex.test(email)){
            alert("Email is invalid. Please try again!!!");
            return;
        }
        else if (password.length < 8){
            alert("Passwords is too short. Please try again!!!");
            return;
        }
        
        // Clear form fields after signup
        setFullname('');
        setEmail('');
        setPassword('');
    }

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/", { state: { signup: false, check: true } });
    };

    return (
        <div className="signup-brand-container">
            <div className="signup-form">
            {loading ? (
                    <Loading/>
                ):(
                    <>
                        <div>
                            <div className="navbar-brand-signup">
                                <img src="/images/logo-dark.png" alt="logo" width="113.82px" height="60px" className="align-self-center"/>
                                <br></br>
                            </div>
                            
                            <h5>Tạo tài khoản</h5>
                        </div>
                        
                        <form onSubmit={handleSignup}>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" placeholder="Nhập email của bạn" value={email} onChange={e => setEmail(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label>Mật khẩu</label>
                                <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}/>
                            </div>

                            <button type="submit" className="btn-sign-up">Đăng ký</button>
                        </form>

                        <div className="divider">
                            <span>Hoặc</span>
                        </div>

                        <button type="button" className="btn-sign-up-google">
                            <img src="https://res.cloudinary.com/dklt21uks/image/upload/v1725705052/dldlrna0zoe3qqkdehib.png" alt="google" style={{ marginRight: "10px" }}/>
                            Đăng ký với Google
                        </button>

                        <div className="sign-in">Đã có tài khoản? 
                            <span onClick={() => handleNavigate()} style={{color: "var(--scheme-primary)", cursor: "pointer", fontWeight: "600"}}> Đăng nhập</span>
                        </div>
                        
                        {showNotification && <div style={{color: "#004EEA", fontStyle: "italic", fontFamily: "medium-font", marginTop: "10px"}}>Tạo tài khoản thành công!</div>}
                    </>
                )}
            </div>
        </div>
    );
};
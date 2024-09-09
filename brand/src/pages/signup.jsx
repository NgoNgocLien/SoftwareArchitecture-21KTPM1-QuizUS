import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Loading from '../components/system-feedback/Loading';
import { signup } from '../api/brandApi.js';

import "../styles/common.css";
import "../styles/signup.css";

export default function Signup(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [signupFail, setSignupFail] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault()
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            setEmailError("Hãy nhập email của bạn!");
            return;
        }

        if(regex.test(email)){
            if (!password) {
                setEmailError("");
                setPasswordError("Hãy nhập mật khẩu của bạn!");
                return;
            }
            const brand_signup = {
                name: "",
                field: "",
                address: "",
                lat: "",
                long: "",
                username: "",
                pwd: password,
                phone: "",
                email: email,
                logo:""
            };
            setLoading(true);
            try {
                const result = await signup(brand_signup);
                console.log(result)
                if (result?.status === 200) {
                    setLoading(false);
                    setSignupSuccess(true);
                    setTimeout(() => setSignupSuccess(false), 2000);
                }
                else{
                    setLoading(false);
                    setSignupFail(true);
                    setTimeout(() => setSignupFail(false), 2000);
                }
                
            } catch (error) {
                console.log("error", error.message);   
            }
        }
        else if (!regex.test(email)){
            setEmailError("Email sai định dạng!");
            return;
        }
        
        setEmail('');
        setPassword('');
    }

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/");
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
                                {emailError && <div className="error-message" style={{ textAlign: "left", color: "red", fontStyle: "italic", fontSize: "14px", marginTop:"5px" }}>{emailError}</div>}
                            </div>
                            <div className="form-group">
                                <label>Mật khẩu</label>
                                <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}/>
                                {passwordError && <div className="error-message" style={{ textAlign: "left", color: "red", fontStyle: "italic", fontSize: "14px", marginTop:"5px" }}>{passwordError}</div>}
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

                        {signupSuccess && <div style={{color: "var(--feedback-success)", fontStyle: "italic", fontFamily: "medium-font", marginTop: "10px"}}>Tạo tài khoản thành công!</div>}
                        {signupFail && <div style={{ color: "var(--feedback-error)", fontStyle: "italic", fontFamily: "medium-font", marginTop: "10px" }}>Tạo thất bại!</div>}
                    </>
                )}
            </div>
        </div>
    );
};
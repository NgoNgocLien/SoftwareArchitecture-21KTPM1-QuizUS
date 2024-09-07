import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import "../styles/common.css";
import "../styles/signup.css";
//import { RoleKey } from "../util/config";

export default function Signup(props) {
    const dispatch = useDispatch();
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const [loading, setLoading] = useState(false);
    //const roleId = localStorage.getItem(RoleKey);
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
        <div className="signup-popup-overlay">
            <div className="signup-popup">
                <i className="fa-solid fa-xmark close-button" onClick={props.toggle}></i>
                <div>
                    <div className="navbar-brand-signup">
                        <img src="/images/logo.png" alt="logo" width="22" height="22" className="align-self-center"/>
                        <br></br>
                    </div>
                    
                    <h2>Create an account</h2>
                    <p>Welcome! Let's begin the journey with Xplore.</p>
                </div>
                
                <form onSubmit={handleSignup}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Nhập email của bạn" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}/>
                        <p className="hint">Must be at least 8 characters.</p>
                    </div>

                    {/* <div className="form-row">
                        <div className="checkbox">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Remember for 30 days</label>
                        </div>

                        <div className="forgot-password"><a href="#">Forgot password</a></div>
                    </div> */}

                    <button type="submit" className="btn-sign-up">Tạo tài khoản</button>
                </form>
                <button type="button" className="btn-sign-up-google">
                    <img src="/search.png" alt="google" style={{ marginRight: "10px" }}/>
                    Đăng ký bằng Google
                </button>

                <div className="sign-in">Đã có tài khoản? 
                    <span onClick={() => handleNavigate()} style={{color: "var(--scheme-primary)", cursor: "pointer", fontWeight: "600"}}> Đăng nhập</span>
                </div>
                {showNotification && <div style={{color: "#004EEA", fontStyle: "italic", fontFamily: "medium-font", marginTop: "10px"}}>Tạo tài khoản thành công!</div>}
            </div>
        </div>
    );
};
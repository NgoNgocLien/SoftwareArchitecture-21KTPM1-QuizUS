import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
//import { loginAction } from '../path/to/actions';
import Loading from '../components/system-feedback/Loading';
import "../styles/common.css";
import "../styles/login.css";

export default function Login(props) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()

        let isValid = true;

        setEmailError('');
        setPasswordError('');

        if (!email) {
            setEmailError("Hãy nhập email của bạn!");
            isValid = false;
        }

        if (!password) {
            setPasswordError("Hãy nhập mật khẩu của bạn!");
            isValid = false;
        }

        if(password.length < 8){
            setPasswordError("Mật khẩu quá ngắn. Thử lại!");
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        const user_login = {
            email: email,
            password: password
        };
        console.log("user_login: ", user_login);

        setLoading(true);
        try {
            //const result = await dispatch(loginAction(user_login));
            const result = "";
            if (result?.status === 200 && result?.data.message === "Đăng nhập thành công") {
                setLoading(false);
            } else {
                alert("Email hoặc mật khẩu sai!");
                setLoading(false);
                navigate("/");
            }
        } catch (error) {
            console.log("error", error.message);
        }
        
    }
    
    const handleNavigate = () => {
        navigate("/", { state: { signup: true, check: true } });
    };
      
    return (
        <div className="login-container">
            <div className="login-form">
                {loading ? (
                    <Loading/>
                ):(
                    <>
                        <div>
                            <div className="navbar-brand-login">
                                <img src="/images/logo-dark.png" alt="logo" width="113.82px" height="60px" className="align-self-center"/>
                            </div>
                            
                            <h5>Đăng nhập</h5>
                        </div>
                        
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" placeholder="Nhập email" value={email} onChange={e => setEmail(e.target.value)}/>
                                {emailError && <div className="error-message" style={{ textAlign: "left", color: "red", fontStyle: "italic", fontSize: "14px" }}>{emailError}</div>}
                            </div>
                            <div className="form-group">
                                <label>Mật khẩu</label>
                                <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}/>
                                {passwordError && <div className="error-message" style={{ textAlign: "left", color: "red", fontStyle: "italic", fontSize: "14px" }}>{passwordError}</div>}
                            </div>

                            <div className="form-row">
                                <div className="checkbox">
                                    <input type="checkbox" id="remember" />
                                    <label htmlFor="remember">Ghi nhớ đăng nhập</label>
                                </div>

                                <div className="forgot-password"><a href="#">Quên mật khẩu?</a></div>
                            </div>

                            <button type="submit" className="btn-sign-in">Đăng nhập</button>
                        </form>
                        <button type="button" className="btn-sign-in-google">
                            <img src="https://res.cloudinary.com/dklt21uks/image/upload/v1725705052/dldlrna0zoe3qqkdehib.png" alt="google"/>
                            Đăng nhập bằng Google
                        </button>

                        <div className="sign-up">Chưa có tài khoản? 
                            <span onClick={() => handleNavigate()} style={{color: "var(--scheme-primary)", cursor: "pointer", fontWeight: "600"}}> Tạo tài khoản</span>
                        </div>
                    </>
                )} 
            </div>
        </div>
    );
};
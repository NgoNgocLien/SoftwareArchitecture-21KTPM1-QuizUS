import "./Login.css"

export default function Login() {
    return (
        <div className="container">
            <div className="justify-content-center d-flex">
                <div className="col-4">
                    <div className="logo text-center">
                        <img src="/logo-svg.png" alt="Logo" width={100} height={50} />
                    </div>
                    <h1 className="h1 text-center login-title">Đăng nhập</h1>
                    <form >
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" id="email" placeholder="Nhập email" />
                        </div>
                        <div className="form-group">
                            <label>Mật khẩu</label>
                            <input type="password" id="password" placeholder="Nhập mật khẩu" />
                        </div>

                        <div className="form-row">
                            <div className="checkbox">
                                <input type="checkbox" id="remember" />
                                <label className="p3">Ghi nhớ đăng nhập</label>
                            </div>

                            <a href="#" className="text-scheme-primary link-sm">Quên mật khẩu</a>
                        </div>

                        <button type="submit" className="btn-md prim-btn btn-login button1">Đăng nhập</button>

                    </form>
                    <button type="button" className="btn-sign-in-google tert-btn button1 btn-md" >
                        <img src="/images/google.png" alt="google" style={{ marginRight: "10px" }} />
                        Đăng nhập với Google
                    </button>

                    <div className="text-center">Chưa có tài khoản?
                        <span className="link-sm"> Tạo tài khoản</span>
                    </div>

                </div>

            </div>
        </div>
    )
}
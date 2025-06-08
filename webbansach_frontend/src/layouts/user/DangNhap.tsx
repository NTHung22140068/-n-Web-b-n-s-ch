import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DangNhap = () => {
    const [tenDangNhap, setTenDangNhap] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8081/tai-khoan/dang-nhap', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tenDangNhap,
                    matKhau,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Dữ liệu nhận được từ API:', data);

                // Lưu token vào localStorage
                localStorage.setItem('token', data.token);

                // Chuẩn bị dữ liệu người dùng
                const userData = {
                    tenDangNhap: data.tenDangNhap || tenDangNhap,
                    hoTen: data.hoTen || '',
                    email: data.email || '',
                    role: data.role || 'USER'
                };

                // Lưu thông tin người dùng
                localStorage.setItem('userData', JSON.stringify(userData));
                console.log('Dữ liệu đã lưu vào localStorage:', userData);

                // Tạo event để thông báo đăng nhập thành công
                const loginEvent = new CustomEvent('loginSuccess', {
                    detail: userData
                });
                window.dispatchEvent(loginEvent);
                console.log('Đã gửi event loginSuccess với dữ liệu:', userData);

                // Chuyển hướng về trang chủ
                navigate('/');
            } else {
                const errorData = await response.text();
                console.error('Lỗi đăng nhập:', errorData);
                setError(errorData || 'Tên đăng nhập hoặc mật khẩu không chính xác');
            }
        } catch (error) {
            console.error('Lỗi kết nối:', error);
            setError('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 col-12">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Đăng Nhập</h2>
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="tenDangNhap" className="form-label">
                                        Tên đăng nhập
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="tenDangNhap"
                                        value={tenDangNhap}
                                        onChange={(e) => setTenDangNhap(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="matKhau" className="form-label">
                                        Mật khẩu
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="matKhau"
                                        value={matKhau}
                                        onChange={(e) => setMatKhau(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="d-grid gap-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Đang đăng nhập...
                                            </>
                                        ) : (
                                            'Đăng nhập'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DangNhap; 
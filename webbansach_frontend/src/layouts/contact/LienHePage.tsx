import React, { useState } from 'react';
import { Envelope, GeoAlt, Telephone } from 'react-bootstrap-icons';

const LienHePage = () => {
    const [formData, setFormData] = useState({
        hoTen: '',
        email: '',
        tieuDe: '',
        noiDung: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Xử lý gửi form ở đây
        console.log('Form data:', formData);
        // Reset form
        setFormData({
            hoTen: '',
            email: '',
            tieuDe: '',
            noiDung: ''
        });
        alert('Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể!');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="container py-5">
            <h1 className="text-center mb-5">Liên Hệ Với Chúng Tôi</h1>
            
            <div className="row">
                {/* Thông tin liên hệ */}
                <div className="col-md-4 mb-4 mb-md-0">
                    <div className="bg-light p-4 h-100">
                        <h3 className="mb-4">Thông Tin Liên Hệ</h3>
                        
                        <div className="mb-4">
                            <div className="d-flex align-items-center mb-2">
                                <GeoAlt className="me-2" size={20} />
                                <h5 className="mb-0">Địa Chỉ</h5>
                            </div>
                            <p className="mb-0">123 Đường ABC, Quận XYZ, TP.HCM</p>
                        </div>

                        <div className="mb-4">
                            <div className="d-flex align-items-center mb-2">
                                <Telephone className="me-2" size={20} />
                                <h5 className="mb-0">Điện Thoại</h5>
                            </div>
                            <p className="mb-0">0123 456 789</p>
                        </div>

                        <div>
                            <div className="d-flex align-items-center mb-2">
                                <Envelope className="me-2" size={20} />
                                <h5 className="mb-0">Email</h5>
                            </div>
                            <p className="mb-0">contact@hungstore.com</p>
                        </div>
                    </div>
                </div>

                {/* Form liên hệ */}
                <div className="col-md-8">
                    <div className="bg-light p-4">
                        <h3 className="mb-4">Gửi Tin Nhắn</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="hoTen" className="form-label">Họ và tên</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="hoTen"
                                    name="hoTen"
                                    value={formData.hoTen}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="tieuDe" className="form-label">Tiêu đề</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="tieuDe"
                                    name="tieuDe"
                                    value={formData.tieuDe}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="noiDung" className="form-label">Nội dung</label>
                                <textarea
                                    className="form-control"
                                    id="noiDung"
                                    name="noiDung"
                                    rows={5}
                                    value={formData.noiDung}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Gửi tin nhắn
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bản đồ */}
            <div className="mt-5">
                <h3 className="mb-4">Vị Trí Của Chúng Tôi</h3>
                <div className="ratio ratio-16x9">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4946681012374!2d106.65843937465223!3d10.773374359295461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ec3c161a3fb%3A0xef77cd47a1cc691e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBCw6FjaCBraG9hIC0gxJDhuqFpIGjhu41jIFF14buRYyBnaWEgVFAuSENN!5e0!3m2!1svi!2s!4v1709655645585!5m2!1svi!2s"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </div>
    );
};

export default LienHePage; 
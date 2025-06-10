import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { taoDonHang } from '../../api/DonHangApi';
import dinhDangSo from '../../utils/DinhDangSo';

interface SanPhamMua {
    maSach: number;
    tenSach: string;
    giaBan: number;
    soLuong: number;
}

const ThanhToan: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [sanPhamMua, setSanPhamMua] = useState<SanPhamMua[]>([]);
    const [tongTien, setTongTien] = useState(0);
    const [thongTinGiaoHang, setThongTinGiaoHang] = useState({
        hoTen: '',
        soDienThoai: '',
        diaChiGiaoHang: '',
        ghiChu: ''
    });
    const [dangXuLy, setDangXuLy] = useState(false);
    const [thongBao, setThongBao] = useState<string>('');

    useEffect(() => {
        const state = location.state as { sanPhamMua: SanPhamMua[] } | null;
        if (!state || !state.sanPhamMua) {
            navigate('/gio-hang');
            return;
        }
        setSanPhamMua(state.sanPhamMua);
        const tong = state.sanPhamMua.reduce((sum, item) => sum + item.giaBan * item.soLuong, 0);
        setTongTien(tong);

        // Lấy thông tin người dùng từ localStorage
        const userData = localStorage.getItem('userData');
        if (userData) {
            const user = JSON.parse(userData);
            setThongTinGiaoHang(prev => ({
                ...prev,
                hoTen: user.hoTen || '',
                soDienThoai: user.soDienThoai || '',
                diaChiGiaoHang: user.diaChiGiaoHang || ''
            }));
        }
    }, [location, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setThongTinGiaoHang(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setDangXuLy(true);
        
        try {
            const userData = localStorage.getItem('userData');
            if (!userData) {
                navigate('/dang-nhap');
                return;
            }
            
            const user = JSON.parse(userData);
            const donHang = {
                nguoiDung: { maNguoiDung: user.maNguoiDung },
                diaChiNhanHang: thongTinGiaoHang.diaChiGiaoHang,
                tongTienSanPham: tongTien,
                chiPhiGiaoHang: 0, // Có thể thay đổi tùy logic
                chiPhiThanhToan: 0, // Có thể thay đổi tùy logic
                tongTien: tongTien,
                danhSachChiTietDonHang: sanPhamMua.map(sp => ({
                    sach: { maSach: sp.maSach },
                    soLuong: sp.soLuong,
                    giaBan: sp.giaBan
                }))
            };

            const response = await taoDonHang(donHang);
            if (response) {
                setThongBao('Đặt hàng thành công!');
                setTimeout(() => {
                    navigate('/don-hang/' + response.maDonHang);
                }, 2000);
            }
        } catch (error) {
            setThongBao('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!');
        } finally {
            setDangXuLy(false);
        }
    };

    return (
        <div className="container my-4">
            <h2 className="mb-4">Thanh toán</h2>
            
            {thongBao && (
                <div className="alert alert-info" role="alert">
                    {thongBao}
                </div>
            )}

            <div className="row">
                <div className="col-md-8">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Thông tin giao hàng</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Họ tên người nhận</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="hoTen"
                                        value={thongTinGiaoHang.hoTen}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Số điện thoại</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        name="soDienThoai"
                                        value={thongTinGiaoHang.soDienThoai}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Địa chỉ giao hàng</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="diaChiGiaoHang"
                                        value={thongTinGiaoHang.diaChiGiaoHang}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Ghi chú</label>
                                    <textarea
                                        className="form-control"
                                        name="ghiChu"
                                        value={thongTinGiaoHang.ghiChu}
                                        onChange={handleInputChange}
                                        rows={3}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={dangXuLy}
                                >
                                    {dangXuLy ? 'Đang xử lý...' : 'Đặt hàng'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Đơn hàng của bạn</h5>
                            {sanPhamMua.map((sp, index) => (
                                <div key={index} className="d-flex justify-content-between mb-2">
                                    <div>
                                        {sp.tenSach} x {sp.soLuong}
                                    </div>
                                    <div>
                                        {dinhDangSo(sp.giaBan * sp.soLuong)} đ
                                    </div>
                                </div>
                            ))}
                            <hr />
                            <div className="d-flex justify-content-between">
                                <strong>Tổng cộng:</strong>
                                <strong>{dinhDangSo(tongTien)} đ</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThanhToan; 
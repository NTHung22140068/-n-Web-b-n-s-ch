import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import SachModel from "../../models/SachModel";
import { laySachTheoMaSach } from "../../api/SachApi";
import HinhAnhSanPham from "./components/HinhAnhSanPham";
import DanhGiaSanPham from "./components/DanhGiaSanPham";
import renderRating from "../utils/SaoXepHang";
import dinhDangSo from "../utils/DinhDangSo";
import { addToCart } from "../utils/CartUtils";

const ChiTietSanPham: React.FC = () => {
  const navigate = useNavigate();
  // Lấy mã sách từ URL
  const { maSach } = useParams();

  let maSachNumber = 0;
  try {
    maSachNumber = parseInt(maSach + "");
    if (Number.isNaN(maSachNumber)) {
      maSachNumber = 0;
    }
  } catch (error) {
    maSachNumber = 0;
    console.error("Error", error);
  }

  const [sach, setSach] = useState<SachModel | null>(null);
  const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
  const [baoLoi, setBaoLoi] = useState(null);
  const [soLuong, setSoLuong] = useState(1);
  const [hinhAnhUrl, setHinhAnhUrl] = useState("");

  const tangSoLuong = () => {
    const soLuongTonKho = sach?.soLuong || 0;
    if (soLuong < soLuongTonKho) {
      setSoLuong(soLuong + 1);
    }
  };

  const giamSoLuong = () => {
    if (soLuong >= 2) {
      setSoLuong(soLuong - 1);
    }
  };

  const handleMuaNgay = () => {
    // Kiểm tra đăng nhập
    const userData = localStorage.getItem('userData');
    if (!userData) {
      navigate('/dangNhap');
      return;
    }

    // Thêm vào giỏ hàng và chuyển đến trang giỏ hàng
    if (sach && sach.tenSach && sach.giaBan) {
      const success = addToCart(
        sach.maSach,
        sach.tenSach,
        sach.giaBan,
        soLuong,
        hinhAnhUrl
      );
      if (success) {
        navigate('/gio-hang');
      }
    }
  };

  const handleThemVaoGioHang = () => {
    // Kiểm tra đăng nhập
    const userData = localStorage.getItem('userData');
    if (!userData) {
      navigate('/dangNhap');
      return;
    }

    // Thêm vào giỏ hàng
    if (sach && sach.tenSach && sach.giaBan) {
      addToCart(
        sach.maSach,
        sach.tenSach,
        sach.giaBan,
        soLuong,
        hinhAnhUrl
      );
    }
  };

  const handleSoLuongChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const soLuongMoi = parseInt(event.target.value);
    const soLuongTonKho = sach?.soLuong || 0;
    if (!isNaN(soLuongMoi) && soLuongMoi >= 1 && soLuongMoi <= soLuongTonKho) {
      setSoLuong(soLuongMoi);
    }
  };

  useEffect(() => {
    laySachTheoMaSach(maSachNumber)
      .then((sach) => {
        setSach(sach);
        setDangTaiDuLieu(false);
      })
      .catch((error) => {
        setBaoLoi(error.message);
        setDangTaiDuLieu(false);
      });
  }, [maSach]);

  // Lấy URL hình ảnh từ component HinhAnhSanPham
  const handleHinhAnhLoaded = (url: string) => {
    setHinhAnhUrl(url);
  };

  if (dangTaiDuLieu) {
    return (
      <div>
        <h1>Đang tải dữ liệu</h1>
      </div>
    );
  }

  if (baoLoi) {
    return (
      <div>
        <h1>Gặp lỗi: {baoLoi}</h1>
      </div>
    );
  }

  if (!sach || !sach.tenSach || !sach.giaBan) {
    return (
      <div>
        <h1>Sách không tồn tại hoặc thiếu thông tin</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row mt-4 mb-4">
        <div className="col-4">
          <HinhAnhSanPham maSach={maSachNumber} onHinhAnhLoaded={handleHinhAnhLoaded} />
        </div>
        <div className="col-8">
          <div className="row">
            <div className="col-8">
              <h1>{sach.tenSach}</h1>
              <h4>
                {renderRating(
                  sach.trungBinhXepHang || 0
                )}
              </h4>
              <h4>{dinhDangSo(sach.giaBan)} đ</h4>
              <hr />
              <div dangerouslySetInnerHTML={{ __html: sach.moTa || '' }} />
              <hr />
            </div>
            <div className="col-4">
              <div>
                <div className="mb-2">Số lượng</div>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-secondary me-2"
                    onClick={giamSoLuong}
                  >
                    -
                  </button>
                  <input
                    className="form-control text-center"
                    value={soLuong}
                    type="number"
                    min={1}
                    onChange={handleSoLuongChange}
                  />
                  <button
                    className="btn btn-outline-secondary ms-2"
                    onClick={tangSoLuong}
                  >
                    +
                  </button>
                </div>
                <div className="mt-2 text-center">
                  Số tiền tạm tính <br />
                  <h4>{dinhDangSo(soLuong * sach.giaBan)} đ</h4>
                </div>
                <div className="d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-danger mt-3"
                    onClick={handleMuaNgay}
                  >
                    Mua ngay
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary mt-2"
                    onClick={handleThemVaoGioHang}
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4 mb-4">
        <DanhGiaSanPham maSach={maSachNumber} />
      </div>
    </div>
  );
};

export default ChiTietSanPham;

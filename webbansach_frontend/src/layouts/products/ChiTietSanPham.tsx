import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import SachModel from "../../models/SachModel";
import { laySachTheoMaSach } from "../../api/SachApi";
import HinhAnhModel from "../../models/HinhAnhModel";
import { layToanBoHinhAnhCuaMotSach } from "../../api/HinhAnhApi";
import DanhGiaSanPham from "./components/DanhGiaSanPham";
import renderRating from "../utils/SaoXepHang";
import dinhDangSo from "../utils/DinhDangSo";
import { addToCart } from "../utils/CartUtils";
import { addToFavorites, removeFromFavorites, checkIsFavorite } from "../utils/FavoriteUtils";

const ChiTietSanPham: React.FC = () => {
  const navigate = useNavigate();
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
  const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);
  const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
  const [baoLoi, setBaoLoi] = useState<string | null>(null);
  const [soLuong, setSoLuong] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sachData, hinhAnhData] = await Promise.all([
          laySachTheoMaSach(maSachNumber),
          layToanBoHinhAnhCuaMotSach(maSachNumber)
        ]);
        setSach(sachData);
        setDanhSachAnh(hinhAnhData);
        setDangTaiDuLieu(false);
      } catch (error) {
        setBaoLoi(error instanceof Error ? error.message : 'An error occurred');
        setDangTaiDuLieu(false);
      }
    };

    fetchData();

    // Kiểm tra trạng thái yêu thích
    const checkFavoriteStatus = async () => {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const status = await checkIsFavorite(maSachNumber);
        setIsLiked(status);
      }
    };
    checkFavoriteStatus();
  }, [maSachNumber]);

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

  const handleMuaNgay = async () => {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      navigate('/dangNhap');
      return;
    }

    if (sach && sach.tenSach && sach.giaBan) {
      navigate('/thanh-toan', {
        state: {
          sanPhamMua: [{
            maSach: sach.maSach,
            tenSach: sach.tenSach,
            giaBan: sach.giaBan,
            soLuong: soLuong
          }]
        }
      });
    }
  };

  const handleThemVaoGioHang = async () => {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      navigate('/dangNhap');
      return;
    }

    if (sach && sach.tenSach && sach.giaBan) {
      await addToCart(
        sach.maSach,
        sach.tenSach,
        sach.giaBan,
        soLuong
      );
    }
  };

  const handleToggleFavorite = async () => {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      navigate('/dangNhap');
      return;
    }

    try {
      if (isLiked) {
        const success = await removeFromFavorites(maSachNumber);
        if (success) setIsLiked(false);
      } else {
        const success = await addToFavorites(maSachNumber);
        if (success) setIsLiked(true);
      }
    } catch (error) {
      console.error('Lỗi khi thao tác với yêu thích:', error);
    }
  };

  const handleSoLuongChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const soLuongMoi = parseInt(event.target.value);
    const soLuongTonKho = sach?.soLuong || 0;
    if (!isNaN(soLuongMoi) && soLuongMoi >= 1 && soLuongMoi <= soLuongTonKho) {
      setSoLuong(soLuongMoi);
    }
  };

  if (dangTaiDuLieu) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (baoLoi) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          Gặp lỗi: {baoLoi}
        </div>
      </div>
    );
  }

  if (!sach || !sach.tenSach || !sach.giaBan) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning" role="alert">
          Sách không tồn tại hoặc thiếu thông tin
        </div>
      </div>
    );
  }

  let duLieuAnh: string = "";
  if (danhSachAnh[0] && danhSachAnh[0].duLieuAnh) {
    duLieuAnh = danhSachAnh[0].duLieuAnh;
  }

  return (
    <div className="container">
      <div className="row mt-4 mb-4">
        <div className="col-4">
          <img
            src={duLieuAnh || '/images/default-book.png'}
            alt={sach.tenSach}
            className="img-fluid rounded"
            style={{ width: "100%", maxHeight: "500px", objectFit: "contain" }}
          />
        </div>
        <div className="col-8">
          <div className="row">
            <div className="col-8">
              <h1>{sach.tenSach}</h1>
              <h4>
                {renderRating(sach.trungBinhXepHang || 0)}
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
                  <button
                    type="button"
                    className={`btn ${isLiked ? 'btn-danger' : 'btn-outline-danger'} mt-2`}
                    onClick={handleToggleFavorite}
                  >
                    <i className="fas fa-heart me-2"></i>
                    {isLiked ? 'Đã yêu thích' : 'Thêm vào yêu thích'}
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

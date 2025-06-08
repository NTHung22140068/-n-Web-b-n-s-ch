import React, { useEffect, useState } from "react";
import SachModel from "../../../models/SachModel";
import HinhAnhModel from "../../../models/HinhAnhModel";
import { layToanBoHinhAnhCuaMotSach } from "../../../api/HinhAnhApi";
import { Link, useNavigate } from "react-router-dom";
import renderRating from "../../utils/SaoXepHang";
import dinhDangSo from "../../utils/DinhDangSo";
import { addToCart } from "../../utils/CartUtils";
import { addToFavorites, removeFromFavorites, checkIsFavorite } from "../../utils/FavoriteUtils";

interface SachPropsInterface {
  sach: SachModel;
}

const SachPropsInterface: React.FC<SachPropsInterface> = (props) => {
  const navigate = useNavigate();
  const maSach: number = props.sach.maSach;
  const [danhSachAnh, setDanhSachAnh] = React.useState<HinhAnhModel[]>([]);
  const [dangTaiDuLieu, setDangTaiDuLieu] = React.useState(true);
  const [baoLoi, setBaoLoi] = React.useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(
    () => {
      layToanBoHinhAnhCuaMotSach(maSach)
        .then((hinhAnhData) => {
          setDanhSachAnh(hinhAnhData);
          setDangTaiDuLieu(false);
        })
        .catch((error) => {
          setDangTaiDuLieu(false);
          setBaoLoi(error.message);
        });
    },
    [maSach]
  );

  useEffect(() => {
    // Kiểm tra trạng thái yêu thích khi component được mount
    const checkFavoriteStatus = async () => {
      const status = await checkIsFavorite(props.sach.maSach);
      setIsLiked(status);
    };
    checkFavoriteStatus();
  }, [props.sach.maSach]);

  const handleThemVaoGioHang = () => {
    // Kiểm tra đăng nhập và thêm vào giỏ hàng
    const userData = localStorage.getItem('userData');
    if (!userData) {
      // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
      navigate('/dangNhap');
      return;
    }

    // Kiểm tra thông tin sách
    if (!props.sach.tenSach || !props.sach.giaBan) {
      console.error('Thiếu thông tin sách');
      return;
    }

    // Thêm sản phẩm vào giỏ hàng
    addToCart(
      props.sach.maSach,
      props.sach.tenSach,
      props.sach.giaBan,
      1
    );
  };

  const handleToggleFavorite = async () => {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      navigate('/dangNhap');
      return;
    }

    if (isLiked) {
      const success = await removeFromFavorites(props.sach.maSach);
      if (success) setIsLiked(false);
    } else {
      const success = await addToFavorites(props.sach.maSach);
      if (success) setIsLiked(true);
    }
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

  let duLieuAnh: string = "";
  if (danhSachAnh[0] && danhSachAnh[0].duLieuAnh) {
    duLieuAnh = danhSachAnh[0].duLieuAnh;
  }

  // Kiểm tra thông tin sách trước khi render
  if (!props.sach.tenSach || !props.sach.giaBan) {
    return (
      <div>
        <h1>Thiếu thông tin sách</h1>
      </div>
    );
  }

  return (
    <div className="col-md-3 mt-2">
      <div className="card">
        <Link to={`/sach/${props.sach.maSach}`}>
          <img
            src={duLieuAnh || '/images/default-book.png'}
            alt={props.sach.tenSach}
            className="card-img-top"
            style={{ height: "200px" }}
          />
        </Link>
        <div className="card-body">
          <Link
            to={`/sach/${props.sach.maSach}`}
            style={{ textDecoration: "none" }}
          >
            <h5 className="card-title">{props.sach.tenSach}</h5>
          </Link>
          <div className="price row">
            <span className="original-price col-6 text-end">
              <del>{dinhDangSo(props.sach.giaNiemYet || 0)}</del>
            </span>

            <span className="discounted-price col-6 text-end">
              <strong>{dinhDangSo(props.sach.giaBan)} đ</strong>
            </span>
          </div>
          <div className="row mt-2" role="group">
            <div className="col-6">
              {renderRating(props.sach.trungBinhXepHang || 0)}
            </div>
            <div className="col-6 text-end">
              <button 
                className={`btn ${isLiked ? 'btn-danger' : 'btn-outline-danger'} btn-blog me-2`}
                onClick={handleToggleFavorite}
                title={isLiked ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}
              >
                <i className="fas fa-heart"></i>
              </button>
              <button 
                className="btn btn-danger btn-block"
                onClick={handleThemVaoGioHang}
                title="Thêm vào giỏ hàng"
              >
                <i className="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SachPropsInterface;

import React, { useEffect, useState } from "react";
import HinhAnhModel from "../../../models/HinhAnhModel";
import { layToanBoHinhAnhCuaMotSach } from "../../../api/HinhAnhApi";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface HinhAnhSanPham {
  maSach: number;
  onHinhAnhLoaded?: (url: string) => void;
}

const HinhAnhSanPham: React.FC<HinhAnhSanPham> = (props) => {
  const maSach: number = props.maSach;

  const [danhSachAnh, setDanhSachAnh] = React.useState<HinhAnhModel[]>([]);
  const [dangTaiDuLieu, setDangTaiDuLieu] = React.useState(true);
  const [baoLoi, setBaoLoi] = React.useState(null);

  useEffect(
    () => {
      layToanBoHinhAnhCuaMotSach(maSach)
        .then((danhSach) => {
          setDanhSachAnh(danhSach);
          setDangTaiDuLieu(false);
          // Gọi callback với URL của ảnh đầu tiên nếu có
          if (danhSach.length > 0 && props.onHinhAnhLoaded) {
            props.onHinhAnhLoaded(danhSach[0].duLieuAnh || '');
          }
        })
        .catch((error) => {
          setDangTaiDuLieu(false);
          setBaoLoi(error.message);
        });
    },
    [] // chỉ gọi 1 lần
  );

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

  return (
    <div className="row ">
      <div className="col-12">
        <Carousel showArrows={true} showIndicators={true}>
          {danhSachAnh.map((hinhAnh, index) => (
            <div key={index}>
              <img
                src={hinhAnh.duLieuAnh}
                alt={`${hinhAnh.tenHinhAnh}`}
                style={{ maxWidth: "250px" }}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default HinhAnhSanPham;

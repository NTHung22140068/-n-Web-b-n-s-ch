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

  useEffect(() => {
    // Gọi callback với URL của ảnh
    if (props.onHinhAnhLoaded) {
      props.onHinhAnhLoaded(`/hinh-anh/sach/${maSach}`);
    }
  }, [maSach]);

  return (
    <div className="row">
      <div className="col-12">
        <img
          src={`http://localhost:8081/hinh-anh/sach/${maSach}`}
          alt={`Sách ${maSach}`}
          style={{ maxWidth: "250px" }}
        />
      </div>
    </div>
  );
};

export default HinhAnhSanPham;

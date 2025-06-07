import React, { useEffect } from "react";
import SachModel from "../../../models/SachModel";
import HinhAnhModel from "../../../models/HinhAnhModel";
import { layMotAnhcuaMotSach } from "../../../api/HinhAnhApi";

interface CarouselItem {
  sach: SachModel;
}

const CarouselItem: React.FC<CarouselItem> = (props) => {
  const maSach: number = props.sach.maSach;

  const [danhSachAnh, setDanhSachAnh] = React.useState<HinhAnhModel[]>([]);
  const [dangTaiDuLieu, setDangTaiDuLieu] = React.useState(true);
  const [baoLoi, setBaoLoi] = React.useState(null);

  useEffect(
    () => {
      layMotAnhcuaMotSach(maSach)
        .then((hinhAnhData) => {
          console.log("dư liii", hinhAnhData);
          setDanhSachAnh(hinhAnhData);
          setDangTaiDuLieu(false);
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

  let duLieuAnh: string = "";
  if (danhSachAnh[0] && danhSachAnh[0].duLieuAnh) {
    duLieuAnh = danhSachAnh[0].duLieuAnh;
  }

  return (
    <div className="row align-items-center">
      <div className="col-5 text-center">
        <img
          src={duLieuAnh}
          className="float-end"
          style={{ width: "150px", height: "170px" }}
        />
      </div>
      <div className="col-7">
        <h5>{props.sach.tenSach}</h5>
      </div>
    </div>
  );
};

export default CarouselItem;

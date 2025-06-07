import React from "react";
import { my_request } from "./Request";
import DanhGiaModel from "../models/DanhGiaModel";

async function layDanhGiaMotSach(duongDan: string): Promise<DanhGiaModel[]> {
  const ketQua: DanhGiaModel[] = [];

  // Gọi phương thức request
  const response = await my_request(duongDan);

  // Lấy ra json sach
  const responseData = response._embedded.suDanhGias;

  for (const key in responseData) {
    ketQua.push({
      maDanhGia: responseData[key].maDanhGia,
      diemXepHang: responseData[key].diemXepHang,
      nhanXet: responseData[key].nhanXet,
    });
  }

  return ketQua;
}

export async function layToanBoDanhGiaCuaMotSach(
  maSach: number
): Promise<DanhGiaModel[]> {
  // Xác định endpoint
  const duongDan = `http://localhost:8081/sach/${maSach}/danhSachSuDanhGia`;

  return layDanhGiaMotSach(duongDan);
}

export async function layMotAnhcuaMotSach(
  maSach: number
): Promise<DanhGiaModel[]> {
  // Xác định endpoint
  const duongDan = `http://localhost:8081/sach/${maSach}/danhSachSuDanhGia?sort=maDanhGia,asc&page=0&size=1`;

  return layDanhGiaMotSach(duongDan);
}

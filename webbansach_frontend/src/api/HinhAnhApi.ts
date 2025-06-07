import React from "react";
import HinhAnhModel from "../models/HinhAnhModel";
import { my_request } from "./Request";

async function layHinhAnhMotSach(
  maSach: number,
  duongDan: string
): Promise<HinhAnhModel[]> {
  const ketQua: HinhAnhModel[] = [];

  // Gọi phương thức request
  const response = await my_request(duongDan);

  // Lấy ra json sach
  const responseData = response._embedded.hinhAnhs;

  for (const key in responseData) {
    ketQua.push({
      maHinhAnh: responseData[key].maHinhAnh,
      tenHinhAnh: responseData[key].tenHinhAnh,
      laIcon: responseData[key].laIcon,
      duongDan: responseData[key].duongDan,
      duLieuAnh: responseData[key].duLieuAnh,
    });
  }

  return ketQua;
}

export async function layToanBoHinhAnhCuaMotSach(
  maSach: number
): Promise<HinhAnhModel[]> {
  // Xác định endpoint
  const duongDan = `http://localhost:8081/sach/${maSach}/danhSachHinhAnh`;

  return layHinhAnhMotSach(maSach, duongDan);
}

export async function layMotAnhcuaMotSach(
  maSach: number
): Promise<HinhAnhModel[]> {
  // Xác định endpoint
  const duongDan = `http://localhost:8081/sach/${maSach}/danhSachHinhAnh?sort=maHinhAnh,asc&page=0&size=1`;

  return layHinhAnhMotSach(maSach, duongDan);
}

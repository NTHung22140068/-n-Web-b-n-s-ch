package com.GDU.webbansach_backend.dao;

import com.GDU.webbansach_backend.entity.ChiTietGioHang;
import com.GDU.webbansach_backend.entity.GioHang;
import com.GDU.webbansach_backend.entity.Sach;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChiTietGioHangRepository extends JpaRepository<ChiTietGioHang, Integer> {
    ChiTietGioHang findByGioHangAndSach(GioHang gioHang, Sach sach);
    void deleteByGioHang(GioHang gioHang);
} 
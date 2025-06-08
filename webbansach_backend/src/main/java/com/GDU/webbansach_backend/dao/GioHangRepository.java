package com.GDU.webbansach_backend.dao;

import com.GDU.webbansach_backend.entity.GioHang;
import com.GDU.webbansach_backend.entity.NguoiDung;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GioHangRepository extends JpaRepository<GioHang, Integer> {
    GioHang findByNguoiDung(NguoiDung nguoiDung);
} 
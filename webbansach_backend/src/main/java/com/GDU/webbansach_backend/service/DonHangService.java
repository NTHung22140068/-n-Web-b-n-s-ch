package com.GDU.webbansach_backend.service;

import com.GDU.webbansach_backend.entity.DonHang;
import com.GDU.webbansach_backend.dao.DonHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DonHangService {

    @Autowired
    private DonHangRepository donHangRepository;

    @Transactional
    public DonHang luuDonHang(DonHang donHang) {
        return donHangRepository.save(donHang);
    }

    public List<DonHang> layDonHangTheoNguoiDung(int maNguoiDung) {
        return donHangRepository.findByNguoiDung_MaNguoiDung(maNguoiDung);
    }

    public DonHang layDonHangTheoMa(int maDonHang) {
        return donHangRepository.findById(maDonHang).orElse(null);
    }
} 
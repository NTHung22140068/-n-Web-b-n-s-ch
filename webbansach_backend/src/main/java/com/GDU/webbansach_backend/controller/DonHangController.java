package com.GDU.webbansach_backend.controller;

import com.GDU.webbansach_backend.entity.DonHang;
import com.GDU.webbansach_backend.entity.ChiTietDonHang;
import com.GDU.webbansach_backend.entity.NguoiDung;
import com.GDU.webbansach_backend.entity.Sach;
import com.GDU.webbansach_backend.service.DonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/don-hang")
public class DonHangController {

    @Autowired
    private DonHangService donHangService;

    @PostMapping("/tao-don-hang")
    public ResponseEntity<?> taoDonHang(@RequestBody DonHang donHang) {
        try {
            donHang.setNgayTao(new Date(System.currentTimeMillis()));
            DonHang donHangDaLuu = donHangService.luuDonHang(donHang);
            return ResponseEntity.ok(donHangDaLuu);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi khi tạo đơn hàng: " + e.getMessage());
        }
    }

    @GetMapping("/nguoi-dung/{maNguoiDung}")
    public ResponseEntity<?> layDonHangTheoNguoiDung(@PathVariable int maNguoiDung) {
        try {
            List<DonHang> dsDonHang = donHangService.layDonHangTheoNguoiDung(maNguoiDung);
            return ResponseEntity.ok(dsDonHang);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi khi lấy đơn hàng: " + e.getMessage());
        }
    }

    @GetMapping("/{maDonHang}")
    public ResponseEntity<?> layChiTietDonHang(@PathVariable int maDonHang) {
        try {
            DonHang donHang = donHangService.layDonHangTheoMa(maDonHang);
            return ResponseEntity.ok(donHang);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi khi lấy chi tiết đơn hàng: " + e.getMessage());
        }
    }
} 
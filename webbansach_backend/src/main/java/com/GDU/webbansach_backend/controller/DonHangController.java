package com.GDU.webbansach_backend.controller;

import com.GDU.webbansach_backend.entity.DonHang;
import com.GDU.webbansach_backend.entity.ChiTietDonHang;
import com.GDU.webbansach_backend.entity.NguoiDung;
import com.GDU.webbansach_backend.entity.Sach;
import com.GDU.webbansach_backend.service.DonHangService;
import com.GDU.webbansach_backend.service.SachService;
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

    @Autowired
    private SachService sachService;

    @PostMapping("/tao-don-hang")
    public ResponseEntity<?> taoDonHang(@RequestBody DonHang donHang) {
        try {
            // Thiết lập ngày tạo đơn hàng
            donHang.setNgayTao(new Date(System.currentTimeMillis()));

            // Kiểm tra số lượng sách trong kho
            for (ChiTietDonHang chiTiet : donHang.getDanhSachChiTietDonHang()) {
                Sach sach = sachService.laySachTheoMaSach(chiTiet.getSach().getMaSach());
                if (sach == null) {
                    return ResponseEntity.badRequest().body("Không tìm thấy sách với mã " + chiTiet.getSach().getMaSach());
                }
                if (sach.getSoLuong() < chiTiet.getSoLuong()) {
                    return ResponseEntity.badRequest().body("Sách " + sach.getTenSach() + " không đủ số lượng trong kho");
                }
                // Cập nhật số lượng sách trong kho
                sach.setSoLuong(sach.getSoLuong() - chiTiet.getSoLuong());
                sachService.capNhatSach(sach);
            }

            // Lưu đơn hàng
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
            if (donHang == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(donHang);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi khi lấy chi tiết đơn hàng: " + e.getMessage());
        }
    }
} 
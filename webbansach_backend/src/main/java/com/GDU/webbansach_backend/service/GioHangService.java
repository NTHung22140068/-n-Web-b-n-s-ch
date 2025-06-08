package com.GDU.webbansach_backend.service;

import com.GDU.webbansach_backend.dao.ChiTietGioHangRepository;
import com.GDU.webbansach_backend.dao.GioHangRepository;
import com.GDU.webbansach_backend.dao.NguoiDungRepository;
import com.GDU.webbansach_backend.dao.SachRepository;
import com.GDU.webbansach_backend.entity.ChiTietGioHang;
import com.GDU.webbansach_backend.entity.GioHang;
import com.GDU.webbansach_backend.entity.NguoiDung;
import com.GDU.webbansach_backend.entity.Sach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GioHangService {

    @Autowired
    private GioHangRepository gioHangRepository;

    @Autowired
    private ChiTietGioHangRepository chiTietGioHangRepository;

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    @Autowired
    private SachRepository sachRepository;

    @Transactional
    public ResponseEntity<?> themVaoGioHang(String tenDangNhap, int maSach, int soLuong) {
        try {
            // Tìm người dùng
            NguoiDung nguoiDung = nguoiDungRepository.findByTenDangNhap(tenDangNhap);
            if (nguoiDung == null) {
                return ResponseEntity.badRequest().body("Người dùng không tồn tại");
            }

            // Tìm sách
            Sach sach = sachRepository.findById(maSach).orElse(null);
            if (sach == null) {
                return ResponseEntity.badRequest().body("Sách không tồn tại");
            }

            // Tìm hoặc tạo giỏ hàng cho người dùng
            GioHang gioHang = gioHangRepository.findByNguoiDung(nguoiDung);
            if (gioHang == null) {
                gioHang = new GioHang();
                gioHang.setNguoiDung(nguoiDung);
                gioHang = gioHangRepository.save(gioHang);
            }

            // Tìm hoặc tạo chi tiết giỏ hàng
            ChiTietGioHang chiTietGioHang = chiTietGioHangRepository.findByGioHangAndSach(gioHang, sach);
            if (chiTietGioHang == null) {
                chiTietGioHang = new ChiTietGioHang();
                chiTietGioHang.setGioHang(gioHang);
                chiTietGioHang.setSach(sach);
                chiTietGioHang.setSoLuong(soLuong);
            } else {
                chiTietGioHang.setSoLuong(chiTietGioHang.getSoLuong() + soLuong);
            }

            chiTietGioHangRepository.save(chiTietGioHang);

            return ResponseEntity.ok("Thêm vào giỏ hàng thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi khi thêm vào giỏ hàng: " + e.getMessage());
        }
    }

    @Transactional
    public ResponseEntity<?> layGioHang(String tenDangNhap) {
        try {
            NguoiDung nguoiDung = nguoiDungRepository.findByTenDangNhap(tenDangNhap);
            if (nguoiDung == null) {
                return ResponseEntity.badRequest().body("Người dùng không tồn tại");
            }

            GioHang gioHang = gioHangRepository.findByNguoiDung(nguoiDung);
            if (gioHang == null) {
                return ResponseEntity.ok(new ArrayList<>());
            }

            List<Map<String, Object>> cartItems = new ArrayList<>();
            for (ChiTietGioHang chiTiet : gioHang.getChiTietGioHangs()) {
                Map<String, Object> item = new HashMap<>();
                item.put("maSach", chiTiet.getSach().getMaSach());
                item.put("tenSach", chiTiet.getSach().getTenSach());
                item.put("giaBan", chiTiet.getSach().getGiaBan());
                item.put("soLuong", chiTiet.getSoLuong());
                item.put("urlHinhAnh", "/hinh-anh/sach/" + chiTiet.getSach().getMaSach());
                cartItems.add(item);
            }

            return ResponseEntity.ok(cartItems);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi khi lấy giỏ hàng: " + e.getMessage());
        }
    }

    @Transactional
    public ResponseEntity<?> capNhatSoLuong(String tenDangNhap, int maSach, int soLuongMoi) {
        try {
            NguoiDung nguoiDung = nguoiDungRepository.findByTenDangNhap(tenDangNhap);
            if (nguoiDung == null) {
                return ResponseEntity.badRequest().body("Người dùng không tồn tại");
            }

            GioHang gioHang = gioHangRepository.findByNguoiDung(nguoiDung);
            if (gioHang == null) {
                return ResponseEntity.badRequest().body("Giỏ hàng không tồn tại");
            }

            Sach sach = sachRepository.findById(maSach).orElse(null);
            if (sach == null) {
                return ResponseEntity.badRequest().body("Sách không tồn tại");
            }

            ChiTietGioHang chiTietGioHang = chiTietGioHangRepository.findByGioHangAndSach(gioHang, sach);
            if (chiTietGioHang == null) {
                return ResponseEntity.badRequest().body("Sản phẩm không có trong giỏ hàng");
            }

            if (soLuongMoi <= 0) {
                chiTietGioHangRepository.delete(chiTietGioHang);
                return ResponseEntity.ok("Đã xóa sản phẩm khỏi giỏ hàng");
            }

            chiTietGioHang.setSoLuong(soLuongMoi);
            chiTietGioHangRepository.save(chiTietGioHang);

            return ResponseEntity.ok("Cập nhật số lượng thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi khi cập nhật số lượng: " + e.getMessage());
        }
    }

    @Transactional
    public ResponseEntity<?> xoaSanPham(String tenDangNhap, int maSach) {
        try {
            NguoiDung nguoiDung = nguoiDungRepository.findByTenDangNhap(tenDangNhap);
            if (nguoiDung == null) {
                return ResponseEntity.badRequest().body("Người dùng không tồn tại");
            }

            GioHang gioHang = gioHangRepository.findByNguoiDung(nguoiDung);
            if (gioHang == null) {
                return ResponseEntity.badRequest().body("Giỏ hàng không tồn tại");
            }

            Sach sach = sachRepository.findById(maSach).orElse(null);
            if (sach == null) {
                return ResponseEntity.badRequest().body("Sách không tồn tại");
            }

            ChiTietGioHang chiTietGioHang = chiTietGioHangRepository.findByGioHangAndSach(gioHang, sach);
            if (chiTietGioHang == null) {
                return ResponseEntity.badRequest().body("Sản phẩm không có trong giỏ hàng");
            }

            chiTietGioHangRepository.delete(chiTietGioHang);
            return ResponseEntity.ok("Đã xóa sản phẩm khỏi giỏ hàng");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi khi xóa sản phẩm: " + e.getMessage());
        }
    }

    @Transactional
    public ResponseEntity<?> xoaGioHang(String tenDangNhap) {
        try {
            NguoiDung nguoiDung = nguoiDungRepository.findByTenDangNhap(tenDangNhap);
            if (nguoiDung == null) {
                return ResponseEntity.badRequest().body("Người dùng không tồn tại");
            }

            GioHang gioHang = gioHangRepository.findByNguoiDung(nguoiDung);
            if (gioHang == null) {
                return ResponseEntity.ok("Giỏ hàng đã trống");
            }

            chiTietGioHangRepository.deleteByGioHang(gioHang);
            gioHangRepository.delete(gioHang);

            return ResponseEntity.ok("Đã xóa giỏ hàng");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi khi xóa giỏ hàng: " + e.getMessage());
        }
    }
} 
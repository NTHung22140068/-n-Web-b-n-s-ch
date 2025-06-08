package com.GDU.webbansach_backend.service;

import com.GDU.webbansach_backend.dao.NguoiDungRepository;
import com.GDU.webbansach_backend.dao.SachRepository;
import com.GDU.webbansach_backend.dao.SachYeuThichRepository;
import com.GDU.webbansach_backend.entity.NguoiDung;
import com.GDU.webbansach_backend.entity.Sach;
import com.GDU.webbansach_backend.entity.SachYeuThich;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SachYeuThichService {

    @Autowired
    private SachYeuThichRepository sachYeuThichRepository;

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    @Autowired
    private SachRepository sachRepository;

    @Transactional
    public ResponseEntity<?> themVaoYeuThich(String tenDangNhap, int maSach) {
        try {
            NguoiDung nguoiDung = nguoiDungRepository.findByTenDangNhap(tenDangNhap);
            if (nguoiDung == null) {
                return ResponseEntity.badRequest().body("Người dùng không tồn tại");
            }

            Sach sach = sachRepository.findById(maSach).orElse(null);
            if (sach == null) {
                return ResponseEntity.badRequest().body("Sách không tồn tại");
            }

            // Kiểm tra xem đã yêu thích chưa
            if (sachYeuThichRepository.existsByNguoiDungAndSach(nguoiDung, sach)) {
                return ResponseEntity.badRequest().body("Sách đã có trong danh sách yêu thích");
            }

            SachYeuThich sachYeuThich = new SachYeuThich();
            sachYeuThich.setNguoiDung(nguoiDung);
            sachYeuThich.setSach(sach);
            sachYeuThichRepository.save(sachYeuThich);

            return ResponseEntity.ok("Đã thêm sách vào danh sách yêu thích");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi khi thêm vào yêu thích: " + e.getMessage());
        }
    }

    @Transactional
    public ResponseEntity<?> xoaKhoiYeuThich(String tenDangNhap, int maSach) {
        try {
            NguoiDung nguoiDung = nguoiDungRepository.findByTenDangNhap(tenDangNhap);
            if (nguoiDung == null) {
                return ResponseEntity.badRequest().body("Người dùng không tồn tại");
            }

            Sach sach = sachRepository.findById(maSach).orElse(null);
            if (sach == null) {
                return ResponseEntity.badRequest().body("Sách không tồn tại");
            }

            sachYeuThichRepository.deleteByNguoiDungAndSach(nguoiDung, sach);
            return ResponseEntity.ok("Đã xóa sách khỏi danh sách yêu thích");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi khi xóa khỏi yêu thích: " + e.getMessage());
        }
    }

    @Transactional
    public ResponseEntity<?> layDanhSachYeuThich(String tenDangNhap) {
        try {
            NguoiDung nguoiDung = nguoiDungRepository.findByTenDangNhap(tenDangNhap);
            if (nguoiDung == null) {
                return ResponseEntity.badRequest().body("Người dùng không tồn tại");
            }

            List<SachYeuThich> danhSachYeuThich = sachYeuThichRepository.findByNguoiDung(nguoiDung);
            List<Map<String, Object>> result = new ArrayList<>();

            for (SachYeuThich item : danhSachYeuThich) {
                Map<String, Object> sachInfo = new HashMap<>();
                sachInfo.put("maSach", item.getSach().getMaSach());
                sachInfo.put("tenSach", item.getSach().getTenSach());
                sachInfo.put("giaBan", item.getSach().getGiaBan());
                sachInfo.put("giaNiemYet", item.getSach().getGiaNiemYet());
                sachInfo.put("moTa", item.getSach().getMoTa());
                sachInfo.put("trungBinhXepHang", item.getSach().getTrungBinhXepHang());
                result.add(sachInfo);
            }

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi khi lấy danh sách yêu thích: " + e.getMessage());
        }
    }

    @Transactional
    public ResponseEntity<?> kiemTraYeuThich(String tenDangNhap, int maSach) {
        try {
            NguoiDung nguoiDung = nguoiDungRepository.findByTenDangNhap(tenDangNhap);
            if (nguoiDung == null) {
                return ResponseEntity.badRequest().body("Người dùng không tồn tại");
            }

            Sach sach = sachRepository.findById(maSach).orElse(null);
            if (sach == null) {
                return ResponseEntity.badRequest().body("Sách không tồn tại");
            }

            boolean isLiked = sachYeuThichRepository.existsByNguoiDungAndSach(nguoiDung, sach);
            return ResponseEntity.ok(isLiked);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi khi kiểm tra yêu thích: " + e.getMessage());
        }
    }
} 
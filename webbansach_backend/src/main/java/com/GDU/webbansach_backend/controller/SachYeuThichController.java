package com.GDU.webbansach_backend.controller;

import com.GDU.webbansach_backend.service.SachYeuThichService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sach-yeu-thich")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", maxAge = 3600)
public class SachYeuThichController {

    @Autowired
    private SachYeuThichService sachYeuThichService;

    @PostMapping("/them")
    public ResponseEntity<?> themVaoYeuThich(@RequestBody FavoriteRequest request) {
        return sachYeuThichService.themVaoYeuThich(request.getTenDangNhap(), request.getMaSach());
    }

    @DeleteMapping("/xoa")
    public ResponseEntity<?> xoaKhoiYeuThich(@RequestBody FavoriteRequest request) {
        return sachYeuThichService.xoaKhoiYeuThich(request.getTenDangNhap(), request.getMaSach());
    }

    @GetMapping("/danh-sach")
    public ResponseEntity<?> layDanhSachYeuThich(@RequestParam String tenDangNhap) {
        return sachYeuThichService.layDanhSachYeuThich(tenDangNhap);
    }

    @GetMapping("/kiem-tra")
    public ResponseEntity<?> kiemTraYeuThich(@RequestParam String tenDangNhap, @RequestParam int maSach) {
        return sachYeuThichService.kiemTraYeuThich(tenDangNhap, maSach);
    }

    static class FavoriteRequest {
        private String tenDangNhap;
        private int maSach;

        public String getTenDangNhap() { return tenDangNhap; }
        public void setTenDangNhap(String tenDangNhap) { this.tenDangNhap = tenDangNhap; }
        public int getMaSach() { return maSach; }
        public void setMaSach(int maSach) { this.maSach = maSach; }
    }
} 
package com.GDU.webbansach_backend.controller;

import com.GDU.webbansach_backend.service.GioHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/gio-hang")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", maxAge = 3600)
public class GioHangController {

    @Autowired
    private GioHangService gioHangService;

    @PostMapping("/them")
    public ResponseEntity<?> themVaoGioHang(@RequestBody CartRequest request) {
        return gioHangService.themVaoGioHang(request.getTenDangNhap(), request.getMaSach(), request.getSoLuong());
    }

    @GetMapping("/lay")
    public ResponseEntity<?> layGioHang(@RequestParam String tenDangNhap) {
        return gioHangService.layGioHang(tenDangNhap);
    }

    @PutMapping("/cap-nhat")
    public ResponseEntity<?> capNhatSoLuong(@RequestBody CartRequest request) {
        return gioHangService.capNhatSoLuong(request.getTenDangNhap(), request.getMaSach(), request.getSoLuong());
    }

    @DeleteMapping("/xoa-san-pham")
    public ResponseEntity<?> xoaSanPham(@RequestBody CartRequest request) {
        return gioHangService.xoaSanPham(request.getTenDangNhap(), request.getMaSach());
    }

    @DeleteMapping("/xoa")
    public ResponseEntity<?> xoaGioHang(@RequestBody CartRequest request) {
        return gioHangService.xoaGioHang(request.getTenDangNhap());
    }

    static class CartRequest {
        private String tenDangNhap;
        private int maSach;
        private int soLuong;

        public String getTenDangNhap() { return tenDangNhap; }
        public void setTenDangNhap(String tenDangNhap) { this.tenDangNhap = tenDangNhap; }
        public int getMaSach() { return maSach; }
        public void setMaSach(int maSach) { this.maSach = maSach; }
        public int getSoLuong() { return soLuong; }
        public void setSoLuong(int soLuong) { this.soLuong = soLuong; }
    }
} 
package com.GDU.webbansach_backend.service;

import com.GDU.webbansach_backend.dao.NguoiDungRepository;
import com.GDU.webbansach_backend.entity.NguoiDung;
import com.GDU.webbansach_backend.entity.ThongBao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class TaiKhoanService {
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private JwtService jwtService;

    public ResponseEntity<?> dangKyNguoiDung(NguoiDung nguoiDung) {
        // kiểm tra tên đăng nhập đã tồn tại hay chưa
        if (nguoiDungRepository.existsByTenDangNhap((nguoiDung.getTenDangNhap()))) {
            return ResponseEntity.badRequest().body(new ThongBao("Tên đăng nhập đã tồn tại."));
        }

        // kiểm tra tên đăng nhập đã tồn tại hay chưa
        if (nguoiDungRepository.existsByEmail((nguoiDung.getEmail()))) {
            return ResponseEntity.badRequest().body(new ThongBao("Email đã tồn tại."));
        }

        // Mã hóa mật khẩu
        String enCryptPassword = passwordEncoder.encode(nguoiDung.getMatKhau());
        nguoiDung.setMatKhau(enCryptPassword);

        // gán và gửi thông tin kích hoạt
        nguoiDung.setMaKichHoat(taoMaKichHoat());
        nguoiDung.setDaKichHoat(false);

        // Lưu người dùng vào csdl
        NguoiDung nguoiDdung_daDangKy = nguoiDungRepository.save(nguoiDung);

        // gửi email cho người dùng kích hoạt
        guiEmailKichHoat(nguoiDung.getEmail(), nguoiDung.getMaKichHoat());


        return ResponseEntity.ok("Đăng ký thành công.");
    }

    private String taoMaKichHoat() {
        // tạo mã ngẫu nhiên
        return UUID.randomUUID().toString();
    }

    private void guiEmailKichHoat(String email, String maKichHoat) {
        String subject = "Kích hoạt tài khoản của bạn tại WebBanSach";
        String text =
                "Vui lòng sử dụng mã sau để kích hoạt cho tài khoản <" + email + ">:<html><body><br/><h1>" + maKichHoat +
                        "</h1></body></html>";
        text += "<br/> Click vào đường link để kích hoạt tài khoản: ";
        String url = "http://localhost:3000/kich-hoat/" + email + "/" + maKichHoat;
        text += ("<br/> <a href=" + url + ">" + url + "</a>");
        emailService.sendMessage("thanhhung17052004@gmail.com", email, subject, text);
    }

    public ResponseEntity<?> kichHoatTaiKhoan(String email, String maKichHoat) {
        NguoiDung nguoiDung = nguoiDungRepository.findByEmail(email);

        if (nguoiDung == null) {
            return ResponseEntity.badRequest().body(new ThongBao("Người dùng không tồn tại."));
        }

        if (nguoiDung.isDaKichHoat()) {
            return ResponseEntity.badRequest().body(new ThongBao("Tài khoản đã được kích hoạt."));
        }

        if (maKichHoat.equals(nguoiDung.getMaKichHoat())) {
            nguoiDung.setDaKichHoat(true);
            nguoiDungRepository.save(nguoiDung);
            return ResponseEntity.ok("Kích hoạt tài khoản thành công.");
        } else {
            return ResponseEntity.badRequest().body(new ThongBao("Mã kích hoạt không chính xác."));
        }
    }

    public ResponseEntity<?> dangNhap(String tenDangNhap, String matKhau) {
        NguoiDung nguoiDung = nguoiDungRepository.findByTenDangNhap(tenDangNhap);
        
        if (nguoiDung == null) {
            return ResponseEntity.badRequest().body(new ThongBao("Tên đăng nhập không tồn tại."));
        }

        if (!nguoiDung.isDaKichHoat()) {
            return ResponseEntity.badRequest().body(new ThongBao("Tài khoản chưa được kích hoạt."));
        }

        if (!passwordEncoder.matches(matKhau, nguoiDung.getMatKhau())) {
            return ResponseEntity.badRequest().body(new ThongBao("Mật khẩu không chính xác."));
        }

        String token = jwtService.generteToken(tenDangNhap);
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", nguoiDung);
        
        return ResponseEntity.ok(response);
    }
}

SET GLOBAL sort_buffer_size = 4M

-- Dữ liệu cho bảng 'quyen'
INSERT INTO quyen (ten_quyen) VALUES
('ADMIN'),
('USER');

-- Dữ liệu cho bảng 'nguoi_dung'
INSERT INTO nguoi_dung (
    ho_dem, ten, ten_dang_nhap, mat_khau, gioi_tinh, email, sdt, dia_chi_mua_hang, dia_chi_giao_hang
) VALUES
('Nguyen Van', 'A', 'nguyenvana', '123456', 'M', 'a@gmail.com', '0909123456', '123 Le Lai', '123 Le Lai'),
('Tran Thi', 'B', 'tranthib', '654321', 'F', 'b@gmail.com', '0911222333', '456 Le Loi', '789 Hai Ba Trung');


-- Thêm dữ liệu vào bảng nguoidung_quyen
INSERT INTO nguoidung_quyen (ma_nguoi_dung, ma_quyen) VALUES
(1, 1),
(2, 2);

-- Thêm dữ liệu vào bảng the_loai
INSERT INTO the_loai (ma_the_loai, ten_the_loai) VALUES
('Văn học'),
('Kinh tế'),
('Kỹ năng sống'),
('Thiếu nhi'),
('Lập trình');

-- Thêm dữ liệu vào bảng sach
INSERT INTO sach (ten_sach, ten_tac_gia, isbm, mo_ta, gia_niem_yet, gia_ban, so_luong, trung_binh_xep_hang) VALUES
('Đắc Nhân Tâm', 'Dale Carnegie', 'ISBN001', 'Cuốn sách nổi tiếng về nghệ thuật đối nhân xử thế', 100000, 80000, 50, 4.5),
('Nhà Giả Kim', 'Paulo Coelho', 'ISBN002', 'Câu chuyện về hành trình khám phá bản thân', 90000, 72000, 30, 4.8);

-- Thêm dữ liệu vào bảng sach_theloai
INSERT INTO sach_theloai (ma_sach, ma_the_loai) VALUES
(1, 3),
(2, 3);

-- Thêm dữ liệu vào bảng hinh_anh
INSERT INTO hinh_anh (du_lieu_anh, duong_dan,la_icon, ten_hinh_anh, ma_sach) VALUES
();

-- Thêm dữ liệu vào bảng su_danh_gia
INSERT INTO su_danh_gia (diem_xep_hang, nhan_xet, ma_nguoi_dung, ma_sach) VALUES
(5, 'Sách rất hay và bổ ích', 2, 1),
(4, 'Nội dung cuốn hút', 2, 2);

-- Thêm dữ liệu vào bảng sach_yeu_thich
INSERT INTO sach_yeu_thich (ma_nguoi_dung, ma_sach) VALUES
(2, 1);

-- Thêm dữ liệu vào bảng hinh_thuc_giao_hang
INSERT INTO hinh_thuc_giao_hang (chi_phi_giao_hang, mo_ta, ten_hinh_thuc_giao_hang) VALUES
(15000,'Giao hàng tiêu chuẩn', 'Giao hàng tiêu chuẩn'),
(30000, 'Giao hàng nhanh', 'Giao hàng nhanh');

-- Thêm dữ liệu vào bảng hinh_thuc_thanh_toan
INSERT INTO hinh_thuc_thanh_toan (chi_phi_thanh_toan, mo_ta, ten_hinh_thuc_thanh_toan) VALUES
(15000, 'Thanh toán khi nhận hàng', 'Thanh toán khi nhận hàng'),
(10000, 'Thanh toán online', 'Thanh toán online');

-- Thêm dữ liệu vào bảng don_hang
INSERT INTO don_hang (tong_tien_san_pham, chi_phi_giao_hang, chi_phi_thanh_toan, dia_chi_mua_hang, dia_chi_nhan_hang, ngay_tao, tong_tien,
ma_hình_thuc_giao_hang, ma_hinh_thuc_thanh_toan, ma_nguoi_dung) VALUES
(150000, 15000, 15000, 'testA', 'testB', '2025-6-4', 3000000, 1, 2, 1);

-- Thêm dữ liệu vào bảng chi_tiet_don_hang
INSERT INTO chi_tiet_don_hang (gia_ban, so_luong, ma_don_hang, ma_sach) VALUES
(150000, 1, 1, 1),
(120000, 1, 1, 2); 

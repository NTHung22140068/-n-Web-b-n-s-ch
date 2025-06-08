-- Xóa bảng chi_tiet_gio_hang nếu tồn tại
DROP TABLE IF EXISTS chi_tiet_gio_hang;

-- Xóa bảng gio_hang nếu tồn tại
DROP TABLE IF EXISTS gio_hang;

-- Tạo lại bảng gio_hang
CREATE TABLE gio_hang (
    ma_gio_hang INT AUTO_INCREMENT PRIMARY KEY,
    ma_nguoi_dung INT UNIQUE,
    FOREIGN KEY (ma_nguoi_dung) REFERENCES nguoi_dung(ma_nguoi_dung)
);

-- Tạo lại bảng chi_tiet_gio_hang
CREATE TABLE chi_tiet_gio_hang (
    ma_chi_tiet_gio_hang INT AUTO_INCREMENT PRIMARY KEY,
    ma_gio_hang INT,
    ma_sach INT,
    so_luong INT NOT NULL DEFAULT 1,
    FOREIGN KEY (ma_gio_hang) REFERENCES gio_hang(ma_gio_hang),
    FOREIGN KEY (ma_sach) REFERENCES sach(ma_sach)
); 
-- Thêm hình thức giao hàng
INSERT INTO hinh_thuc_giao_hang (ma_hinh_thuc_giao_hang, ten_hinh_thuc_giao_hang, mo_ta, chi_phi)
VALUES 
(1, 'Giao hàng tiêu chuẩn', 'Giao hàng trong 3-5 ngày', 30000),
(2, 'Giao hàng nhanh', 'Giao hàng trong 1-2 ngày', 50000);

-- Thêm hình thức thanh toán
INSERT INTO hinh_thuc_thanh_toan (ma_hinh_thuc_thanh_toan, ten_hinh_thuc_thanh_toan, mo_ta, phi_thanh_toan)
VALUES 
(1, 'Thanh toán khi nhận hàng', 'Thanh toán bằng tiền mặt khi nhận hàng', 0),
(2, 'Thanh toán online', 'Thanh toán trực tuyến qua thẻ ngân hàng', 0.02); 
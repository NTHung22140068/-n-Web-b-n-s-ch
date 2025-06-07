package com.GDU.webbansach_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "hinh_thuc_thanh_toan")
public class HinhThucThanhToan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_hinh_thuc_thanh_toan")
    private int maHinhThucThanhToan;

    @Column(name = "ten_hinh_thuc_thanh_toan")
    private String tenHinhThucThanhToan;

    @Column(name = "mo_ta")
    private String moTa;

    @Column(name = "chi_phi_thanh_toan")
    private double chiPhiThanhToan;

    // 1 hình thức thanh toán cho nhiều đơn hàng
    @OneToMany(mappedBy = "hinhThucThanhToan", fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH
    })
    private List<DonHang> danhSachDonHang;
}

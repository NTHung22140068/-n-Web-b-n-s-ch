package com.GDU.webbansach_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "chi_tiet_gio_hang")
@Data
public class ChiTietGioHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_chi_tiet_gio_hang")
    private int maChiTietGioHang;

    @ManyToOne
    @JoinColumn(name = "ma_gio_hang")
    private GioHang gioHang;

    @ManyToOne
    @JoinColumn(name = "ma_sach")
    private Sach sach;

    @Column(name = "so_luong")
    private int soLuong;
} 
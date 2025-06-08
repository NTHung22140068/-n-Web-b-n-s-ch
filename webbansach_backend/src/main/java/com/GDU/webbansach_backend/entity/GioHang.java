package com.GDU.webbansach_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "gio_hang")
@Data
public class GioHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_gio_hang")
    private int maGioHang;

    @OneToOne
    @JoinColumn(name = "ma_nguoi_dung", unique = true)
    private NguoiDung nguoiDung;

    @OneToMany(mappedBy = "gioHang", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChiTietGioHang> chiTietGioHangs;
} 
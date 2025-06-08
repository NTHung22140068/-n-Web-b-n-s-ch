package com.GDU.webbansach_backend.security;

public class Endpoints {
    public static final String front_end_host = "http://localhost:3000";

    public static final String[] PUBLIC_GET_ENDPOINTS = {
            "/sach",
            "/sach/**",
            "/hinh-anh",
            "/hinh-anh/**",
            "/nguoi-dung/search/existsTenDangNhap",
            "/nguoi-dung/search/existsEmail",
            "/tai-khoan/kich-hoat",
            "/gio-hang/lay"
    };

    public static final String[] PUBLIC_POST_ENDPOINTS = {
            "/tai-khoan/dang-ky",
            "/tai-khoan/dang-nhap",
            "/tai-khoan/dang-xuat",
            "/gio-hang/them"
    };

    public static final String[] PUBLIC_PUT_ENDPOINTS = {
            "/gio-hang/cap-nhat"
    };

    public static final String[] PUBLIC_DELETE_ENDPOINTS = {
            "/gio-hang/xoa",
            "/gio-hang/xoa-san-pham"
    };

    public static final String[] ADMIN_GET_ENDPOINTS = {
            "/nguoi-dung",
            "/nguoi-dung/**",
    };
}

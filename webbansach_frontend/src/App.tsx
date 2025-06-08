import React, { useState } from "react";
import "./App.css";
import Navbar from "./layouts/header-footer/Navbar";
import Footer from "./layouts/header-footer/footer";
import HomePage from "./layouts/homepage/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./layouts/about/About";
import ChiTietSanPham from "./layouts/products/ChiTietSanPham";
import DangKyNguoiDung from "./layouts/user/DangKyNguoiDung";
import KichHoatTaiKhoan from "./layouts/user/KichHoatTaiKhoan";
import LienHePage from "./layouts/contact/LienHePage";
import DangNhap from "./layouts/user/DangNhap";
import GioHangPage from "./layouts/cart/GioHangPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          tuKhoaTimKiem={tuKhoaTimKiem}
          setTuKhoaTimKiem={setTuKhoaTimKiem}
        />
        <Routes>
          <Route
            path="/"
            element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />}
          />
          <Route
            path="/:maTheLoai"
            element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/sach/:maSach" element={<ChiTietSanPham />} />
          <Route path="/dangKy" element={<DangKyNguoiDung />} />
          <Route path="/dangNhap" element={<DangNhap />} />
          <Route
            path="/kich-hoat/:email/:maKichHoat"
            element={<KichHoatTaiKhoan />}
          />
          <Route path="/lien-he" element={<LienHePage />} />
          <Route path="/gio-hang" element={<GioHangPage />} />
        </Routes>
        <Footer />
        <ToastContainer 
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          style={{ fontSize: '16px' }}
        />
      </BrowserRouter>
    </div>
  );
}

// update
export default App;

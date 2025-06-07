import React, { ChangeEvent, useState } from "react";
import { Search } from "react-bootstrap-icons";
import { Link, NavLink } from "react-router-dom";

interface NavbarProps {
  tuKhoaTimKiem: string;
  setTuKhoaTimKiem: (tuKhoa: string) => void;
}

function Navbar({ tuKhoaTimKiem, setTuKhoaTimKiem }: NavbarProps) {
  const [tuKhoaTamThoi, setTuKhoaTamThoi] = useState("");

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTuKhoaTamThoi(e.target.value);
  };

  const handleSearch = () => {
    setTuKhoaTimKiem(tuKhoaTamThoi);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Logo */}
        <NavLink className="navbar-brand" to="/">
          HUNG STORE
        </NavLink>

        {/* Button toggle cho mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Các mục trong navbar */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link active" to="/">
                Trang chủ
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown1"
                role="button"
                data-bs-toggle="dropdown"
              >
                Thể loại sách
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/1">
                    Thể loại 1
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/2">
                    Thể loại 2
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/3">
                    Thể loại 3
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                Liên hệ
              </a>
            </li>
          </ul>

          {/* Thanh tìm kiếm */}
          <div className="d-flex">
            <input
              className="form-control me-2"
              type="text"
              placeholder="Tìm kiếm"
              aria-label="Search"
              onChange={onSearchInputChange}
              value={tuKhoaTamThoi}
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              onClick={handleSearch}
            >
              <Search />
            </button>
          </div>

          {/* Biểu tượng giỏ hàng*/}
          <ul className="navbar-nav me-1">
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fas fa-shopping-cart"></i>
              </a>
            </li>
          </ul>

          {/* Biểu tượng đăng nhập */}
          <ul className="navbar-nav me-1">
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fas fa-user"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import React, { ChangeEvent, useState, useEffect } from "react";
import { Search, Person, BoxArrowRight, Cart } from "react-bootstrap-icons";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { CART_UPDATE_EVENT } from "../utils/CartUtils";

interface NavbarProps {
  tuKhoaTimKiem: string;
  setTuKhoaTimKiem: (tuKhoa: string) => void;
}

interface UserData {
  tenDangNhap: string;
  hoTen: string;
  email: string;
  role: string;
}

function Navbar({ tuKhoaTimKiem, setTuKhoaTimKiem }: NavbarProps) {
  const [tuKhoaTamThoi, setTuKhoaTamThoi] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Hàm cập nhật số lượng sản phẩm trong giỏ hàng
  const updateCartCount = () => {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      const items = JSON.parse(cartItems);
      setCartItemCount(items.length);
    } else {
      setCartItemCount(0);
    }
  };

  useEffect(() => {
    // Kiểm tra dữ liệu người dùng và giỏ hàng khi component mount
    const loadUserData = () => {
      const storedUserData = localStorage.getItem('userData');
      console.log('Dữ liệu từ localStorage:', storedUserData);
      if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        console.log('Dữ liệu đã parse:', parsedData);
        setUserData(parsedData);
      }

      // Load số lượng sản phẩm trong giỏ hàng
      updateCartCount();
    };

    loadUserData();

    // Lắng nghe sự kiện đăng nhập thành công
    const handleLoginSuccess = (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log('Nhận được event loginSuccess:', customEvent.detail);
      setUserData(customEvent.detail);
    };

    // Lắng nghe sự kiện cập nhật giỏ hàng
    const handleCartUpdate = () => {
      updateCartCount();
    };

    window.addEventListener('loginSuccess', handleLoginSuccess);
    window.addEventListener(CART_UPDATE_EVENT, handleCartUpdate);

    return () => {
      window.removeEventListener('loginSuccess', handleLoginSuccess);
      window.removeEventListener(CART_UPDATE_EVENT, handleCartUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setUserData(null);
    navigate('/');
  };

  const handleHomeClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setTuKhoaTimKiem('');
    // Đặt lại URL về trang chủ và reload để reset state
    window.location.href = '/';
  };

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTuKhoaTamThoi(e.target.value);
  };

  const handleSearch = () => {
    if (tuKhoaTamThoi.trim()) {
      setTuKhoaTimKiem(tuKhoaTamThoi.trim());
      navigate(`/search?q=${encodeURIComponent(tuKhoaTamThoi.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand" href="/" onClick={handleHomeClick}>
          HUNG STORE
        </a>

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
              <a className="nav-link" href="/" onClick={handleHomeClick}>
                Trang chủ
              </a>
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
              <Link className="nav-link" to="/lien-he">
                Liên hệ
              </Link>
            </li>
          </ul>

          {/* Thanh tìm kiếm */}
          <div className="d-flex position-relative">
            <input
              className="form-control me-2"
              type="text"
              placeholder="Nhập tên sách cần tìm..."
              aria-label="Search"
              onChange={onSearchInputChange}
              onKeyPress={handleKeyPress}
              value={tuKhoaTamThoi}
            />
            <button
              className="btn btn-outline-light"
              type="button"
              onClick={handleSearch}
              disabled={!tuKhoaTamThoi.trim()}
            >
              <Search />
            </button>
          </div>

          {/* Biểu tượng giỏ hàng*/}
          <ul className="navbar-nav me-2">
            <li className="nav-item">
              <Link 
                className="nav-link position-relative" 
                to="/gio-hang"
                title="Giỏ hàng"
              >
                <Cart size={22} />
                {cartItemCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>

          {/* Đăng nhập/Đăng ký hoặc User Dropdown */}
          {userData ? (
            <div className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center text-light"
                href="#"
                id="userDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-light p-1 me-2">
                    <Person className="text-dark" size={20} />
                  </div>
                  <span className="d-none d-sm-inline">{userData.hoTen || userData.tenDangNhap}</span>
                </div>
              </a>
              <ul 
                className="dropdown-menu dropdown-menu-end shadow" 
                aria-labelledby="userDropdown"
                style={{ minWidth: '250px' }}
              >
                <li>
                  <div className="dropdown-header border-bottom pb-2">
                    <strong>{userData.hoTen || userData.tenDangNhap}</strong>
                    <br />
                    <small className="text-muted">{userData.email}</small>
                  </div>
                </li>
                <li>
                  <Link to="/thong-tin-tai-khoan" className="dropdown-item">
                    <Person className="me-2" size={16} />
                    Thông tin tài khoản
                  </Link>
                </li>
                <li>
                  <Link to="/lich-su-mua-hang" className="dropdown-item">
                    <i className="fas fa-history me-2"></i>
                    Lịch sử mua hàng
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button 
                    className="dropdown-item text-danger" 
                    onClick={handleLogout}
                  >
                    <BoxArrowRight className="me-2" size={16} />
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="d-flex">
              <Link to="/dangNhap" className="btn btn-outline-light me-2">
                Đăng nhập
              </Link>
              <Link to="/dangKy" className="btn btn-light">
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

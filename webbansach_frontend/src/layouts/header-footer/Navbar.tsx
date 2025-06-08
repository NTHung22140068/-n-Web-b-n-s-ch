import React, { ChangeEvent, useState, useEffect } from "react";
import { Search, Person, BoxArrowRight, Cart } from "react-bootstrap-icons";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

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
      const cartItems = localStorage.getItem('cartItems');
      if (cartItems) {
        const items = JSON.parse(cartItems);
        setCartItemCount(items.length);
      }
    };

    loadUserData();

    // Lắng nghe sự kiện đăng nhập thành công
    const handleLoginSuccess = (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log('Nhận được event loginSuccess:', customEvent.detail);
      setUserData(customEvent.detail);
    };

    window.addEventListener('loginSuccess', handleLoginSuccess);

    // Lắng nghe thay đổi giỏ hàng
    const handleCartChange = () => {
      const cartItems = localStorage.getItem('cartItems');
      if (cartItems) {
        const items = JSON.parse(cartItems);
        setCartItemCount(items.length);
      } else {
        setCartItemCount(0);
      }
    };

    window.addEventListener('storage', handleCartChange);

    return () => {
      window.removeEventListener('loginSuccess', handleLoginSuccess);
      window.removeEventListener('storage', handleCartChange);
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
                  <Link className="dropdown-item py-2" to="/thong-tin-tai-khoan">
                    <Person className="me-2" />
                    Thông tin tài khoản
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item py-2" to="/don-hang">
                    <i className="fas fa-shopping-bag me-2"></i>
                    Đơn hàng của tôi
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button 
                    className="dropdown-item py-2 text-danger" 
                    onClick={handleLogout}
                  >
                    <BoxArrowRight className="me-2" />
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <ul className="navbar-nav align-items-center">
              <li className="nav-item me-2">
                <Link className="nav-link d-flex align-items-center" to="/dangNhap">
                  <Person className="me-1" size={20} />
                  <span>Đăng nhập</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dangKy">
                  Đăng ký
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

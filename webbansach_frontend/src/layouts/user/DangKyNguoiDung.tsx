import React, { useState } from "react";

function DangKyNguoiDung() {
  const [tenDangNhap, setTenDangNhap] = useState("");
  const [email, setEmail] = useState("");
  const [hoDem, setHoDem] = useState("");
  const [ten, setTen] = useState("");
  const [soDienThoai, setSoDienThoai] = useState("");
  const [gioiTinh, setGioiTinh] = useState("M");
  const [matKhau, setMatKhau] = useState("");
  const [matKhauLapLai, setMatKhauLapLai] = useState("");

  // Các biến báo lỗi
  const [errorTenDangNhap, setErrorTenDangNhap] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorMatKhau, setErrorMatKhau] = useState("");
  const [errorMatKhauLapLai, setErrorMatKhauLapLai] = useState("");
  const [thongBao, setThongBao] = useState("");

  // Xử lý thông tin
  const handleSubmit = async (e: React.FormEvent) => {
    setErrorTenDangNhap("");
    setErrorEmail("");
    setErrorMatKhau("");
    setErrorMatKhauLapLai("");

    // tránh click liên tục
    e.preventDefault();

    // kiểm tra các điều kiện và gán kết quả vào biến
    const isTenDangNhapValid = !(await kiemTraTenDangNhapDaTonTai(tenDangNhap));
    const isEmailValid = !(await kiemTraEmailDaTonTai(email));
    const isMatKhauValid = !(await kiemTraMatKhau(matKhau));
    const isMatKhauNhapLaiValid = !(await kiemTraMatKhauLaplai(matKhauLapLai));

    // kiêm tra tất cả các điều kiện
    if (
      isTenDangNhapValid &&
      isEmailValid &&
      isMatKhauValid &&
      isMatKhauNhapLaiValid
    ) {
      try {
        const url = "http://localhost:8081/tai-khoan/dang-ky";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            tenDangNhap: tenDangNhap,
            email: email,
            matKhau: matKhau,
            hoDem: hoDem,
            ten: ten,
            soDienThoai: soDienThoai,
            gioiTinh: gioiTinh,
            daKichHoat: false,
            maKichHoat: "",
          }),
        });
        if (response.ok) {
          setThongBao(
            "Đăng ký thành công, vui lòng kiểm tra email để kích hoạt"
          );
        } else {
          console.log(response.json());
          setThongBao("Đã xảy ra lỗi trong quá trình đăng ký tài khoản.");
        }
      } catch (error) {
        setThongBao("Đã xảy ra lỗi trong quá trình đăng ký tài khoản.");
      }
    }
  };

  // kiểm tra tên đăng nhập
  const kiemTraTenDangNhapDaTonTai = async (tenDangNhap: string) => {
    // endpoint
    const url = `http://localhost:8081/nguoi-dung/search/existsByTenDangNhap?tenDangNhap=${tenDangNhap}`;

    // call api
    try {
      const response = await fetch(url);

      const data = await response.text();
      if (data === "true") {
        setErrorTenDangNhap("Tên đăng nhập đã tồn tại.");

        return true;
      }
      return false;
    } catch (error) {
      console.error("Lỗi khi kiểm tra tên đăng nhập: ", error);
      return false;
    }
  };

  const handleTenDangNhapChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Thay đổi giá trị
    setTenDangNhap(e.target.value);

    // kiểm tra
    setErrorTenDangNhap("");

    // kiểm tra sự tồn tại
    return kiemTraTenDangNhapDaTonTai(e.target.value);
  };

  // kiêm tra mật khẩu
  const kiemTraMatKhau = (matKhau: string) => {
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&]{8,}$/;

    if (!passwordRegex.test(matKhau)) {
      setErrorMatKhau(
        "Mật khẩu phải có ít nhất 8 kí tự và bao gồm ít nhất 1 ký tự đặc biệt (!@#$%^&*)"
      );
      return true;
    } else {
      setErrorMatKhau("");
      return false;
    }
  };

  const handlMatKhauChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Thay đổi giá trị
    setMatKhau(e.target.value);

    // kiểm tra
    setErrorMatKhau("");

    // kiểm tra sự tồn tại
    return kiemTraMatKhau(e.target.value);
  };

  // kiểm tra mật khẩu lập lại
  const kiemTraMatKhauLaplai = (matKhauLapLai: string) => {
    if (matKhauLapLai !== matKhau) {
      setErrorMatKhauLapLai("Mật khẩu không trùng khớp.");
      return true;
    } else {
      setErrorMatKhauLapLai("");
      return false;
    }
  };

  const handleMatKhauNhapLaiChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Thay đổi giá trị
    setMatKhauLapLai(e.target.value);

    // kiểm tra
    setErrorMatKhauLapLai("");

    // kiểm tra sự tồn tại
    return kiemTraMatKhauLaplai(e.target.value);
  };

  // kiêm tra email
  const kiemTraEmailDaTonTai = async (email: string) => {
    // endpoint
    const url = `http://localhost:8081/nguoi-dung/search/existsByEmail?email=${email}`;

    // call api
    try {
      const response = await fetch(url);

      const data = await response.text();
      if (data === "true") {
        setErrorEmail("Email đã tồn tại.");

        return true;
      }
      return false;
    } catch (error) {
      console.error("Lỗi khi kiểm tra Email: ", error);
      return false;
    }
  };

  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Thay đổi giá trị
    setEmail(e.target.value);

    // kiểm tra
    setErrorEmail("");

    // kiểm tra sự tồn tại
    return kiemTraEmailDaTonTai(e.target.value);
  };

  return (
    <div className="container">
      <h1 className="mt-5 text-center">Đăng ký</h1>
      <div className="mb-3 col-md-6 col-12 mx-auto">
        <form action="" onSubmit={handleSubmit} className="form">
          <div className="mb-3">
            <label htmlFor="tenDangNhap" className="form-label">
              Tên đăng nhập
            </label>
            <input
              type="text"
              id="tenDangNhap"
              className="form-control"
              value={tenDangNhap}
              onChange={handleTenDangNhapChange}
            />
            <div style={{ color: "red" }}>{errorTenDangNhap}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="form-control"
              value={email}
              onChange={handleEmailChange}
            />
            <div style={{ color: "red" }}>{errorEmail}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="matKhau" className="form-label">
              Mật khẩu
            </label>
            <input
              type="password"
              id="matKhau"
              className="form-control"
              value={matKhau}
              onChange={handlMatKhauChange}
            />
            <div style={{ color: "red" }}>{errorMatKhau}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="matKhauLapLai" className="form-label">
              Nhập lại mật khẩu
            </label>
            <input
              type="password"
              id="matKhauLapLai"
              className="form-control"
              value={matKhauLapLai}
              onChange={handleMatKhauNhapLaiChange}
            />
            <div style={{ color: "red" }}>{errorMatKhauLapLai}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="hoDem" className="form-label">
              Họ đệm
            </label>
            <input
              type="text"
              id="hoDem"
              className="form-control"
              value={hoDem}
              onChange={(e) => setHoDem(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ten" className="form-label">
              Tên
            </label>
            <input
              type="text"
              id="ten"
              className="form-control"
              value={ten}
              onChange={(e) => setTen(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="soDienThoai" className="form-label">
              Số điện thoại
            </label>
            <input
              type="text"
              id="soDienThoai"
              className="form-control"
              value={soDienThoai}
              onChange={(e) => setSoDienThoai(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gioiTinh" className="form-label">
              Giới tính
            </label>
            <input
              type="text"
              id="gioiTinh"
              className="form-control"
              value={gioiTinh}
              onChange={(e) => setGioiTinh(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Đăng ký
            </button>
            <div style={{ color: "green" }}>{thongBao}</div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DangKyNguoiDung;

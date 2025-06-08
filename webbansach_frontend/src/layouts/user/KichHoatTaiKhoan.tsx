import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';

function KichHoatTaiKhoan() {
  const { email } = useParams();
  const { maKichHoat } = useParams();
  const [daKichHoat, setDaKichHoat] = useState(false);
  const [thongBao, setThongBao] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (email && maKichHoat) {
      thucHienKichHoat();
    }
  }, []);

  const thucHienKichHoat = async () => {
    try {
      const url: string = `http://localhost:8081/tai-khoan/kich-hoat?email=${email}&maKichHoat=${maKichHoat}`;
      const response = await fetch(url, { method: "GET" });

      if (response.ok) {
        setDaKichHoat(true);
      } else {
        const errorText = await response.text();
        setThongBao(errorText || "Có lỗi xảy ra khi kích hoạt tài khoản");
      }
    } catch (error) {
      setThongBao("Không thể kết nối đến server. Vui lòng thử lại sau.");
      console.log("Lỗi khi kích hoạt: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Đang kích hoạt...</span>
          </div>
          <p className="mt-3">Đang kích hoạt tài khoản...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-0 shadow">
            <div className="card-body text-center p-5">
              {daKichHoat ? (
                <>
                  <CheckCircleFill className="text-success mb-4" size={60} />
                  <h2 className="card-title mb-4">Kích Hoạt Thành Công!</h2>
                  <p className="card-text mb-4">
                    Tài khoản của bạn đã được kích hoạt thành công. 
                    Bạn có thể đăng nhập và bắt đầu sử dụng dịch vụ của chúng tôi.
                  </p>
                  <div className="d-grid gap-2">
                    <Link to="/dangNhap" className="btn btn-primary btn-lg">
                      Đăng nhập ngay
                    </Link>
                    <Link to="/" className="btn btn-outline-secondary">
                      Về trang chủ
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <XCircleFill className="text-danger mb-4" size={60} />
                  <h2 className="card-title mb-4">Kích Hoạt Không Thành Công</h2>
                  <p className="card-text text-danger mb-4">
                    {thongBao}
                  </p>
                  <div className="d-grid gap-2">
                    <Link to="/dangKy" className="btn btn-primary">
                      Đăng ký tài khoản mới
                    </Link>
                    <Link to="/" className="btn btn-outline-secondary">
                      Về trang chủ
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KichHoatTaiKhoan;

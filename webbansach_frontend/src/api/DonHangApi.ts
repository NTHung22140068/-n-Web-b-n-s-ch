import { base_url } from "./config";

export const taoDonHang = async (donHang: any) => {
    const response = await fetch(`${base_url}/don-hang/tao-don-hang`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(donHang)
    });

    if (!response.ok) {
        throw new Error('Không thể tạo đơn hàng');
    }

    return response.json();
};

export const layDonHangTheoNguoiDung = async (maNguoiDung: number) => {
    const response = await fetch(`${base_url}/don-hang/nguoi-dung/${maNguoiDung}`);

    if (!response.ok) {
        throw new Error('Không thể lấy danh sách đơn hàng');
    }

    return response.json();
};

export const layChiTietDonHang = async (maDonHang: number) => {
    const response = await fetch(`${base_url}/don-hang/${maDonHang}`);

    if (!response.ok) {
        throw new Error('Không thể lấy chi tiết đơn hàng');
    }

    return response.json();
}; 
import { toast } from 'react-toastify';

export interface CartItem {
    maSach: number;
    tenSach: string;
    giaBan: number;
    soLuong: number;
    urlHinhAnh?: string;
}

export const addToCart = (
    maSach: number,
    tenSach: string,
    giaBan: number,
    soLuong: number = 1,
    urlHinhAnh?: string
) => {
    // Kiểm tra đăng nhập
    const userData = localStorage.getItem('userData');
    if (!userData) {
        toast.error('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
        return false;
    }

    try {
        // Lấy giỏ hàng hiện tại từ localStorage
        let cartItems: CartItem[] = [];
        const existingCart = localStorage.getItem('cartItems');
        if (existingCart) {
            cartItems = JSON.parse(existingCart);
        }

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        const existingItemIndex = cartItems.findIndex(item => item.maSach === maSach);

        if (existingItemIndex !== -1) {
            // Nếu sản phẩm đã tồn tại, tăng số lượng
            cartItems[existingItemIndex].soLuong += soLuong;
        } else {
            // Nếu sản phẩm chưa tồn tại, thêm mới
            cartItems.push({
                maSach,
                tenSach,
                giaBan,
                soLuong,
                urlHinhAnh
            });
        }

        // Lưu giỏ hàng mới vào localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Kích hoạt sự kiện storage để Navbar cập nhật số lượng
        window.dispatchEvent(new Event('storage'));

        toast.success('Đã thêm sản phẩm vào giỏ hàng!');
        return true;
    } catch (error) {
        console.error('Lỗi khi thêm vào giỏ hàng:', error);
        toast.error('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng!');
        return false;
    }
}; 
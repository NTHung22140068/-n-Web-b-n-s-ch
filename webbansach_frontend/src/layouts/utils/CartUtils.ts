import { toast } from 'react-toastify';

export interface CartItem {
    maSach: number;
    tenSach: string;
    giaBan: number;
    soLuong: number;
    urlHinhAnh?: string;
}

// Tạo custom event để cập nhật giỏ hàng
export const CART_UPDATE_EVENT = 'cartUpdate';
export const dispatchCartUpdateEvent = () => {
    window.dispatchEvent(new Event(CART_UPDATE_EVENT));
};

export const addToCart = async (
    maSach: number,
    tenSach: string,
    giaBan: number,
    soLuong: number = 1,
    urlHinhAnh?: string
) => {
    // Kiểm tra đăng nhập
    const userData = localStorage.getItem('userData');
    if (!userData) {
        toast.warning('🔒 Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
        return false;
    }

    try {
        const user = JSON.parse(userData);
        const token = localStorage.getItem('token');
        
        const response = await fetch(`http://localhost:8081/gio-hang/them`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                tenDangNhap: user.tenDangNhap,
                maSach: maSach,
                soLuong: soLuong
            })
        });

        if (response.ok) {
            toast.success(`🛒 Đã thêm sách "${tenSach}" vào giỏ hàng!`);
            dispatchCartUpdateEvent();
            return true;
        } else {
            const error = await response.text();
            toast.error(`❌ ${error}`);
            return false;
        }
    } catch (error) {
        console.error('Lỗi khi thêm vào giỏ hàng:', error);
        toast.error('❌ Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng!');
        return false;
    }
};

export const removeFromCart = async (maSach: number) => {
    const userData = localStorage.getItem('userData');
    if (!userData) return;

    try {
        const user = JSON.parse(userData);
        const token = localStorage.getItem('token');
        
        const response = await fetch(`http://localhost:8081/gio-hang/xoa-san-pham`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                tenDangNhap: user.tenDangNhap,
                maSach: maSach
            })
        });

        if (response.ok) {
            dispatchCartUpdateEvent();
            toast.info('🗑️ Đã xóa sản phẩm khỏi giỏ hàng!');
        } else {
            const error = await response.text();
            toast.error(`❌ ${error}`);
        }
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        toast.error('❌ Có lỗi xảy ra khi xóa sản phẩm!');
    }
};

export const updateCartItemQuantity = async (maSach: number, newQuantity: number) => {
    const userData = localStorage.getItem('userData');
    if (!userData) return;

    try {
        const user = JSON.parse(userData);
        const token = localStorage.getItem('token');
        
        const response = await fetch(`http://localhost:8081/gio-hang/cap-nhat`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                tenDangNhap: user.tenDangNhap,
                maSach: maSach,
                soLuong: newQuantity
            })
        });

        if (response.ok) {
            dispatchCartUpdateEvent();
            toast.info('📝 Đã cập nhật số lượng sản phẩm!');
        } else {
            const error = await response.text();
            toast.error(`❌ ${error}`);
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật số lượng:', error);
        toast.error('❌ Có lỗi xảy ra khi cập nhật số lượng!');
    }
};

export const getCart = async (): Promise<CartItem[]> => {
    const userData = localStorage.getItem('userData');
    if (!userData) return [];

    try {
        const user = JSON.parse(userData);
        const token = localStorage.getItem('token');
        
        const response = await fetch(`http://localhost:8081/gio-hang/lay?tenDangNhap=${encodeURIComponent(user.tenDangNhap)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const cartItems = await response.json();
            return cartItems;
        } else {
            const error = await response.text();
            toast.error(`❌ ${error}`);
            return [];
        }
    } catch (error) {
        console.error('Lỗi khi lấy giỏ hàng:', error);
        toast.error('❌ Có lỗi xảy ra khi lấy giỏ hàng!');
        return [];
    }
}; 
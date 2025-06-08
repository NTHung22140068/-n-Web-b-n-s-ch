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
        toast.warning('🔒 Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
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
            toast.info(`📚 Đã cập nhật số lượng sách "${tenSach}" trong giỏ hàng!`);
        } else {
            // Nếu sản phẩm chưa tồn tại, thêm mới
            cartItems.push({
                maSach,
                tenSach,
                giaBan,
                soLuong,
                urlHinhAnh
            });
            toast.success(`🛒 Đã thêm sách "${tenSach}" vào giỏ hàng!`);
        }

        // Lưu giỏ hàng mới vào localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Kích hoạt custom event để cập nhật UI
        dispatchCartUpdateEvent();

        return true;
    } catch (error) {
        console.error('Lỗi khi thêm vào giỏ hàng:', error);
        toast.error('❌ Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng!');
        return false;
    }
};

// Hàm xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = (maSach: number) => {
    try {
        // Lấy giỏ hàng hiện tại
        const existingCart = localStorage.getItem('cartItems');
        if (!existingCart) return;

        let cartItems: CartItem[] = JSON.parse(existingCart);
        
        // Lọc bỏ sản phẩm cần xóa
        cartItems = cartItems.filter(item => item.maSach !== maSach);
        
        // Cập nhật localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // Kích hoạt custom event để cập nhật UI
        dispatchCartUpdateEvent();
        
        toast.info('🗑️ Đã xóa sản phẩm khỏi giỏ hàng!');
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        toast.error('❌ Có lỗi xảy ra khi xóa sản phẩm!');
    }
};

// Hàm cập nhật số lượng sản phẩm trong giỏ hàng
export const updateCartItemQuantity = (maSach: number, newQuantity: number) => {
    try {
        // Lấy giỏ hàng hiện tại
        const existingCart = localStorage.getItem('cartItems');
        if (!existingCart) return;

        let cartItems: CartItem[] = JSON.parse(existingCart);
        
        // Tìm và cập nhật số lượng sản phẩm
        const itemIndex = cartItems.findIndex(item => item.maSach === maSach);
        if (itemIndex !== -1) {
            cartItems[itemIndex].soLuong = newQuantity;
            
            // Cập nhật localStorage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            
            // Kích hoạt custom event để cập nhật UI
            dispatchCartUpdateEvent();
            
            toast.info('📝 Đã cập nhật số lượng sản phẩm!');
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật số lượng:', error);
        toast.error('❌ Có lỗi xảy ra khi cập nhật số lượng!');
    }
}; 
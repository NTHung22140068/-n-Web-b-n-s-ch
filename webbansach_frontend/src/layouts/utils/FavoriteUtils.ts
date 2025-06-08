import { toast } from 'react-toastify';

export interface FavoriteBook {
    maSach: number;
    tenSach: string;
    giaBan: number;
    giaNiemYet: number;
    moTa: string;
    trungBinhXepHang: number;
}

// Tạo custom event để cập nhật trạng thái yêu thích
export const FAVORITE_UPDATE_EVENT = 'favoriteUpdate';
export const dispatchFavoriteUpdateEvent = () => {
    window.dispatchEvent(new Event(FAVORITE_UPDATE_EVENT));
};

export const addToFavorites = async (maSach: number) => {
    const userData = localStorage.getItem('userData');
    if (!userData) {
        toast.warning('🔒 Vui lòng đăng nhập để thêm vào danh sách yêu thích!');
        return false;
    }

    try {
        const user = JSON.parse(userData);
        const token = localStorage.getItem('token');
        
        const response = await fetch(`http://localhost:8081/sach-yeu-thich/them`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify({
                tenDangNhap: user.tenDangNhap,
                maSach: maSach
            })
        });

        if (response.ok) {
            toast.success('💖 Đã thêm vào danh sách yêu thích!');
            dispatchFavoriteUpdateEvent();
            return true;
        } else {
            const error = await response.text();
            toast.error(`❌ ${error}`);
            return false;
        }
    } catch (error) {
        console.error('Lỗi khi thêm vào yêu thích:', error);
        toast.error('❌ Có lỗi xảy ra khi thêm vào danh sách yêu thích!');
        return false;
    }
};

export const removeFromFavorites = async (maSach: number) => {
    const userData = localStorage.getItem('userData');
    if (!userData) return;

    try {
        const user = JSON.parse(userData);
        const token = localStorage.getItem('token');
        
        const response = await fetch(`http://localhost:8081/sach-yeu-thich/xoa`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify({
                tenDangNhap: user.tenDangNhap,
                maSach: maSach
            })
        });

        if (response.ok) {
            toast.info('💔 Đã xóa khỏi danh sách yêu thích!');
            dispatchFavoriteUpdateEvent();
            return true;
        } else {
            const error = await response.text();
            toast.error(`❌ ${error}`);
            return false;
        }
    } catch (error) {
        console.error('Lỗi khi xóa khỏi yêu thích:', error);
        toast.error('❌ Có lỗi xảy ra khi xóa khỏi danh sách yêu thích!');
        return false;
    }
};

export const getFavorites = async (): Promise<FavoriteBook[]> => {
    const userData = localStorage.getItem('userData');
    if (!userData) return [];

    try {
        const user = JSON.parse(userData);
        const token = localStorage.getItem('token');
        
        const response = await fetch(
            `http://localhost:8081/sach-yeu-thich/danh-sach?tenDangNhap=${encodeURIComponent(user.tenDangNhap)}`, 
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include'
            }
        );

        if (response.ok) {
            return await response.json();
        } else {
            const error = await response.text();
            toast.error(`❌ ${error}`);
            return [];
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh sách yêu thích:', error);
        toast.error('❌ Có lỗi xảy ra khi lấy danh sách yêu thích!');
        return [];
    }
};

export const checkIsFavorite = async (maSach: number): Promise<boolean> => {
    const userData = localStorage.getItem('userData');
    if (!userData) return false;

    try {
        const user = JSON.parse(userData);
        const token = localStorage.getItem('token');
        
        const response = await fetch(
            `http://localhost:8081/sach-yeu-thich/kiem-tra?tenDangNhap=${encodeURIComponent(user.tenDangNhap)}&maSach=${maSach}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include'
            }
        );

        if (response.ok) {
            return await response.json();
        }
        return false;
    } catch (error) {
        console.error('Lỗi khi kiểm tra trạng thái yêu thích:', error);
        return false;
    }
}; 
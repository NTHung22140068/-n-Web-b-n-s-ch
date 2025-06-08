import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FavoriteBook, getFavorites, removeFromFavorites, FAVORITE_UPDATE_EVENT } from '../utils/FavoriteUtils';
import { addToCart } from '../utils/CartUtils';
import renderRating from '../utils/SaoXepHang';
import dinhDangSo from '../utils/DinhDangSo';

const DanhSachYeuThich: React.FC = () => {
    const [favorites, setFavorites] = useState<FavoriteBook[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadFavorites = async () => {
        const items = await getFavorites();
        setFavorites(items);
        setIsLoading(false);
    };

    useEffect(() => {
        loadFavorites();

        // Lắng nghe sự kiện cập nhật yêu thích
        window.addEventListener(FAVORITE_UPDATE_EVENT, loadFavorites);
        return () => {
            window.removeEventListener(FAVORITE_UPDATE_EVENT, loadFavorites);
        };
    }, []);

    const handleRemoveFromFavorites = async (maSach: number) => {
        await removeFromFavorites(maSach);
        setFavorites(prevFavorites => prevFavorites.filter(book => book.maSach !== maSach));
    };

    const handleAddToCart = async (book: FavoriteBook) => {
        await addToCart(book.maSach, book.tenSach, book.giaBan, 1);
    };

    if (isLoading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Đang tải...</span>
                </div>
            </div>
        );
    }

    if (favorites.length === 0) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    <h2 className="mb-4">Danh Sách Yêu Thích Trống</h2>
                    <p className="text-muted mb-4">Bạn chưa có sách nào trong danh sách yêu thích</p>
                    <Link to="/" className="btn btn-primary btn-lg">
                        Khám phá sách ngay
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Danh Sách Yêu Thích</h2>
            <div className="row">
                {favorites.map(book => (
                    <div key={book.maSach} className="col-md-3 mb-4">
                        <div className="card h-100">
                            <Link to={`/sach/${book.maSach}`}>
                                <img
                                    src={`http://localhost:8081/hinh-anh/sach/${book.maSach}`}
                                    alt={book.tenSach}
                                    className="card-img-top"
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                            </Link>
                            <div className="card-body d-flex flex-column">
                                <Link
                                    to={`/sach/${book.maSach}`}
                                    style={{ textDecoration: "none" }}
                                >
                                    <h5 className="card-title">{book.tenSach}</h5>
                                </Link>
                                <div className="price row mt-auto">
                                    <span className="original-price col-6 text-end">
                                        <del>{dinhDangSo(book.giaNiemYet || 0)}</del>
                                    </span>
                                    <span className="discounted-price col-6 text-end">
                                        <strong>{dinhDangSo(book.giaBan)} đ</strong>
                                    </span>
                                </div>
                                <div className="mt-2">
                                    {renderRating(book.trungBinhXepHang || 0)}
                                </div>
                                <div className="mt-3 d-flex justify-content-between">
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => handleRemoveFromFavorites(book.maSach)}
                                        title="Xóa khỏi yêu thích"
                                    >
                                        <i className="fas fa-heart-broken"></i>
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleAddToCart(book)}
                                        title="Thêm vào giỏ hàng"
                                    >
                                        <i className="fas fa-shopping-cart"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DanhSachYeuThich; 
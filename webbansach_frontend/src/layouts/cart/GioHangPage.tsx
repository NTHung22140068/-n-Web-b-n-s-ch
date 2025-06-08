import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash, PlusCircle, DashCircle } from "react-bootstrap-icons";
import { CartItem, removeFromCart, updateCartItemQuantity, getCart } from "../utils/CartUtils";
import { layMotAnhcuaMotSach } from "../../api/HinhAnhApi";
import HinhAnhModel from "../../models/HinhAnhModel";

interface CartItemWithImage extends CartItem {
    hinhAnh?: HinhAnhModel;
}

const GioHangPage = () => {
    const [cartItems, setCartItems] = useState<CartItemWithImage[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadCartItems = async () => {
            const items = await getCart();
            
            // Lấy hình ảnh cho mỗi sản phẩm
            const itemsWithImages = await Promise.all(
                items.map(async (item) => {
                    try {
                        const hinhAnhs = await layMotAnhcuaMotSach(item.maSach);
                        return {
                            ...item,
                            hinhAnh: hinhAnhs[0]
                        };
                    } catch (error) {
                        console.error(`Lỗi khi lấy hình ảnh cho sách ${item.maSach}:`, error);
                        return item;
                    }
                })
            );
            
            setCartItems(itemsWithImages);
            setIsLoading(false);
        };
        loadCartItems();
    }, []);

    const handleRemoveItem = async (maSach: number) => {
        await removeFromCart(maSach);
        setCartItems(prevItems => prevItems.filter(item => item.maSach !== maSach));
    };

    const handleQuantityChange = async (maSach: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        
        await updateCartItemQuantity(maSach, newQuantity);
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.maSach === maSach ? { ...item, soLuong: newQuantity } : item
            )
        );
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.giaBan * item.soLuong), 0);
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

    if (cartItems.length === 0) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    {/* <img 
                        src="/images/empty-cart.png" 
                        alt="Giỏ hàng trống" 
                        style={{ maxWidth: '200px', marginBottom: '2rem' }}
                    /> */}
                    <h2 className="mb-4">Giỏ Hàng Trống</h2>
                    <p className="text-muted mb-4">Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
                    <Link to="/" className="btn btn-primary btn-lg">
                        Tiếp tục mua sắm
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Giỏ Hàng Của Bạn</h2>
            
            <div className="row">
                <div className="col-lg-8">
                    {/* Danh sách sản phẩm */}
                    <div className="card shadow-sm">
                        <div className="card-body">
                            {cartItems.map(item => (
                                <div key={item.maSach} className="row mb-4 align-items-center">
                                    <div className="col-md-2">
                                        <img 
                                            src={item.hinhAnh?.duLieuAnh || '/images/default-book.png'} 
                                            alt={item.tenSach}
                                            className="img-fluid rounded"
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <h5 className="mb-1">
                                            <Link to={`/sach/${item.maSach}`} className="text-decoration-none">
                                                {item.tenSach}
                                            </Link>
                                        </h5>
                                        <p className="text-muted mb-0">Mã sách: {item.maSach}</p>
                                    </div>
                                    <div className="col-md-2 text-end">
                                        <p className="fw-bold mb-0">
                                            {item.giaBan.toLocaleString('vi-VN')}đ
                                        </p>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="d-flex align-items-center justify-content-center">
                                            <button 
                                                className="btn btn-link text-dark p-0"
                                                onClick={() => handleQuantityChange(item.maSach, item.soLuong - 1)}
                                            >
                                                <DashCircle size={20} />
                                            </button>
                                            <input 
                                                type="number" 
                                                className="form-control mx-2 text-center" 
                                                style={{ width: '60px' }}
                                                value={item.soLuong}
                                                onChange={(e) => handleQuantityChange(item.maSach, parseInt(e.target.value) || 1)}
                                                min="1"
                                            />
                                            <button 
                                                className="btn btn-link text-dark p-0"
                                                onClick={() => handleQuantityChange(item.maSach, item.soLuong + 1)}
                                            >
                                                <PlusCircle size={20} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-md-1 text-end">
                                        <button 
                                            className="btn btn-link text-danger p-0"
                                            onClick={() => handleRemoveItem(item.maSach)}
                                        >
                                            <Trash size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tổng tiền và thanh toán */}
                <div className="col-lg-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Tổng Đơn Hàng</h5>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Tạm tính</span>
                                <span>{calculateTotal().toLocaleString('vi-VN')}đ</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Phí vận chuyển</span>
                                <span>Miễn phí</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-4">
                                <strong>Tổng cộng</strong>
                                <strong className="text-primary">
                                    {calculateTotal().toLocaleString('vi-VN')}đ
                                </strong>
                            </div>
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary btn-lg">
                                    Tiến hành thanh toán
                                </button>
                                <Link to="/" className="btn btn-outline-secondary">
                                    Tiếp tục mua sắm
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GioHangPage; 
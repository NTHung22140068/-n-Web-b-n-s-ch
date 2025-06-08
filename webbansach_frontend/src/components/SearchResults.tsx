import React from 'react';
import { Link } from 'react-router-dom';

interface Book {
    maSach: number;
    tenSach: string;
    giaBan: number;
    moTa: string;
    urlHinhAnh: string;
}

interface SearchResultsProps {
    books: Book[];
    isLoading: boolean;
    error: string | null;
}

const SearchResults: React.FC<SearchResultsProps> = ({ books, isLoading, error }) => {
    if (isLoading) {
        return (
            <div className="container mt-4">
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Đang tìm kiếm...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </div>
        );
    }

    if (books.length === 0) {
        return (
            <div className="container mt-4">
                <div className="text-center p-5 bg-light rounded shadow-sm">
                    <img 
                        src="/images/no-results.png" 
                        alt="Không tìm thấy kết quả"
                        style={{ width: '150px', marginBottom: '20px' }}
                    />
                    <h3 className="text-muted">Không tìm thấy sách phù hợp</h3>
                    <p className="text-muted mb-4">Vui lòng thử lại với từ khóa khác</p>
                    <Link to="/" className="btn btn-primary">
                        Quay về trang chủ
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Kết quả tìm kiếm</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {books.map((book) => (
                    <div key={book.maSach} className="col">
                        <div className="card h-100 shadow-sm">
                            <img
                                src={book.urlHinhAnh}
                                className="card-img-top"
                                alt={book.tenSach}
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title text-truncate">{book.tenSach}</h5>
                                <p className="card-text text-truncate">{book.moTa}</p>
                                <p className="card-text">
                                    <strong>{book.giaBan.toLocaleString('vi-VN')} đ</strong>
                                </p>
                                <Link 
                                    to={`/sach/${book.maSach}`} 
                                    className="btn btn-outline-primary w-100"
                                >
                                    Xem chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults; 
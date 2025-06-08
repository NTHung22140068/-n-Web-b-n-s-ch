import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchResults from '../components/SearchResults';

interface Book {
    maSach: number;
    tenSach: string;
    giaBan: number;
    moTa: string;
    urlHinhAnh: string;
}

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('q') || '';
    
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!searchTerm.trim()) return;

            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost:8081/api/sach/search?tuKhoa=${encodeURIComponent(searchTerm)}`);
                
                if (!response.ok) {
                    throw new Error('Có lỗi xảy ra khi tìm kiếm sách');
                }

                const data = await response.json();
                setBooks(data);
            } catch (err) {
                setError('Không thể tìm kiếm sách. Vui lòng thử lại sau.');
                console.error('Search error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSearchResults();
    }, [searchTerm]);

    return (
        <div className="min-vh-100">
            <SearchResults 
                books={books}
                isLoading={isLoading}
                error={error}
            />
        </div>
    );
};

export default SearchPage; 
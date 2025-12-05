import React, { useState, useEffect } from 'react';
import { fetchBooks } from '../services/bookService';  // 가짜 데이터 활용
import BookCard from '../components/BookCard';

function BookListPage() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const loadBooks = async () => {
            const data = await fetchBooks(searchTerm);  // 가짜 데이터 활용
            setBooks(data);
        };
        loadBooks();
    }, [searchTerm]);

    return (
        <div>
            <h1>도서 목록</h1>
            <input
                type="text"
                placeholder="검색어 입력"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ padding: '8px', marginBottom: '20px', width: '100%', maxWidth: '300px' }}
            />
            {Array.isArray(books) && books.map(book => (
                <BookCard key={book.id} book={book} />
            ))}
        </div>
    );
}

export default BookListPage;


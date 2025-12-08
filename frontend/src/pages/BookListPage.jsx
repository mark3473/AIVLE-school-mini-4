import React, { useState } from 'react';
import BookCard from '../components/BookCard';
import './BookListPage.css';
import Header from '../components/Header';

function BookListPage({ books, setBooks }) {
    const [searchTerm, setSearchTerm] = useState('');

    // 검색어 필터링
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="page-container">
            <div className="main-content">
                <Header />
                <div className="content">
                    <h1>도서 목록</h1>
                    <input
                        type="text"
                        placeholder="검색어 입력"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        style={{ padding: '8px', marginBottom: '20px', width: '100%', maxWidth: '300px' }}
                    />
                    <div className="book-list">
                        {filteredBooks.length > 0 ? (
                            filteredBooks.map((book) => (
                                <BookCard
                                    key={book.id}  // index 대신 id 사용
                                    book={book}    // 전체 book 객체 전달
                                    setBooks={setBooks} // 상태 업데이트 함수 전달
                                />
                            ))
                        ) : (
                            <p>등록된 도서가 없습니다.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookListPage;






import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditBookPage from "../pages/EditBookPage.jsx";

// 추가: react-router-dom의 useNavigate 사용

function BookCard({ book, setBooks, onClick }) {
    const [showActions, setShowActions] = useState(false);
    const navigate = useNavigate();

    const handleCardClick = (e) => {
        setShowActions(prev => !prev);
        if (onClick) onClick(); // 상위 컴포넌트로 클릭 전달
    };

    const handleDelete = () => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;
        setBooks(prev => prev.filter(b => b.id !== book.id));
    };

    const handleEdit = () => {
        navigate(`/edit-book/${book.id}`);
    };

    return (
        <div
            className="book-card"
            style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px', display: 'flex', cursor: 'pointer', backgroundColor: showActions ? '#f9f9f9' : '#fff' }}
            onClick={handleCardClick}
        >
            <div className="book-cover">
                <img
                    src={book.cover_img || "https://via.placeholder.com/100x150"}
                    alt="book cover"
                    style={{ width: '100px', height: '150px', marginRight: '20px' }}
                />
            </div>

            <div className="book-info" style={{ flex: 1 }}>
                <h3>{book.title}</h3>
                <p className="author">저자: {book.author}</p>
                <p className="isbn">ISBN: {book.isbn}</p>
                <p className="publisher">출판사: {book.publisher}</p>
                <p className="genre">장르: {book.genre}</p>

                {showActions && (
                    <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                        <Button variant="outlined" color="primary" onClick={(e) => { e.stopPropagation(); handleEdit(); }}>
                            수정
                        </Button>
                        <Button variant="outlined" color="error" onClick={(e) => { e.stopPropagation(); handleDelete(); }}>
                            삭제
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
export default BookCard;





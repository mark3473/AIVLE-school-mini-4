import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function BookDetailModal({ book, onClose }) {
    if (!book) return null; // 선택된 도서가 없으면 아무 것도 렌더링하지 않음

    return (
        <Box
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                minWidth: '300px',
                maxWidth: '500px',
                maxHeight: '80vh',
                overflowY: 'auto',
            }}
        >
            <Typography variant="h5" gutterBottom>{book.title}</Typography>
            <Typography variant="body1"><strong>작가:</strong> {book.author}</Typography>
            <Typography variant="body1"><strong>출판사:</strong> {book.publisher}</Typography>
            <Typography variant="body1"><strong>장르:</strong> {book.genre}</Typography>
            <Typography variant="body1"><strong>줄거리:</strong> {book.description}</Typography>
            <Button variant="outlined" color="primary" style={{ marginTop: '20px' }} onClick={onClose}>
                닫기
            </Button>
        </Box>
    );
}

export default BookDetailModal;


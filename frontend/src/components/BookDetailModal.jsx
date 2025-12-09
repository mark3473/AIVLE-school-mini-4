import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    maxHeight: '80vh',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
};

function BookDetailModal({ book, onClose , onDelete }) {
    if (!book) return null;

    const handleDelete = () => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            onDelete(book.id); // book.id를 부모로 전달
            onClose(); // 삭제 후 모달 닫기
        }
    };

    return (
        <Box sx={style}>
            <Typography variant="h5" component="h2" gutterBottom>{book.title}</Typography>
            <Typography variant="subtitle1" gutterBottom>저자: {book.author}</Typography>
            <Typography variant="body2" gutterBottom>출판사: {book.publisher}</Typography>
            <Typography variant="body2" gutterBottom>장르: {book.genre}</Typography>
            <Typography variant="body1" gutterBottom>줄거리: {book.summary || "줄거리 정보 없음"}</Typography>
            <Box mt={2} textAlign="right">
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="contained" color="error" onClick={handleDelete}>삭제</Button>
                    <Button variant="contained" onClick={onClose}>닫기</Button>
                </Stack>
            </Box>
        </Box>
    );
}

export default BookDetailModal;




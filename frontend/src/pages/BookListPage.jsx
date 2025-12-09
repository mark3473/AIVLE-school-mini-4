import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import BookDetailModal from '../components/BookDetailModal';
import { Modal, Box, Typography, TextField, Grid, Container } from '@mui/material';
import axios from 'axios';
import './BookListPage.css'; // CSS 따로 관리

function BookListPage() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        axios.get('/api/books')
            .then(response => setBooks(response.data))
            .catch(err => console.error("도서 불러오기 실패:", err));
    }, []);

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openModal = (book) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBook(null);
    };

    const handleDelete = (bookId) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        axios.delete(`/api/books/${bookId}`)
            .then(() => {
                setBooks(prev => prev.filter(b => b.id !== bookId));
                closeModal();
            })
            .catch(err => {
                console.error("삭제 실패:", err);
                alert("삭제에 실패했습니다. 다시 시도해주세요.");
            });
    };

    return (
        <div className="main-content" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 60px)' }}>
            {/* 검색창 고정 */}
            <div style={{ padding: '16px', backgroundColor: '#fff', position: 'sticky', top: 0, zIndex: 10 }}>
                <TextField
                    label="검색어 입력"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* 카드 리스트 영역 스크롤 */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', backgroundColor: '#fafafa' }}>
                <Grid container spacing={3}>
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map(book => (
                            <Grid item xs={12} sm={6} md={4} key={book.id}>
                                <BookCard
                                    book={book}
                                    onClick={() => openModal(book)}
                                />
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12}>
                            <Typography>등록된 도서가 없습니다.</Typography>
                        </Grid>
                    )}
                </Grid>
            </div>

            {/* 모달 */}
            <Modal open={isModalOpen} onClose={closeModal}>
                <BookDetailModal
                    book={selectedBook}
                    onClose={closeModal}
                    onDelete={handleDelete}
                />
            </Modal>
        </div>
    );
}

export default BookListPage;

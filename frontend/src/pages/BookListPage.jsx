import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import BookDetailModal from '../components/BookDetailModal';
import axios from 'axios';
import { Modal, Box, Typography, TextField, Grid, Container } from '@mui/material';

function BookListPage({books, setBooks, fetchBooks}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        fetchBooks();
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
        axios.delete(`/api/books/${bookId}`)
            .then(response => {
                console.log("삭제 성공:", response.data);
                setBooks(prev => prev.filter(b => b.id !== bookId));
                closeModal();
            })
            .catch(err => {
                console.error("삭제 실패:", err);
                alert("삭제에 실패했습니다. 다시 시도해주세요.");
            });
    };

    return (
        <Box sx={{ width: "100%" }}>
            {/* 중앙 컨텐츠 */}
            <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
                <Typography variant="h4" gutterBottom>
                    도서 목록
                </Typography>

                {/* 검색창 */}
                <TextField
                    label="검색어 입력"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ mb: 3 }}
                />

                {/* 도서 카드 리스트 */}
                <Grid container spacing={3}>
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map(book => (
                            <Grid item xs={12} sm={6} md={4} key={book.id}>
                                <BookCard
                                    book={book}
                                    setBooks={setBooks}
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
            </Container>

            <Modal open={isModalOpen} onClose={closeModal}>
                <BookDetailModal
                    book={selectedBook}
                    onClose={closeModal}
                    onDelete={handleDelete}
                />
            </Modal>
        </Box>
    );
}

export default BookListPage;
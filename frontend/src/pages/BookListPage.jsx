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
//
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, TextField, Grid, Typography, Box } from '@mui/material';
//
// function BookListPage() {
//     const [books, setBooks] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//
//     // ⭐ 백엔드에서 책 목록 불러오기
//     useEffect(() => {
//         axios.get('http://localhost:8080/api/books')
//             .then(res => {
//                 setBooks(res.data);
//             })
//             .catch(err => {
//                 console.error('도서 목록 불러오기 오류:', err);
//             });
//     }, []);
//
//     // 검색어 필터링
//     const filteredBooks = books.filter(book =>
//         book.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//
//     return (
//         <Box>
//             <Header />
//
//             <Container sx={{ mt: 4 }}>
//                 <Typography variant="h4" gutterBottom>
//                     도서 목록
//                 </Typography>
//
//                 <TextField
//                     label="검색어 입력"
//                     variant="outlined"
//                     value={searchTerm}
//                     onChange={e => setSearchTerm(e.target.value)}
//                     fullWidth
//                     sx={{ mb: 3, maxWidth: 400 }}
//                 />
//
//                 {filteredBooks.length > 0 ? (
//                     <Grid container spacing={3}>
//                         {filteredBooks.map((book) => (
//                             <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
//                                 <BookCard
//                                     book={book}
//                                     setBooks={setBooks}
//                                 />
//                             </Grid>
//                         ))}
//                     </Grid>
//                 ) : (
//                     <Typography variant="body1">등록된 도서가 없습니다.</Typography>
//                 )}
//             </Container>
//         </Box>
//     );
// }
//
// export default BookListPage;





import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function EditBookPage({ books, setBooks }) {
    const { id } = useParams(); // URL에서 도서 ID 가져오기
    const navigate = useNavigate();

    // 해당 도서 찾기
    const bookToEdit = books.find(book => book.id === parseInt(id));

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        genre: '',
        publisher: ''
    });

    useEffect(() => {
        if (bookToEdit) {
            setFormData({
                title: bookToEdit.title,
                author: bookToEdit.author,
                description: bookToEdit.description,
                genre: bookToEdit.genre,
                publisher: bookToEdit.publisher
            });
        }
    }, [bookToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 기존 도서 업데이트
        setBooks(prevBooks =>
            prevBooks.map(book =>
                book.id === parseInt(id) ? { ...book, ...formData } : book
            )
        );
        navigate('/books'); // 수정 후 도서 목록으로 이동
    };

    if (!bookToEdit) {
        return <p>존재하지 않는 도서입니다.</p>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <Box style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <Typography variant="h4" gutterBottom>도서 수정</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField label="도서 제목" name="title" value={formData.title} onChange={handleChange} fullWidth required margin="normal" />
                    <TextField label="작가 이름" name="author" value={formData.author} onChange={handleChange} fullWidth required margin="normal" />
                    <TextField label="도서 줄거리" name="description" value={formData.description} onChange={handleChange} fullWidth required margin="normal" multiline rows={4} />
                    <TextField label="출판사" name="publisher" value={formData.publisher} onChange={handleChange} fullWidth required margin="normal" />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>장르 선택</InputLabel>
                        <Select label="장르 선택" name="genre" value={formData.genre} onChange={handleChange} required>
                            <MenuItem value="로맨스">로맨스</MenuItem>
                            <MenuItem value="SF/판타지">SF/판타지</MenuItem>
                            <MenuItem value="미스터리/공포">미스터리/공포</MenuItem>
                            <MenuItem value="드라마">드라마</MenuItem>
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary" fullWidth>수정 완료</Button>
                </form>
            </Box>
        </div>
    );
}

export default EditBookPage;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    TextField, Button, Box, Typography, Select, MenuItem,
    FormControl, List, ListItem, ListItemText,
    ListItemSecondaryAction, Paper, Divider
} from '@mui/material';

function EditBookPage({ books, setBooks }) {
    const { id } = useParams();
    const navigate = useNavigate();

    // -------------------------------
    // 초기 form 데이터 (cover_img 추가)
    // -------------------------------
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        summary: '',
        genre: '',
        publisher: '',
        cover_img: ''   // 추가됨
    });

    // 해당 도서 찾기
    const bookToEdit = id ? books.find(book => book.id === parseInt(id)) : null;

    useEffect(() => {
        if (bookToEdit) {
            setFormData({
                title: bookToEdit.title,
                author: bookToEdit.author,
                summary: bookToEdit.summary,
                genre: bookToEdit.genre,
                publisher: bookToEdit.publisher,
                cover_img: bookToEdit.cover_img ?? ''  // 기존 데이터에 없을 가능성 대비
            });
        }
    }, [bookToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // -------------------------------
    // PUT 요청 백엔드 연동
    // -------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!bookToEdit) return;

        try {
            // 1) PUT 요청 보내기
            const response = await axios.put(`/api/books/${bookToEdit.id}`, {
                author: formData.author,
                title: formData.title,
                summary: formData.summary,
                genre: formData.genre,
                cover_img: formData.cover_img
            });

            console.log("수정 성공:", response.data);

            // 2) 프론트 states 업데이트
            setBooks(prevBooks =>
                prevBooks.map(book =>
                    book.id === bookToEdit.id
                        ? { ...book, ...formData }
                        : book
                )
            );

            alert("수정이 완료되었습니다.");
            navigate('/edit-book');

        } catch (error) {
            console.error("수정 실패:", error);
            alert("수정 요청에 실패했습니다.");
        }
    };

    // -------------------------------
    // JSX 렌더링
    // -------------------------------
    if (!id) {
        // 도서 리스트 화면
        return (
            <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
                <Typography variant="h4" gutterBottom>수정할 도서 선택</Typography>
                <Paper style={{ maxHeight: '600px', overflow: 'auto' }}>
                    <List>
                        {books.length === 0 ? (
                            <Typography style={{ padding: '20px' }}>등록된 도서가 없습니다.</Typography>
                        ) : (
                            books.map((book) => (
                                <React.Fragment key={book.id}>
                                    <ListItem>
                                        <ListItemText
                                            primary={book.title}
                                            secondary={`저자: ${book.author} | 출판사: ${book.publisher}`}
                                        />
                                        <ListItemSecondaryAction>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => navigate(`/edit-book/${book.id}`)}
                                            >
                                                수정하기
                                            </Button>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <Divider />
                                </React.Fragment>
                            ))
                        )}
                    </List>
                </Paper>
            </div>
        );
    }

    if (!bookToEdit) {
        return <p style={{ padding: '20px' }}>존재하지 않는 도서 ID입니다.</p>;
    }

    // 수정 폼 화면
    return (
        <div style={{ padding: '20px' }}>
            <Box style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <Typography variant="h4" gutterBottom>도서 정보 수정</Typography>

                <form onSubmit={handleSubmit}>
                    <TextField label="도서 제목" name="title" value={formData.title} onChange={handleChange} fullWidth required margin="normal" />
                    <TextField label="작가 이름" name="author" value={formData.author} onChange={handleChange} fullWidth required margin="normal" />
                    <TextField label="도서 줄거리" name="summary" value={formData.summary} onChange={handleChange} fullWidth required margin="normal" multiline rows={4} />
                    <TextField label="출판사" name="publisher" value={formData.publisher} onChange={handleChange} fullWidth required margin="normal" />

                    <TextField label="표지 이미지 URL" name="cover_img" value={formData.cover_img} onChange={handleChange} fullWidth margin="normal" />

                    <FormControl fullWidth margin="normal">
                        <Select label="장르 선택" name="genre" value={formData.genre} onChange={handleChange} required>
                            <MenuItem value="ROMANCE">로맨스</MenuItem>
                            <MenuItem value="SF">SF</MenuItem>
                            <MenuItem value="MYSTERY">미스터리</MenuItem>
                            <MenuItem value="THRILLER">공포,스릴러</MenuItem>
                            <MenuItem value="HISTORY">역사</MenuItem>
                            <MenuItem value="ESSAY">에세이</MenuItem>
                        </Select>
                    </FormControl>

                    <Box mt={2} display="flex" gap={2}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>수정 완료</Button>
                        <Button variant="outlined" color="secondary" fullWidth onClick={() => navigate('/edit-book')}>목록으로</Button>
                    </Box>
                </form>
            </Box>
        </div>
    );
}

export default EditBookPage;

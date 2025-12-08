import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    TextField, Button, Box, Typography, Select, MenuItem, 
    FormControl, InputLabel, List, ListItem, ListItemText, 
    ListItemSecondaryAction, Paper, Divider 
} from '@mui/material';

function EditBookPage({ books, setBooks }) {
    const { id } = useParams(); // URL에서 도서 ID 가져오기 (없을 수도 있음)
    const navigate = useNavigate();

    // ---------------------------------------------------------
    // [CASE 1] ID가 없을 때: 수정할 도서를 선택하는 목록 화면 렌더링
    // ---------------------------------------------------------
    if (!id) {
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

    // ---------------------------------------------------------
    // [CASE 2] ID가 있을 때: 기존 작성하신 수정 폼 로직 실행
    // ---------------------------------------------------------
    
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
        
        // 1. 프론트엔드 상태 업데이트 (화면에 즉시 반영)
        setBooks(prevBooks =>
            prevBooks.map(book =>
                book.id === parseInt(id) ? { ...book, ...formData } : book
            )
        );

        /* [중요] 실제 백엔드 연동 시 여기에 fetch/axios 코드가 필요합니다.
           예: 
           fetch(`http://localhost:8080/api/books/${id}`, {
               method: 'PUT',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(formData)
           });
        */

        alert("수정이 완료되었습니다.");
        navigate('/books'); // 또는 navigate(-1)로 뒤로 가기
    };

    if (!bookToEdit) {
        return <p style={{ padding: '20px' }}>존재하지 않는 도서 ID입니다.</p>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <Box style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <Typography variant="h4" gutterBottom>도서 정보 수정</Typography>
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
                            {/* 필요하다면 장르를 더 추가하세요 */}
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
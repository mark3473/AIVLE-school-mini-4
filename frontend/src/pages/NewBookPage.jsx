import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

function NewBookPage({ addNewBook }) {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        genre: '',
        publisher: ''  // 출판사 추가
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 도서 등록 후, 상위 컴포넌트에서 상태 업데이트
        addNewBook(formData);

        // 도서 목록 페이지로 이동
        navigate('/books');
    };

    const handleGoBack = () => {
        navigate(-1); // 이전 페이지로 돌아가기
    };

    return (
        // content 영역에서 충분히 공간 확보
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 600,
                    p: 3,
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    backgroundColor: '#fff'
                }}
            >
                <Typography variant="h4" gutterBottom>도서 등록</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="도서 제목"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="작가 이름"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="도서 줄거리"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        multiline
                        rows={4}
                    />
                    <TextField
                        label="출판사"
                        name="publisher"
                        value={formData.publisher}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>장르 선택</InputLabel>
                        <Select
                            label="장르 선택"
                            name="genre"
                            value={formData.genre}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="로맨스">로맨스</MenuItem>
                            <MenuItem value="SF/판타지">SF/판타지</MenuItem>
                            <MenuItem value="미스터리/공포">미스터리/공포</MenuItem>
                            <MenuItem value="드라마">드라마</MenuItem>
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        표지 생성 및 등록
                    </Button>
                    <Button
                        type="button"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleGoBack}
                    >
                        이전 페이지로 돌아가기
                    </Button>
                </form>
            </Box>
        </div>
    );
}

export default NewBookPage;












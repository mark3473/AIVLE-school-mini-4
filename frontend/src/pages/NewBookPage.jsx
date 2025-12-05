import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NewBookPage() {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        genre: ''
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
        // 도서 등록 로직 (여기서는 mock data로 처리)
        console.log('등록된 도서:', formData);
        navigate('/books');  // 도서 목록 페이지로 이동
    };

    return (
        <div style={{ padding: '20px' }}>
            <Box style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
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
                        inputProps={{ maxLength: 40 }}
                    />
                    <TextField
                        label="작가 이름"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        inputProps={{ maxLength: 35 }}
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
                        inputProps={{ maxLength: 500 }}
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
                            <MenuItem value="Fantasy">판타지</MenuItem>
                            <MenuItem value="Sci-Fi">과학소설</MenuItem>
                            <MenuItem value="Mystery">미스터리</MenuItem>
                            <MenuItem value="Romance">로맨스</MenuItem>
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        표지 생성 및 등록
                    </Button>
                </form>
            </Box>
        </div>
    );
}

export default NewBookPage;






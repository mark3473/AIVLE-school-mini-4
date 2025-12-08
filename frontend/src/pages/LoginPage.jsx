import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';

function LoginPage() {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        // 로그인 검증 (아이디는 admin, 비밀번호는 1234)
        if (loginData.username === 'admin' && loginData.password === '1234') {
            navigate('/new-book');  // 도서 등록 페이지로 이동
        } else {
            alert('로그인 실패');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Box style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <Typography variant="h4" gutterBottom>Login</Typography>
                <form onSubmit={handleLoginSubmit}>
                    <TextField
                        label="아이디"
                        name="username"
                        value={loginData.username}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="비밀번호"
                        name="password"
                        type="password"
                        value={loginData.password}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        로그인
                    </Button>
                </form>
            </Box>
        </div>
    );
}

export default LoginPage;






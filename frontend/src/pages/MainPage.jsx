import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';

function MainPage() {
    const [signupData, setSignupData] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        // 회원가입 로직 (현재는 단순히 로그인을 위한 데이터 설정)
        console.log('회원가입 데이터:', signupData);
        alert('회원가입이 완료되었습니다. 로그인 해주세요!');
        navigate('/login');  // 로그인 페이지로 이동
    };

    return (
        <div style={{ padding: '20px' }}>
            <Box style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <Typography variant="h4" gutterBottom>Sign Up</Typography>
                <form onSubmit={handleSignupSubmit}>
                    <TextField
                        label="아이디"
                        name="username"
                        value={signupData.username}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="비밀번호"
                        name="password"
                        type="password"
                        value={signupData.password}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        가입하기
                    </Button>
                </form>
            </Box>
        </div>
    );
}

export default MainPage;













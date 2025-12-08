import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import NewBookPage from './pages/NewBookPage';
import EditBookPage from './pages/EditBookPage';
import BookDetailPage from './pages/BookDetailPage';
import BookListPage from './pages/BookListPage';
import SearchPage from './pages/SearchPage';
import Layout from './components/Layout';

function App() {
    const [books, setBooks] = useState([]);

    const addNewBook = (newBook) => {
        setBooks(prevBooks => [...prevBooks, { ...newBook, id: prevBooks.length + 1 }]);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route element={<Layout />}>
                    <Route path="/books" element={<BookListPage books={books} setBooks={setBooks} />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/new-book" element={<NewBookPage addNewBook={addNewBook} />} />
                    <Route path="/book/:id" element={<BookDetailPage books={books} />} />
                    <Route path="/edit-book/:id" element={<EditBookPage books={books} setBooks={setBooks} />} />
                </Route>
            </Routes>
        </Router>
    );
}
export default App;






{/*
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';  // 회원가입 페이지
import LoginPage from './pages/LoginPage';  // 로그인 페이지
import NewBookPage from './pages/NewBookPage';  // 도서 등록 페이지
import BookDetailPage from './pages/BookDetailPage';  // 도서 상세 페이지
import BookListPage from './pages/BookListPage';  // 도서 목록 페이지

function App() {
    const [books, setBooks] = useState([]);  // 도서 목록 상태 관리

    // 새 도서를 추가하는 함수
    const addNewBook = (newBook) => {
        setBooks(prevBooks => [...prevBooks, newBook]);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/new-book" element={<NewBookPage addNewBook={addNewBook} />} />
                <Route path="/book/:id" element={<BookDetailPage />} />
                <Route path="/books" element={<BookListPage books={books} />} />
            </Routes>
        </Router>
    );
}

export default App;










백엔드 연동 확인 코드
import { useState, useEffect } from 'react'
import axios from 'axios';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

// import { useState, useEffect } from 'react'
// // import axios from 'axios';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import './App.css'
import Header from './components/Header'
import Sidebar from './components/Siderbar'
import BookCard from './components/BookCard'

function App() {
    const books = [
        {title: "책", author: "나임", isbn: "123-456-789", publisher:"에이블"},
        {title: "책", author: "나임", isbn: "123-456-789", publisher:"에이블"},
        {title: "책", author: "나임", isbn: "123-456-789", publisher:"에이블"}
    ]


    // 컴포넌트 마운트 시 백엔드 API 호출
    useEffect(() => {
        axios.get('/api/hello')  // 백엔드의 /api/hello API 호출
            .then((response) => {
                console.log('API 응답:', response.data);  // 응답 데이터를 콘솔에 출력
                setMessage(response.data);  // 응답 메시지를 상태에 저장
            })
            .catch((error) => {
                console.error('API 호출 에러:', error);  // 에러 발생 시 출력
            });
    }, []);  // 빈 배열로 설정하여 컴포넌트 마운트 시에만 호출

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

        //백엔드에서 받은 응답 메시지 표시
        <div>
            <h2>백엔드 메시지:</h2>
            <p>{message}</p>  // API 응답 메시지를 화면에 출력

    return (
        <div className="app">
            <Header />
            <div className="container">
                <Sidebar />
                <main className="main">
                    <div className="content-list">
                        <h2>전체 도서</h2>
                        <button className="button">+도서 추가</button>
                    </div>
                    <div className="books-grid">
                        {books.map((book, index) => (
                            <BookCard key={index} {...book} />
                        ))}
                    </div>
                </main>
            </div>

        </div>
    )
}

export default App



//             <div className="container">
//
//
//                 <main className="main">
//                     <div className="content-list">
//                         <h2>전체 도서</h2>
//                         <button className="button">+도서 추가</button>
//                     </div>
//
//                     <div className="books">
//                         <div className="book-card">
//                             <div className="book-cover">
//                                 <img src="https://via.placeholder.com/150x200?text=Book+Cover" alt="책 표지" />
//                             </div>
//                             <div className="book-info">
//                                 <h3>책 열심히 읽겠습니다</h3>
//                                 <p className="author">저자: 나임</p>
//                                 <p className="isbn">ISBN: 123-456-789</p>
//                                 <p className="publisher">출판사: 에이블</p>
//                                 <div className="book-actions">
//                                     <button className="btn-edit">수정</button>
//                                     <button className="btn-delete">삭제</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//
//                         <div className="books">
//                             <div className="book-card">
//                                 <div className="book-cover">
//                                     <img src="https://via.placeholder.com/150x200?text=Book+Cover" alt="책 표지" />
//                                 </div>
//                                 <div className="book-info">
//                                     <h3>독서는 겨울에 해야죠</h3>
//                                     <p className="author">저자: 나임</p>
//                                     <p className="isbn">ISBN: 123-456-789</p>
//                                     <p className="publisher">출판사: 에이블</p>
//                                     <div className="book-actions">
//                                         <button className="btn-edit">수정</button>
//                                         <button className="btn-delete">삭제</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//
//                             <div className="books">
//                                 <div className="book-card">
//                                     <div className="book-cover">
//                                         <img src="https://via.placeholder.com/150x200?text=Book+Cover" alt="책 표지" />
//                                     </div>
//                                     <div className="book-info">
//                                         <h3>도서가 맞지 않을까</h3>
//                                         <p className="author">저자: 나임</p>
//                                         <p className="isbn">ISBN: 123-456-789</p>
//                                         <p className="publisher">출판사: 에이블</p>
//                                         <div className="book-actions">
//                                             <button className="btn-edit">수정</button>
//                                             <button className="btn-delete">삭제</button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </main>
//                     </div>
//                 </div>
//             )
//         }
//
// export default App





    // const [count, setCount] = useState(0);
    // const [message, setMessage] = useState('');  // API 응답 메시지를 저장할 상태 변수

    // // 컴포넌트 마운트 시 백엔드 API 호출
    // useEffect(() => {
    //     axios.get('/api/hello')  // 백엔드의 /api/hello API 호출
    //         .then((response) => {
    //             console.log('API 응답:', response.data);  // 응답 데이터를 콘솔에 출력
    //             setMessage(response.data);  // 응답 메시지를 상태에 저장
    //         })
    //         .catch((error) => {
    //             console.error('API 호출 에러:', error);  // 에러 발생 시 출력
    //         });
    // }, []);  // 빈 배열로 설정하여 컴포넌트 마운트 시에만 호출
    // useEffect(() => {
    //     setTimeout(() => {
    //         setMessage('백 x');
    //         setLoading(false);
    //     }, []);
    //
    //     })

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//
//         //백엔드에서 받은 응답 메시지 표시
//         <div>
//             <h2>백엔드 메시지:</h2>
//             <p>{message}</p>  // API 응답 메시지를 화면에 출력
//         </div>
//
//
//     </>
//   )
//
*/}


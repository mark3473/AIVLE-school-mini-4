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
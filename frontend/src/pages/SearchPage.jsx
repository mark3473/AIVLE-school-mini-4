import React, { useState } from "react";
import BookCard from "../components/BookCard";
import "./SearchPage.css";

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      alert("검색어를 입력하세요.");
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch(
        `http://localhost:8080/api/books/search?q=${encodeURIComponent(
          searchTerm
        )}`
      );

      if (!response.ok) {
        throw new Error("서버 응답 오류");
      }

      const data = await response.json();

      // 백엔드가 배열이 아닌 값을 줄 때 대비
      setSearchResults(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("검색 실패:", error);

      // 임시 테스트 데이터 (백엔드 미구현 시)
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>📚 도서 검색</h1>
        <p className="search-description">원하시는 도서를 검색해보세요</p>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="도서명 또는 저자명을 입력하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="btn-search">
            🔍 검색
          </button>
        </div>
      </form>

      {loading && (
        <div className="loading">
          <p>검색 중...</p>
        </div>
      )}

      {searched && !loading && (
        <div className="search-results">
          <h2 className="results-title">
            검색 결과 <span className="result-count">({searchResults.length}건)</span>
          </h2>

          {searchResults.length === 0 ? (
            <div className="no-results">
              <p>😕 검색 결과가 없습니다.</p>
              <p className="no-results-subtitle">
                다른 검색어로 다시 시도해보세요.
              </p>
            </div>
          ) : (
            <div className="book-grid">
              {searchResults.map((book) => (
                <BookCard
                  key={book.id}
                  title={book.title}
                  author={book.author}
                  isbn={book.isbn}
                  publisher={book.publisher}
                  genre={book.genre}
                  onClick={() => console.log("Book clicked:", book.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchPage;

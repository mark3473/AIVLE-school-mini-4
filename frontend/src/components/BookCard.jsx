import React from 'react';

function BookCard({ book }) {
    return (
        <div style={{
            border: '1px solid #ccc',
            padding: '10px',
            margin: '10px',
            borderRadius: '5px'
        }}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.genre}</p>
        </div>
    );
}

export default BookCard;



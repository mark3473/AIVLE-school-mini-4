import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
    return (
        <aside className="sidebar">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/books" className={({ isActive }) => isActive ? "active" : ""}>
                            전체 도서
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/search" className={({ isActive }) => isActive ? "active" : ""}>
                            검색
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/new-book" className={({ isActive }) => isActive ? "active" : ""}>
                            도서 추가
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/edit-book" className={({ isActive }) => isActive ? "active" : ""}>
                            도서 수정
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;



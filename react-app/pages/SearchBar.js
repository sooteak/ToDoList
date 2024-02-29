// SearchBar.js
import React, { useState } from 'react';
import nav from "../styles/navbar.module.css"

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        onSearch(term);
    };

    return (
        <div className={nav.n_search}>
            <input 
            className={nav.searchInput}
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleChange}
        />
        </div>
    );
}

export default SearchBar;

// SortTodo.js
import React from 'react';
import nav from "../styles/navbar.module.css"


export default function SortTodo({ onSortChange }) {
    return (
        <div className={nav.n_sort}>
            <select className={nav.sort} onChange={(e) => onSortChange(e.target.value)}>
            <option className={nav.option} value="id">Sort By</option>
            <option className={nav.option} value="modified">Modified Date (Descending)</option>
            <option className={nav.option} value="title">Title (Ascending)</option>
        </select>
        </div>
    );
}

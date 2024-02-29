import React, { useState } from 'react';
import { createTodo } from '../list';
import style from '../../styles/form.module.css';

const AddTodoForm = ({ onAdd, onCancel }) => {
    const [text, setText] = useState('');
    const [content, setContent] = useState('');

    const handleAddClick = () => {
        const newTodo = createTodo(text, content, new Date().getTime());
        onAdd(newTodo);
        setText('');
        setContent('');
    };

    return (
        <div className={style.form}>
            <div className={style.addForm}>
                <h1 className={style.title}>Create New To-Do-List</h1>
                <div className={style.group} >
                    <label className={style.label}>Title</label>
                    <input className={style.input} value={text} onChange={e => setText(e.target.value)} aria-label="Todo Text" />
                </div>

                <div className={style.group} >
                    <label className={style.label}>Content</label>
                    <textarea className={style.textarea} value={content} onChange={e => setContent(e.target.value)} aria-label="Todo Content" />
                </div>
                <div className={style.btnGroup}>
                    <button className={style.cancelbtn} onClick={onCancel}>Cancel</button>
                    <button className={style.savebtn} onClick={handleAddClick}>Create</button>
                </div>
            </div>
        </div>

    );
};

export default AddTodoForm;

AddTodoForm.js


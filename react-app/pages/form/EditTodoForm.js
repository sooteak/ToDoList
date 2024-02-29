// EditTodoForm.js
import React, { useState } from 'react';
import style from '../../styles/form.module.css';

export default function EditTodoForm({ todo, onSave, onCancel }) {
    const [editedTitle, setEditedTitle] = useState(todo.text);
    const [editedContent, setEditedContent] = useState(todo.content);
    const [editedCompleted, setEditedCompleted] = useState(todo.completed);
    const [time, setTime] = useState(new Date());

    const handleSave = () => {
        // Assuming onSave is a function passed from TodoList to handle saving edited todo
        onSave(todo.id, editedTitle, editedContent, editedCompleted);
        setTime(new Date()); // Update time on save
    };

    return (
        <div className={style.form}>
            <div className={style.editForm}>
                <h1 className={style.title}>Edit To-Do-List</h1>
                <div className={style.group}>
                    <label className={style.label}>Title</label>
                    <input
                        className={style.input}
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                </div>
                <div className={style.group}>
                    <label className={style.label}>Content</label>
                    <textarea
                        className={style.textarea}
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                    />
                </div>
                <div className={style.checkboxContainer}>
                    <input className={style.checkbox}
                        type="checkbox"
                        checked={editedCompleted}
                        onChange={() => setEditedCompleted(!editedCompleted)}
                    />
                    <label className={style.mark}>Mark as completed</label>
                </div>
                <div className={style.btnGroup}>
                    <button className={style.cancelbtn} onClick={onCancel}>Cancel</button>
                    <button className={style.savebtn} onClick={handleSave}>Save</button>
                </div>
            </div>


            {time && (
                <div>
                    <p>Last Edited: {time.toLocaleString()}</p>
                </div>
            )}
        </div>
    );
}

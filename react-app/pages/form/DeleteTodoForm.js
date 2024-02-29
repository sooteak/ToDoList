// DeleteConfirmation.js
import style from '../../styles/form.module.css';

import React from 'react';

export default function DeleteConfirmation({ title, onDelete, onCancel }) {
    return (
        <div className={style.form}>
            <div className={style.deleteForm}>
                <p className={style.part1}>Delete To-Do List</p>
                <p className={style.part2}>Are you sure you want to delete the to-do list?</p>
                <p className={style.part3}> Title Here</p>
                
                <button className={style.cancelbtn} onClick={onCancel}>Cancel</button>
                <button className={style.deletebtn} onClick={onDelete}>Delete</button>
            </div>
        </div>
    );
}

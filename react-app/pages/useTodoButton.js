// useTodoButtons.js
import React from 'react';
import list from "../styles/list.module.css"

export const useTodoButtons = ({ todo, handleEditClick, handleDeleteClick, handleToggleContent, showContent }) => {
    const imageSize = '25px'; // 设置图像的宽度和高度
    const margin_left = '50px';

    return (
        <div className={list.l_icon}>
            <div className={list.icon}>
                <img
                    src="../icon/edit.png"
                    alt="Edit"
                    style={{ cursor: 'pointer', width: imageSize, height: imageSize, marginLeft: margin_left }}
                    onClick={() => handleEditClick(todo)}
                />
                <img
                    src="../icon/delete.png"
                    alt="Delete"
                    style={{ cursor: 'pointer', width: imageSize, height: imageSize, marginLeft: margin_left}}
                    onClick={() => handleDeleteClick(todo)}
                />
                <img
                    src={showContent.includes(todo.id) ? "../icon/up.png" : "../icon/down.png"}
                    alt={showContent.includes(todo.id) ? "Hide" : "Show"}
                    style={{ cursor: 'pointer', width: imageSize, height: imageSize, marginLeft: margin_left }}
                    onClick={() => handleToggleContent(todo)}
                />
            </div>
        </div>
    );
};

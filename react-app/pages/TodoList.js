// TodoList.js
import React, { useState, useEffect, useRef } from 'react';
import AddTodoForm from './form/AddTodoForm';
import EditTodoForm from './form/EditTodoForm';
import DeleteConfirmation from './form/DeleteTodoForm';
import SortTodo from './SortTodo';
import SearchBar from './SearchBar';
import { useTodoButtons } from './useTodoButton';
import nav from '../styles/navbar.module.css';
import list from '../styles/list.module.css';


function getDisplayText(todo) {
    const lastModified = todo.time || new Date(todo.time);
    const options = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const lastModifiedText = `Last Modified ${new Intl.DateTimeFormat('en-US', options).format(lastModified).replace(',', '')}`;
    return lastModifiedText;
}

export default function TodoList() {
    // localStorage.clear()
    const [todos, setTodos] = useState([]);
    const [showContent, setShowContent] = useState([]);
    const [showForm, setShowForm] = useState(null);
    const [editTodo, setEditTodo] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deleteTodo, setDeleteTodo] = useState(null);
    const [sortType, setSortType] = useState('id'); // Default sort by id
    const prevShowActiveRef = useRef();
    const [showActive, setShowActive] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        if (storedTodos) {
            setTodos(storedTodos);
        }
        prevShowActiveRef.current = showActive;
    }, [showActive]);

    function handleAddClick(newTodo) {
        const currentTime = new Date().getTime();
        const updatedTodos = [...todos, { ...newTodo, time: currentTime }];
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        setShowForm(null);
    }
    const handleCancelAdd = () => {
        setShowForm(null); // Close the add form
    };


    function handleToggleContent(todo) {
        setShowContent((prevShowContent) => {
            if (prevShowContent.includes(todo.id)) {
                return prevShowContent.filter((id) => id !== todo.id);
            } else {
                return [...(prevShowContent), todo.id];
            }
        });
    }

    function handleCheckboxChange(todo) {
        const currentTime = new Date().getTime();
        const updatedTodos = todos.map(prevTodo =>
            prevTodo.id === todo.id
                ? { ...prevTodo, completed: !prevTodo.completed, time: currentTime }
                : prevTodo
        );
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }

    // Function to handle editing todo
    const handleEditClick = (todo) => {
        setEditTodo(todo);
    };

    // Function to handle saving edited todo
    const handleSaveEdit = (id, editedTitle, editedContent, editedCompleted) => {
        const currentTime = new Date().getTime();
        const updatedTodos = todos.map(todo =>
            todo.id === id
                ? { ...todo, text: editedTitle, content: editedContent, time: currentTime }
                : todo
        );
        console.log(updatedTodos)
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        setEditTodo(null); // Close the edit form

    };


    // Function to handle canceling the edit
    const handleCancelEdit = () => {
        setEditTodo(null); // Close the edit form
    };

    // Function to handle delete click
    const handleDeleteClick = (todo) => {
        setDeleteTodo(todo);
        setShowDeleteConfirmation(true);
    };

    // Function to handle delete confirmation
    const handleDeleteConfirm = () => {
        const updatedTodos = todos.filter((todo) => todo.id !== deleteTodo.id);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        setShowDeleteConfirmation(false);
    };

    // Function to handle canceling the delete
    const handleDeleteCancel = () => {
        setDeleteTodo(null);
        setShowDeleteConfirmation(false);
    };

    const handleToggleShowActive = () => {
        // 切换状态
        setShowActive(!showActive);
    };

    const handleSortChange = (type) => {
        setSortType(type);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const filteredTodos = todos.filter(
        (todo) =>
            todo.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
            todo.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Function to sort the todos based on the selected type
    const sortTodos = (todos, type) => {
        switch (type) {
            case 'title':
                return todos.slice().sort((a, b) => a.text.localeCompare(b.text));
            case 'modified':
                return todos.slice().sort((a, b) => b.time - a.time);
            default: // 'id' or default
                return todos.slice().sort((a, b) => b.id - a.id);
        }
    };
    const sortedTodos = sortTodos(
        showActive ? filteredTodos.filter((todo) => !todo.completed) : filteredTodos,
        sortType
    );

    return (
        <>
            <div className={nav.navbar}>
                <SearchBar onSearch={handleSearch} />
                <SortTodo onSortChange={handleSortChange} /> {/* Render SortTodo component */}
                <div className={nav.n_create}>
                    <button className={nav.create} onClick={() => setShowForm(true)}>Create</button>
                </div>
            </div>

            <div className={nav.n_showList}>
                <label className={nav.showList} onClick={handleToggleShowActive}>
                    {showActive ? 'Show All List' : 'Hide Checked List'}
                </label>
            </div>
            <ul>
                {sortedTodos.map(todo => (
                    <div key={todo.id}>
                        <div className={list.list}>
                            <div className={list.l_checkbox}>
                                <input className={list.checkbox}
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => handleCheckboxChange(todo)}
                                />
                            </div>
                            <div className={list.l_title}>
                                <span className={list.title}>{todo.text}</span>
                            </div>
                            {useTodoButtons({ todo, handleEditClick, handleDeleteClick, handleToggleContent, showContent })}
                        </div>
                        {showContent.includes(todo.id) && (
                            <div>
                                <div className={list.time}>
                                    <span>Last Modified {getDisplayText(todo)}</span>
                                </div>
                                <div className={list.content}>
                                    <span>{todo.content}</span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </ul>
            <div>
                {showForm && (
                    <AddTodoForm onAdd={handleAddClick} onCancel={handleCancelAdd} />
                )}
                {editTodo && (
                    <EditTodoForm
                        todo={editTodo}
                        onSave={handleSaveEdit}
                        onCancel={handleCancelEdit}
                    />
                )}
                {showDeleteConfirmation && (
                    <DeleteConfirmation
                        title={deleteTodo.text}
                        onDelete={handleDeleteConfirm}
                        onCancel={handleDeleteCancel}
                    />
                )}
            </div>
        </>
    );
}

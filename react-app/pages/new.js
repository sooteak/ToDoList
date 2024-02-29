import { useState, useEffect } from 'react';
import { createTodo } from './list';

function getDisplayText(todo) {
    const lastModified = new Date(todo.createTime);
    const lastModifiedText = `${lastModified.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).replace(',', '')} at ${lastModified.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
    return `${todo.content}\nLast Modified ${lastModifiedText}`;
}

export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [showContent, setShowContent] = useState([]);

    // localStorage.clear()
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, []);



    const [showActive, setShowActive] = useState(false);
    const activeTodos = todos.filter(todo => !todo.completed);
    const visibleTodos = showActive ? activeTodos : todos;

    function NewTodo() {
        const [text, setText] = useState('');
        const [content, setContent] = useState('');



        // function handleAddClick() {
        //     setText('');
        //     setContent('');

        //     const newTodo = createTodo(text, content, new Date().getTime());
        //     setTodos(prevTodos => [...prevTodos, newTodo]);
        //     localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
        // }

        function handleAddClick() {
            setText('');
            setContent('');

            const newTodo = createTodo(text, content, new Date().getTime());
            const newTodos = [...todos, newTodo];
            setTodos(newTodos);
            localStorage.setItem('todos', JSON.stringify(newTodos));
        }



        return (
            <>
                {/* <input value={text} onChange={e => setText(e.target.value)} />
                <textarea value={content} onChange={e => setContent(e.target.value)} /> */}

                <input value={text} onChange={e => setText(e.target.value)} aria-label="Todo Text" />
                <textarea value={content} onChange={e => setContent(e.target.value)} aria-label="Todo Content" />

                <button onClick={handleAddClick}>
                    create
                </button>
            </>
        );

    }

    // function handleToggleContent(todo) {
    //     setShowContent((prevShowContent) => (prevShowContent === todo.id ? null : todo.id));
    // }
    function handleToggleContent(todo) {
        setShowContent((prevShowContent) => {
            if (prevShowContent && prevShowContent.includes(todo.id)) {
                // If the todo's id is already in the array, remove it
                return prevShowContent.filter((id) => id !== todo.id);
            } else {
                // If the todo's id is not in the array, add it
                return [...(prevShowContent || []), todo.id];
            }
        });
    }


    function handleCheckboxChange(todo) {
        const updatedTodos = todos.map(prevTodo =>
            prevTodo.id === todo.id
                ? { ...prevTodo, completed: !prevTodo.completed }
                : prevTodo
        );
        setTodos(updatedTodos);
        console.log(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }

    return (
        <>
            <label onClick={() => setShowActive(!showActive)}>
                {showActive ? 'hide' : 'show'}
            </label>
            <NewTodo onAdd={newTodo => setTodos([...todos, newTodo])} />
            <ul>
                {visibleTodos.map(todo => (
                    <div key={todo.id}>
                        <div>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleCheckboxChange(todo)}
                            />
                            <span>{todo.text}</span>
                            <button onClick={() => handleToggleContent(todo)}>
                                {showContent.includes(todo.id) ? 'Hide' : 'Show'}
                            </button>

                        </div>
                        {/* {showContent === todo.id && (
                            <div>
                                <span>{todo.content}</span>
                                <span>Last Modified: {getDisplayText(todo)}</span>
                            </div>
                        )} */}
                        {showContent.includes(todo.id) && (
                            <div>
                                <span>{todo.content}</span>
                                <span>Last Modified: {getDisplayText(todo)}</span>
                            </div>
                        )}

                    </div>
                ))}
            </ul>
        </>
    );
}



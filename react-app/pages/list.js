export function getNextId() {
    let nextId = localStorage.getItem('nextId') || 0;
    if (!nextId) {
        nextId = 1;
    } else {
        nextId = parseInt(nextId) + 1;
    }
    localStorage.setItem('nextId', nextId);
    return nextId;
}

export function createTodo(text, content, time) {
    const nextId = getNextId();
    const todo = {
        text,
        content,
        id: nextId,
        completed: false,
        time
    };

    console.log(todo);
    return todo;
}

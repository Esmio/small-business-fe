import React from 'react';

import { Todo as TodoClass } from '../../types';
import Todo from '../todo';

interface IProps {
    todos: TodoClass[];
    toggleTodo: (id: number) => void;
}

const TodoList = ({ todos, toggleTodo }: IProps) =>(
    <ul>
        {
            todos.map(todo => (
                <Todo
                    key={todo.id}
                    {...todo}
                    onClick={() => toggleTodo(todo.id)}
                />
            ))
        }
    </ul>
)

export default TodoList;
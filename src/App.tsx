import React from 'react';
import { hot } from 'react-hot-loader/root';

import AddTodo from './container/addTodo';
import VisibleTodoList from './container/visibleTodoList';
import Footer from './components/footer';

import './App.scss';


function App() {
    return (
        <div className="app">
            <AddTodo />
            <VisibleTodoList />
            <Footer />
        </div>
    );
}

export default hot(App);

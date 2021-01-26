import React from 'react';
import { render } from 'react-dom';
import { App } from './components/App.jsx';
import '../src/duxtree.css';
import './object-assign';

render(
    <App/>,
    document.getElementById('react-container')
);

import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import initialState from './initialState.json';
import storeFactory from './store';
import { App } from './components/App.jsx';

const store = storeFactory(initialState);
window.store = store;

import '../styles.css';

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('react-container')
);

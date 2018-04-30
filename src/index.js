import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import store from './store';

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

import { combineReducers, compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { gameList } from './reducers';

const rootReducer = combineReducers({ gameList });

const composeEnhancers =
    process.env.NODE_ENV === 'development'
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            : compose
        : null || compose;

export default createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

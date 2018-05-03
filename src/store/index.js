import { compose, combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { reducer as games } from './games';

const composeEnhancers =
    process.env.NODE_ENV === 'development'
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            : compose
        : null || compose;

const rootReducer = combineReducers({ games });

export default createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export { actions as gameActions } from './games';

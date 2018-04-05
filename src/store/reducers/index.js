import { combineReducers } from 'redux';

import gameList from './gameList.reducers';

const rootReducer = combineReducers({
    gameList: gameList
});

export default rootReducer;

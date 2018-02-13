import { combineReducers } from 'redux';

import gameList from './gameList';

const rootReducer = combineReducers({
	gameList: gameList
});

export default rootReducer;

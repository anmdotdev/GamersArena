import createReducer from '../../utils/reduxorator';

import apiActions from './apiActions';
import syncActions from './syncActions';

const initialState = {
    games: null,
    searchValue: '',
    searchResults: null,
    sortType: 'id'
};

const config = {
    prefix: 'GAMES'
};

export const { reducer, actions } = createReducer(initialState, apiActions, syncActions, config);

import { gameListConstants } from '../constants';
import axios from 'axios';

const fetchGamesData = () => {
    return dispatch => {
        axios.get('https://react-burger-38c78.firebaseio.com/.json').then(response => {
            dispatch(setGamesData(response.data));
        });
    };
};

const setGamesData = data => {
    return {
        type: gameListConstants.SET_GAMES_DATA,
        data: data
    };
};

const searchValueChanged = event => {
    return {
        type: gameListConstants.SEARCH_VALUE_CHANGED,
        value: event.target.value
    };
};

const sortByHandler = sortType => {
    return {
        type: gameListConstants.SORT_BY_HANDLER,
        sortType: sortType
    };
};

export const gameListActions = {
    fetchGamesData,
    searchValueChanged,
    sortByHandler
};

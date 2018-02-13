import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchGamesData = () => {
	return dispatch => {
		axios
			.get('https://react-burger-38c78.firebaseio.com/.json')
			.then(response => {
				dispatch(setGamesData(response.data));
			});
	};
};

export const setGamesData = data => {
	return {
		type: actionTypes.SET_GAMES_DATA,
		data: data
	};
};

export const searchValueChanged = event => {
	return {
		type: actionTypes.SEARCH_VALUE_CHANGED,
		event: event
	};
};

export const sortByHandler = sortType => {
	return {
		type: actionTypes.SORT_BY_HANDLER,
		sortType: sortType
	};
};

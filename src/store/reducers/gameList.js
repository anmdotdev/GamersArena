import * as actionTypes from '../actions/actionTypes';
import { sortByValue, updateObject } from '../../shared/utility';

const initialState = {
	games: null,
	searchResults: null,
	sortingByType: 'id',
	currentSearchValue: ''
};

const gamesReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_GAMES_DATA:
			return setGamesData(state, action);
		case actionTypes.SEARCH_VALUE_CHANGED:
			return searchValueChangedHandler(state, action);
		case actionTypes.SORT_BY_HANDLER:
			return sortByHandler(state, action);
		default:
			return state;
	}
};

const setGamesData = (state, action) => {
	action.data.map((game, index) => {
		game.id = index;
		return game;
	});

	return updateObject(state, {
		games: action.data
	});
};

const searchValueChangedHandler = (state, action) => {
	let searchResults = state.games.filter(game => {
		return game.title.toLowerCase().startsWith(action.event.target.value);
	});

	return updateObject(state, {
		currentSearchValue: action.event.target.value,
		searchResults: action.event.target.value === '' ? null : searchResults
	});
};

const sortByHandler = (state, action) => {
	//Direction: '+' = Ascending, '-' = descending
	let sortTypeWithDirection = action.sortType;

	if (action.sortType === 'score' || action.sortType === 'editors_choice') {
		sortTypeWithDirection = '-' + action.sortType;

		if (state.sortingByType === '-' + action.sortType) {
			sortTypeWithDirection = action.sortType; //If already sorting this type in descending, switch to ascending.
		} else if (state.sortingByType === action.sortType) {
			sortTypeWithDirection = 'id'; //If already sorting this type in ascending, switch to ID.
		}
	} else {
		if (state.sortingByType === action.sortType) {
			sortTypeWithDirection = '-' + action.sortType; //If already sorting this type in ascending, switch to descending.
		} else if (state.sortingByType === '-' + action.sortType) {
			sortTypeWithDirection = 'id'; //If already sorting this type in descending, switch to ID.
		}
	}

	return updateObject(state, {
		games: state.games.sort(sortByValue(sortTypeWithDirection)),
		searchResults: state.searchResults
			? state.searchResults.sort(sortByValue(sortTypeWithDirection))
			: null,
		sortingByType: sortTypeWithDirection
	});
};
export default gamesReducer;

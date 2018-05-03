import createReducer from '../shared/reduxorator';
import { sortByValue } from '../../shared/utility';

const initialState = {
    games: null,
    searchValue: '',
    searchResults: null,
    sortType: 'id'
};

const apiActions = [
    {
        call: 'getGames',
        apiType: 'get',
        path: 'https://react-burger-38c78.firebaseio.com/.json',
        action: {
            success: response => response.data,
            failure: error => error
        },
        reducer: {
            success: (state, { data }) => ({ games: data }),
            failure: (state, { error }) => ({ error })
        }
    }
];

const searchGames = (state, action) => ({
    searchValue: action.value,
    searchResults: state.games.filter(game => game.title.toLowerCase().startsWith(action.value))
});

const sortGames = (state, action) => {
    const currentSortType = state.sortType;
    const newSortType = action.sortType;

    let sortType =
        newSortType === 'score' || newSortType === 'editors_choice'
            ? currentSortType === '-' + newSortType
                ? newSortType
                : currentSortType === newSortType
                    ? 'id'
                    : '-' + newSortType
            : currentSortType === newSortType
                ? '-' + newSortType
                : currentSortType === '-' + newSortType
                    ? 'id'
                    : newSortType;

    return {
        sortType,
        games: state.games.sort(sortByValue(sortType)),
        searchResults: state.searchResults ? state.searchResults.sort(sortByValue(sortType)) : null
    };
};

// prettier-ignore
const syncActions = [
    { call: 'searchGames',  action: value => value,         reducer: searchGames },
    { call: 'sortGames',    action: sortType => sortType,   reducer: sortGames }
];

export const { reducer, actions } = createReducer(initialState, apiActions, syncActions);

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
        path: '/.json',
        action: {
            success: response => response.data
        },
        reducer: {
            success: (state, { data }) => ({ games: data })
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
    { call: 'searchGames',  action: value => ({ value }),         reducer: searchGames },
    { call: 'sortGames',    action: sortType => ({ sortType }),   reducer: sortGames }
];

const config = {
    prefix: 'GAMES'
};

export const { reducer, actions } = createReducer(initialState, apiActions, syncActions, config);

import { sortByValue } from '../../utils/utility';

const searchGamesReducer = (state, action) => {
    const searchValue = action.value;
    const searchResults = state.games.filter(game =>
        game.title.toLowerCase().startsWith(searchValue)
    );

    return { searchValue, searchResults };
};

const sortGamesReducer = (state, action) => {
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

    const games = state.games.sort(sortByValue(sortType));

    const searchResults = state.searchResults
        ? state.searchResults.sort(sortByValue(sortType))
        : null;

    return { sortType, games, searchResults };
};

const syncActions = [
    { call: 'searchGames',  action: value => ({ value }),        reducer: searchGamesReducer },
    { call: 'sortGames',    action: sortType => ({ sortType }),  reducer: sortGamesReducer }
];

export default syncActions;

import React, { Component } from 'react';
import { connect } from 'react-redux';

import GameHeader from '../../components/GamesLayout/GameHeader/GameHeader';
import GameList from '../../components/GamesLayout/GameList/GameList';

import Spinner from '../../components/UI/Spinner/Spinner';

import { gameListActions } from '../../store/actions';

class GamesLayout extends Component {
    componentDidMount() {
        this.props.fetchGamesData();
    }

    render() {
        let gamesList = (
            <GameList
                gamesData={this.props.searchResults ? this.props.searchResults : this.props.games}
                currentSortType={this.props.sortingByType}
                sortByHandler={this.props.sortByHandler}
            />
        );

        if (!this.props.games) {
            gamesList = <Spinner />;
        }

        return (
            <div>
                <GameHeader
                    searchValueChanged={this.props.searchValueChangedHandler}
                    currentSearchValue={this.props.currentSearchValue}
                />
                {gamesList}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { games, searchResults, sortingByType, currentSearchValue } = state.gameList;
    return { games, searchResults, sortingByType, currentSearchValue };
};

const mapDispatchToProps = dispatch => {
    const { fetchGamesData, searchValueChanged, sortByHandler } = gameListActions;
    return {
        fetchGamesData: () => dispatch(fetchGamesData()),
        searchValueChangedHandler: event => dispatch(searchValueChanged(event)),
        sortByHandler: sortType => dispatch(sortByHandler(sortType))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GamesLayout);

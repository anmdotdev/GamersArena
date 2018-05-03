import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { gamesActions } from '../../store';

import GameHeader from '../../components/GamesLayout/GameHeader/GameHeader';
import GameList from '../../components/GamesLayout/GameList/GameList';
import Spinner from '../../components/UI/Spinner/Spinner';

class GamesList extends Component {
    componentDidMount() {
        this.props.fetchGamesData();
    }

    render() {
        const { games, searchValue, searchResults, sortType, searchGames, sortGames } = this.props;

        return (
            <Fragment>
                <GameHeader searchValueChanged={searchGames} currentSearchValue={searchValue} />

                {this.props.games ? (
                    <GameList
                        gamesData={searchResults ? searchResults : games}
                        currentSortType={sortType}
                        sortByHandler={sortGames}
                    />
                ) : (
                    <Spinner />
                )}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    const { games, searchValue, searchResults, sortType } = state.games;
    return { games, searchValue, searchResults, sortType };
};

const mapDispatchToProps = dispatch => {
    const { getGames, searchGames, sortGames } = gamesActions;
    return {
        getGames: () => dispatch(getGames()),
        searchGames: value => dispatch(searchGames(value)),
        sortGames: sortType => dispatch(sortGames(sortType))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GamesList);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import GameHeader from '../../components/GamesLayout/GameHeader/GameHeader';
import GameList from '../../components/GamesLayout/GameList/GameList';

import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';

class GamesLayout extends Component {
	componentDidMount() {
		//Fetching Data for the First Time
		this.props.fetchGamesData();
	}

	render() {
		let gamesList = (
			<GameList
				gamesData={
					this.props.searchResults
						? this.props.searchResults
						: this.props.games
				}
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
	return {
		games: state.gameList.games,
		searchResults: state.gameList.searchResults,
		sortingByType: state.gameList.sortingByType,
		currentSearchValue: state.gameList.currentSearchValue
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchGamesData: () => dispatch(actions.fetchGamesData()),
		searchValueChangedHandler: event =>
			dispatch(actions.searchValueChanged(event)),
		sortByHandler: sortType => dispatch(actions.sortByHandler(sortType))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GamesLayout);

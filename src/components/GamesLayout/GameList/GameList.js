import React from 'react';
import { Table } from 'semantic-ui-react';

import Game from './Game/Game';
import GameListHeading from './GameListHeading/GameListHeading';

import cssClasses from './GameList.css';

const gameList = props => {
	let games = null;

	if (props.gamesData) {
		games = props.gamesData.map(game => (
			<Game
				key={game.id}
				title={game.title}
				genre={game.genre}
				platform={game.platform}
				editors_choice={game.editors_choice === 'Y'}
				score={game.score}
			/>
		));
	}

	return (
		<div className={cssClasses.GameList}>
			<Table sortable celled color="blue">
				<GameListHeading
					sortByHandler={props.sortByHandler}
					currentSortType={props.currentSortType}
				/>
				<Table.Body>{games}</Table.Body>
			</Table>
		</div>
	);
};

export default gameList;

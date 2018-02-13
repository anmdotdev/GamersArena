import React from 'react';
import { Table } from 'semantic-ui-react';

const gameListHeading = props => {
	let direction = props.currentSortType.includes('-')
		? 'descending'
		: 'ascending';
	let currentSortType = props.currentSortType.replace('-', '');

	return (
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell
					sorted={currentSortType === 'title' ? direction : null}
					onClick={() => props.sortByHandler('title')}>
					Title
				</Table.HeaderCell>
				<Table.HeaderCell
					sorted={currentSortType === 'genre' ? direction : null}
					onClick={() => props.sortByHandler('genre')}>
					Genre
				</Table.HeaderCell>
				<Table.HeaderCell
					sorted={currentSortType === 'platform' ? direction : null}
					onClick={() => props.sortByHandler('platform')}>
					Platform
				</Table.HeaderCell>
				<Table.HeaderCell
					sorted={
						currentSortType === 'editors_choice' ? direction : null
					}
					onClick={() => props.sortByHandler('editors_choice')}>
					Editor's Choice
				</Table.HeaderCell>
				<Table.HeaderCell
					sorted={currentSortType === 'score' ? direction : null}
					onClick={() => props.sortByHandler('score')}>
					Rating
				</Table.HeaderCell>
			</Table.Row>
		</Table.Header>
	);
};

export default gameListHeading;

import React from 'react';
import { Table } from 'semantic-ui-react';

const game = props => (
	<Table.Row>
		<Table.Cell>{props.title}</Table.Cell>
		<Table.Cell>{props.genre}</Table.Cell>
		<Table.Cell>{props.platform}</Table.Cell>
		<Table.Cell>{props.editors_choice ? 'Editors Choice' : '-'}</Table.Cell>
		<Table.Cell>{props.score}</Table.Cell>
	</Table.Row>
);

export default game;

import React from 'react';
import SearchBar from '../SearchBar/SearchBar';

import cssClasses from './GameHeader.css';

const gameHeader = props => (
	<div className={cssClasses.GameHeader}>
		<div className={cssClasses.Center}>
			<h1 className={cssClasses.Heading}>Gamer's Arena</h1>
			<p className={cssClasses.SubHeading}>
				A collection of our most favourite games.
			</p>

			<SearchBar
				currentSearchValue={props.currentSearchValue}
				searchValueChanged={props.searchValueChanged}
			/>
		</div>
	</div>
);

export default gameHeader;

import React from 'react';
import { Input } from 'semantic-ui-react';

import cssClasses from './SearchBar.css';

const searchBar = props => (
	<div>
		<Input
			className={cssClasses.SearchBar}
			icon="search"
			placeholder="Search from our Library..."
			onChange={props.searchValueChanged}
			value={props.currentSearchValue}
		/>
	</div>
);

export default searchBar;

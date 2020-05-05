import React from 'react';
import { Router } from 'react-router-dom';
//import history from './../../ISOF-React-modules/components/History';

import CategoryMenu from './CategoryMenu';
import SearchBox from './SearchBox';
import NordicSwitch from './NordicSwitch';

export default class SearchMenu extends React.Component {
	constructor(props) {
		super(props);

		this.searchBoxSizeChangeHandler = this.searchBoxSizeChangeHandler.bind(this);

		this.state = {
			selectedCategory: null,
			expanded: false,
			advanced: false
		};
	}

	componentDidMount() {
		this.setState({
			// remove all, first prop: selectedCategory: this.props.selectedCategory,
		});
	}

	componentWillReceiveProps(props) {
		this.setState({
			// remove all, first prop: selectedCategory: this.props.selectedCategory,
		});
	}

	searchBoxSizeChangeHandler(event) {
		this.setState({
			expanded: event.expanded,
			advanced: event.advanced
		});
	}

	render() {
		return (
			<div className={'menu-wrapper'+(this.state.expanded ? ' menu-expanded' : '')+(this.state.advanced ? ' advanced-menu-view' : '')}>

				<NordicSwitch />

				<SearchBox ref="searchBox" 
					onSizeChange={this.searchBoxSizeChangeHandler} />

				<CategoryMenu />

			</div>
		);
	}
}
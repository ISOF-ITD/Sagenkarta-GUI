import React from 'react';

import CategoryMenu from './CategoryMenu';
import SearchBox from './SearchBox';

export default class SearchMenu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedCategory: null
		};
	}

	componentDidMount() {
		this.setState({
			selectedCategory: this.props.selectedCategory,
			searchValue: this.props.searchValue,
			searchField: this.props.searchField,
			searchYearFrom: this.props.searchYearFrom,
			searchYearTo: this.props.searchYearTo,
			searchPersonRelation: this.props.searchPersonRelation,
			searchGender: this.props.searchGender
		});
	}

	componentWillReceiveProps(props) {
		this.setState({
			selectedCategory: props.selectedCategory,
			searchValue: props.searchValue,
			searchField: props.searchField,
			searchYearFrom: props.searchYearFrom,
			searchYearTo: props.searchYearTo,
			searchPersonRelation: props.searchPersonRelation,
			searchGender: props.searchGender
		});
	}

	render() {
		console.log('MapMenu: render');
		
		return (
			<div className={'menu-wrapper'+(this.refs.searchBox && this.refs.searchBox.state.expanded ? ' menu-expanded' : '')+(this.refs.searchBox && this.refs.searchBox.state.advanced ? ' advanced-menu-view' : '')}>

				<SearchBox ref="searchBox" 
					searchValue={this.state.searchValue} 
					searchField={this.state.searchField} 
					searchYearFrom={this.state.searchYearFrom} 
					searchYearTo={this.state.searchYearTo} 
					searchPersonRelation={this.state.searchPersonRelation} 
					searchGender={this.state.searchGender} />

				<CategoryMenu selectedCategory={this.state.selectedCategory} />

			</div>
		);
	}
}
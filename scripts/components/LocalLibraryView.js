import React from 'react';

import DropdownMenu from './DropdownMenu';

import localLibrary from './../../ISOF-React-modules/utils/localLibrary.js';

export default class LocalLibraryView extends React.Component {
	constructor(props) {
		super(props);

		this.libraryButtonClickHandler = this.libraryButtonClickHandler.bind(this);
	}

	libraryButtonClickHandler() {

	}

	render() {
		var savedRecords = localLibrary.list();
		var items = savedRecords && savedRecords.length > 0 ? savedRecords.map(function(item, index) {
			return <a key={index} href={'#/record/'+item.id} className="item">{item.title}</a>
		}) : <h3 className="text-center">Inga sparade sägner</h3>;
		return (
			<div className="local-library-wrapper">
				<DropdownMenu className={'map-floating-control visible library-open-button'+(savedRecords && savedRecords.length > 0 ? ' has-items' : '')} dropdownDirection="up" headerText="Mina sägner">
					{items}
				</DropdownMenu>
			</div>
		);
	}
}
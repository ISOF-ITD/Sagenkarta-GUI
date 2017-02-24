import React from 'react';
import RecordList from './RecordList';

export default class RecordListWrapper extends React.Component {
	render() {
		return (
			<RecordList 
				type={this.props.params.type || null} 
				category={this.props.params.category || null} 
				person={this.props.params.person || null}
			/>
		);
	}
}
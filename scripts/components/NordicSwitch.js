import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router';

export default class NordicSwitch extends React.Component {
	constructor(props) {
		super(props);

		this.menuButtonClick = this.menuButtonClick.bind(this);

		this.state = {
			selected: 'swedish'
		};
	}

	menuButtonClick(event) {
		this.setState({
			selected: event.currentTarget.dataset.value
		}, function() {
			window.applicationSettings.includeNordic = !window.applicationSettings.includeNordic;

			if (window.eventBus) {
				window.eventBus.dispatch('nordicLegendsUpdate');
			}
		}.bind(this));
	}

	render() {
		return <div className="nordic-switch-wrapper map-floating-control">
			<a onClick={this.menuButtonClick} data-value="swedish" className={this.state.selected == 'swedish' ? 'selected' : ''}>Svenska sägner</a>
			<a onClick={this.menuButtonClick} data-value="nordic" className={this.state.selected == 'nordic' ? 'selected' : ''}>Nordiska sägner</a>
		</div>;
	}

}
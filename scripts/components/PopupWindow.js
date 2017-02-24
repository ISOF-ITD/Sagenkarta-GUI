import React from 'react';
import { hashHistory } from 'react-router';

import routeHelper from './../utils/routeHelper';

export default class PopupWindow extends React.Component {
	constructor(props) {
		super(props);

		this.closeButtonClick = this.closeButtonClick.bind(this);

		this.state = {
			windowOpen: false
		};
	}

	closeButtonClick() {
		hashHistory.push(routeHelper.createPlacesPathFromPlace(hashHistory.getCurrentLocation().pathname));
	}

	componentWillReceiveProps(props) {
		this.setState({
			windowOpen: Boolean(props.children)
		});
	}

	componentWillUnmount() {
		document.body.classList.remove('has-overlay');
	}

	render() {
		if (this.state.windowOpen) {
			document.body.classList.add('has-overlay');
		}
		else {
			document.body.classList.remove('has-overlay');
		}

		return (
			<div className={'page-content-wrapper'+(this.state.windowOpen ? ' visible' : '')}>
				<div className="page-content">
					<a className="close-button" onClick={this.closeButtonClick}></a>
					{this.props.children}
				</div>
			</div>
		);
	}
}
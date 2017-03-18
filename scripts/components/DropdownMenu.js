import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';

export default class DropdownMenu extends React.Component {
	constructor(props) {
		super(props);

		this.menuButtonClick = this.menuButtonClick.bind(this);
		this.closeMenu = this.closeMenu.bind(this);

		this.state = {
			menuOpen: false
		};
	}

	menuButtonClick() {
		this.setState({
			menuOpen: !this.state.menuOpen
		});
	}

	closeMenu() {
		this.setState({
			menuOpen: false
		});
	}

	windowClickHandler(event) {
		var componentEl = ReactDOM.findDOMNode(this.refs.container);

		if (!componentEl.contains(event.target)) {
			this.closeMenu();
		}
	}

	componentDidMount() {
		window.addEventListener('click', this.windowClickHandler.bind(this));
	}

	componentWillReceiveProps(props) {
	}

	render() {
		return (
			<div ref="container" className="dropdown-wrapper">
				<a className="dropdown-link" onClick={this.menuButtonClick}>{this.props.label || 'Öppna'}</a>

				<div className={'dropdown-container minimal-scrollbar dropdown-list'+(this.state.menuOpen || this.props.keepOpen ? ' open' : '')}>
					{this.props.children}
				</div>
			</div>
		);
	}
}
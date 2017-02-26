import React from 'react';
import { hashHistory } from 'react-router';

import SearchMenu from './SearchMenu';
import MapView from './../../ISOF-React-modules/components/views/MapView';
import PopupWindow from './../../ISOF-React-modules/components/views/PopupWindow';

import routeHelper from './../utils/routeHelper';

export default class Application extends React.Component {
	constructor(props) {
		super(props);

		this.mapMarkerClick = this.mapMarkerClick.bind(this);
		this.popupCloseHandler = this.popupCloseHandler.bind(this);

		this.state = {
			selectedCategory: null,
			params: this.props.params
		};

		window.app = this;
	}

	mapMarkerClick(placeId) {
		hashHistory.push(routeHelper.createPlacePathFromPlaces(placeId, this.props.location.pathname));
	}

	popupCloseHandler() {
		hashHistory.push(routeHelper.createPlacesPathFromPlace(hashHistory.getCurrentLocation().pathname));
	}

	componentDidMount() {
		this.setState({
			selectedCategory: this.props.params.category,
			params: this.props.params
		});
	}

	componentWillReceiveProps(props) {
		this.setState({
			selectedCategory: props.params.category,
			params: props.params
		});
	}

	render() {
		const {
			below,
			popup
		} = this.props;
		return (
			<div>

				<div className="header">
					
					<a href="http://sprakochfolkminnen.se" className="logo"></a>

					<div className="site-name">
						<h1>Sägenkarta</h1>
						<a href="http://sprakochfolkminnen.se" className="back-link">Tillbaka</a>
					</div>

					<SearchMenu selectedCategory={this.state.selectedCategory} />

				</div>

				<MapView searchParams={this.state.params} onMarkerClick={this.mapMarkerClick} />

				{below}

				<PopupWindow router={this.context.router} onClose={this.popupCloseHandler}>
					{popup}
				</PopupWindow>

				<div className="map-progress"><div className="indicator"></div></div>

				<div className="overlay-container"></div>

			</div>
		);
	}
}
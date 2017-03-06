import React from 'react';
import { hashHistory } from 'react-router';

import MapMenu from './MapMenu';
import MapView from './../../ISOF-React-modules/components/views/MapView';
import PopupWindow from './../../ISOF-React-modules/components/views/PopupWindow';

import routeHelper from './../utils/routeHelper';
import WindowScroll from './../../ISOF-React-modules/utils/windowScroll';

export default class Application extends React.Component {
	constructor(props) {
		super(props);

		this.mapMarkerClick = this.mapMarkerClick.bind(this);
		this.popupCloseHandler = this.popupCloseHandler.bind(this);
		this.mapUpdateHandler = this.mapUpdateHandler.bind(this);
		this.popupWindowHideHandler = this.popupWindowHideHandler.bind(this);
		this.popupWindowShowHandler = this.popupWindowShowHandler.bind(this);

		this.state = {
			selectedCategory: null,
			params: this.props.params,
			popupVisible: false
		};

		window.app = this;
	}

	mapMarkerClick(placeId) {
		hashHistory.push(routeHelper.createPlacePathFromPlaces(placeId, this.props.location.pathname));
	}

	popupCloseHandler() {
		hashHistory.push(routeHelper.createPlacesPathFromPlace(hashHistory.getCurrentLocation().pathname));
	}

	mapUpdateHandler() {
		new WindowScroll().scrollToY(0, 1, 'easeInOutSine');
	}

	popupWindowShowHandler() {
		setTimeout(function() {
			this.setState({
				popupVisible: true
			});
		}.bind(this), 10);
	}

	popupWindowHideHandler() {
		setTimeout(function() {
			this.setState({
				popupVisible: false
			});
		}.bind(this), 10);
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
			<div className={'app-container'+(this.state.popupVisible ? ' has-overlay' : '')}>

				<MapView searchParams={this.state.params} onMarkerClick={this.mapMarkerClick} onMapUpdate={this.mapUpdateHandler}>
					<MapMenu selectedCategory={this.state.selectedCategory} />
				</MapView>

				{below}

				<PopupWindow onShow={this.popupWindowShowHandler} onHide={this.popupWindowHideHandler} router={this.context.router} onClose={this.popupCloseHandler}>
					{popup}
				</PopupWindow>

				<div className="map-progress"><div className="indicator"></div></div>

				<div className="overlay-container"></div>

			</div>
		);
	}
}
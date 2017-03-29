import React from 'react';
import { hashHistory } from 'react-router';

import MapMenu from './MapMenu';
import MapView from './../../ISOF-React-modules/components/views/MapView';
import PopupWindow from './../../ISOF-React-modules/components/views/PopupWindow';
import LocalLibraryView from './../../ISOF-React-modules/components/views/LocalLibraryView';

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

			searchValue: '',
			searchField: '',

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
			searchValue: this.props.params.search,
			searchField: this.props.params.search_field,
			searchYearFrom: this.props.params.year_from,
			searchYearTo: this.props.params.year_to,
			searchPersonRelation: this.props.params.person_relation,
			searchGender: this.props.params.gender,
			params: this.props.params
		});
	}

	componentWillReceiveProps(props) {
		this.setState({
			selectedCategory: props.params.category,
			searchValue: props.params.search,
			searchField: props.params.search_field,
			searchYearFrom: props.params.year_from,
			searchYearTo: props.params.year_to,
			searchPersonRelation: props.params.person_relation,
			searchGender: props.params.gender,
			params: props.params
		});
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (JSON.stringify(nextState) != JSON.stringify(this.state));
	}

	render() {
		const {
			popup
		} = this.props;
		return (
			<div className={'app-container'+(this.state.popupVisible ? ' has-overlay' : '')}>

				<MapView searchParams={this.state.params} onMarkerClick={this.mapMarkerClick} onMapUpdate={this.mapUpdateHandler}>

					<MapMenu selectedCategory={this.state.selectedCategory} 
						searchValue={this.state.searchValue} 
						searchField={this.state.searchField} 
						searchYearFrom={this.state.searchYearFrom} 
						searchYearTo={this.state.searchYearTo} 
						searchPersonRelation={this.state.searchPersonRelation} 
						searchGender={this.state.searchGender} />

					<LocalLibraryView />

				</MapView>

				<PopupWindow onShow={this.popupWindowShowHandler} onHide={this.popupWindowHideHandler} router={this.context.router} onClose={this.popupCloseHandler}>
					{popup}
				</PopupWindow>

				<div className="map-progress"><div className="indicator"></div></div>

				<div className="overlay-container"></div>

			</div>
		);
	}
}
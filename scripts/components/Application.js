import React from 'react';
import { hashHistory } from 'react-router';

import MapMenu from './MapMenu';
import MapView from './../../ISOF-React-modules/components/views/MapView';
import PopupWindow from './../../ISOF-React-modules/components/controls/PopupWindow';
import LocalLibraryView from './../../ISOF-React-modules/components/views/LocalLibraryView';
import ImageOverlay from './../../ISOF-React-modules/components/views/ImageOverlay';
import FeedbackOverlay from './../../ISOF-React-modules/components/views/FeedbackOverlay';

import routeHelper from './../utils/routeHelper';
import WindowScroll from './../../ISOF-React-modules/utils/windowScroll';

import EventBus from 'eventbusjs';

export default class Application extends React.Component {
	constructor(props) {
		super(props);

		window.eventBus = EventBus;

		window.applicationSettings = {
			includeNordic: false
		};

		this.mapMarkerClick = this.mapMarkerClick.bind(this);
		this.popupCloseHandler = this.popupCloseHandler.bind(this);
		this.popupWindowHideHandler = this.popupWindowHideHandler.bind(this);
		this.popupWindowShowHandler = this.popupWindowShowHandler.bind(this);

		this.languageChangedHandler = this.languageChangedHandler.bind(this);

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
		if (hashHistory.getCurrentLocation().pathname.indexOf('record/')) {
			hashHistory.push(routeHelper.createPlacesPathFromRecord(hashHistory.getCurrentLocation().pathname));
		}
		else if (hashHistory.getCurrentLocation().pathname.indexOf('place/')) {
			hashHistory.push(routeHelper.createPlacesPathFromPlace(hashHistory.getCurrentLocation().pathname));
		}
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

	languageChangedHandler() {
		console.log('language changed');
		this.forceUpdate();
	}

	componentDidMount() {
		if (window.eventBus) {
			eventBus.dispatch('application.searchParams', {
				selectedCategory: this.props.params.category,
				searchValue: this.props.params.search,
				searchField: this.props.params.search_field,
				searchYearFrom: this.props.params.year_from,
				searchYearTo: this.props.params.year_to,
				searchPersonRelation: this.props.params.person_relation,
				searchGender: this.props.params.gender,
			});

			window.eventBus.addEventListener('Lang.setCurrentLang', this.languageChangedHandler);
		}

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
		if (window.eventBus) {
			eventBus.dispatch('application.searchParams', {
				selectedCategory: props.params.category,
				searchValue: props.params.search,
				searchField: props.params.search_field,
				searchYearFrom: props.params.year_from,
				searchYearTo: props.params.year_to,
				searchPersonRelation: props.params.person_relation,
				searchGender: props.params.gender,
			});
		}

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

				<MapView searchParams={this.state.params} onMarkerClick={this.mapMarkerClick}>

					<MapMenu />

					<LocalLibraryView headerText={l('Mina sägner')} />

				</MapView>

				<PopupWindow onShow={this.popupWindowShowHandler} onHide={this.popupWindowHideHandler} router={this.context.router} onClose={this.popupCloseHandler}>
					{popup}
				</PopupWindow>

				<div className="map-progress"><div className="indicator"></div></div>

				<ImageOverlay />

				<FeedbackOverlay />

			</div>
		);
	}
}
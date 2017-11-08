import React from 'react';
import { hashHistory } from 'react-router';

import MapMenu from './MapMenu';
import MapView from './../../ISOF-React-modules/components/views/MapView';
import RoutePopupWindow from './../../ISOF-React-modules/components/controls/RoutePopupWindow';
import LocalLibraryView from './../../ISOF-React-modules/components/views/LocalLibraryView';
import ImageOverlay from './../../ISOF-React-modules/components/views/ImageOverlay';
import FeedbackOverlay from './../../ISOF-React-modules/components/views/FeedbackOverlay';
import TranscriptionOverlay from './../../ISOF-React-modules/components/views/TranscriptionOverlay';
import PopupNotificationMessage from './../../ISOF-React-modules/components/controls/PopupNotificationMessage';
import OverlayWindow from './../../ISOF-React-modules/components/controls/OverlayWindow';
import SitevisionContent from './../../ISOF-React-modules/components/controls/SitevisionContent';

import routeHelper from './../utils/routeHelper';
import WindowScroll from './../../ISOF-React-modules/utils/windowScroll';

import config from './../config.js';

import EventBus from 'eventbusjs';

export default class Application extends React.Component {
	constructor(props) {
		super(props);

		// Lägg till globalt eventBus variable för att skicka data mellan moduler
		window.eventBus = EventBus;

		/* Global applicationSettings, includeNordic = false betyder att vi inkluderar inte norskt material som standard
			includeNordic används av ISOF-React-modules/components/collections/MapCollection.js och
			ISOF-React-modules/components/collections/RecordsCollection.js i Nordisk_sägenkarta branchen.
		*/
		window.applicationSettings = {
			includeNordic: false
		};

		// Bind event handlers till "this" (själva Application instance)
		this.mapMarkerClick = this.mapMarkerClick.bind(this);
		this.popupCloseHandler = this.popupCloseHandler.bind(this);
		this.popupWindowHideHandler = this.popupWindowHideHandler.bind(this);
		this.popupWindowShowHandler = this.popupWindowShowHandler.bind(this);
		this.introOverlayCloseButtonClickHandler = this.introOverlayCloseButtonClickHandler.bind(this);
 
		this.languageChangedHandler = this.languageChangedHandler.bind(this);

		this.languageChangedHandler = this.languageChangedHandler.bind(this);

		this.state = {
			selectedCategory: null,

			searchValue: '',
			searchField: '',

			params: this.props.params,
			popupVisible: false
		};
	}

	mapMarkerClick(placeId) {
		hashHistory.push(routeHelper.createPlacePathFromPlaces(placeId, this.props.location.pathname));
	}

	popupCloseHandler() {
		if (hashHistory.getCurrentLocation().pathname.indexOf('record/') > -1) {
			hashHistory.push(routeHelper.createPlacesPathFromRecord(hashHistory.getCurrentLocation().pathname));
		}
		else if (hashHistory.getCurrentLocation().pathname.indexOf('place/') > -1) {
			hashHistory.push(routeHelper.createPlacesPathFromPlace(hashHistory.getCurrentLocation().pathname));
		}
		else {
			hashHistory.push('places');
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

	introOverlayCloseButtonClickHandler() {
		eventBus.dispatch('overlay.hide');

		if (this.state.neverShowIntro) {
			localStorage.setItem('neverShowIntro', true);
		}
	}

	languageChangedHandler() {
		console.log('language changed');
		this.forceUpdate();
	}

	componentDidMount() {
		if (window.eventBus) {
			window.eventBus.dispatch('application.searchParams', {
				selectedCategory: this.props.params.category,
				searchValue: this.props.params.search,
				searchField: this.props.params.search_field,
				searchYearFrom: this.props.params.year_from,
				searchYearTo: this.props.params.year_to,
				searchPersonRelation: this.props.params.person_relation,
				searchGender: this.props.params.gender
			});

			window.eventBus.addEventListener('Lang.setCurrentLang', this.languageChangedHandler);

			setTimeout(function() {
				if (!localStorage.getItem('neverShowIntro')) {
					eventBus.dispatch('overlay.intro');
				}
			}, 2500);
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
		}, function() {
			setTimeout(function() {
				document.body.classList.add('app-initialized');
			}.bind(this), 1000);
		}.bind(this));

		setTimeout(function() {
			this.setState({
				overlayWindowHtml: window.document.getElementsByClassName('sv-text-portlet-content').length > 0 ? window.document.getElementsByClassName('sv-text-portlet-content')[0].innerHTML : null
			});
		}.bind(this), 10);
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
		var popup = this.props.popup;

		return (
			<div className={'app-container'+(this.state.popupVisible ? ' has-overlay' : '')}>

				<MapView searchParams={this.state.params} onMarkerClick={this.mapMarkerClick}>

					<MapMenu />

					<LocalLibraryView headerText={l('Mina sägner')} />

				</MapView>

				<RoutePopupWindow onShow={this.popupWindowShowHandler} onHide={this.popupWindowHideHandler} router={this.context.router} onClose={this.popupCloseHandler}>
					{popup}
				</RoutePopupWindow>

				<div className="map-progress"><div className="indicator"></div></div>

				<ImageOverlay />
				<FeedbackOverlay />
				<TranscriptionOverlay />
				<PopupNotificationMessage />
				<OverlayWindow title="Velkommen till sägenkartan">
					<SitevisionContent url={config.startPageUrl} disableScriptExecution={true} />
					<div>
						<hr className="margin-bottom-35"/>
						<button className="button-primary margin-bottom-0" onClick={this.introOverlayCloseButtonClickHandler}>Stäng</button>
						<label className="margin-top-10 margin-bottom-0 font-weight-normal u-pull-right"><input className="margin-bottom-0" onChange={function(event) {this.setState({neverShowIntro: event.currentTarget.checked})}.bind(this)} type="checkbox" /> Klicka här för att inte visa den rutan igen.</label>
					</div>
				</OverlayWindow>

			</div>
		);
	}
}
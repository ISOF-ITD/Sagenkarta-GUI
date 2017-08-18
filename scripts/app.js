import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, Redirect } from 'react-router'

import Application from './components/Application';
import RecordListWrapper from './../ISOF-React-modules/components/views/RecordListWrapper';
import RecordView from './../ISOF-React-modules/components/views/RecordView';
import PlaceView from './../ISOF-React-modules/components/views/PlaceView';
import PersonView from './../ISOF-React-modules/components/views/PersonView';

// IE 11 backwards compatibility
import 'whatwg-fetch';
import Promise from 'promise-polyfill';

if (!window.Promise) {
	window.Promise = Promise;
}

import Lang from './../ISOF-React-modules/lang/Lang';
window.Lang = Lang;
window.l = Lang.get;

ReactDOM.render(
	<Router history={hashHistory}>
		<Redirect from="/" to="/places"/>
		<Route path="/" component={Application}>

			<Route path="/places(/search/:search)(/search_field/:search_field)(/type/:type)(/category/:category)(/year_from/:year_from)(/year_to/:year_to)(/person_relation/:person_relation)(/gender/:gender)(/person_landskap/:person_landskap)(/person_county/:person_county)(/person_harad/:person_harad)(/person_socken/:person_socken)" 
				manuallyOpenPopup="true" openButtonLabel="Visa sökträffar som lista" components={{popup: RecordListWrapper}}/>

			<Route path="/place/:place_id(/search/:search)(/search_field/:search_field)(/type/:type)(/category/:category)(/year_from/:year_from)(/year_to/:year_to)(/person_relation/:person_relation)(/gender/:gender)(/person_landskap/:person_landskap)(/person_county/:person_county)(/person_harad/:person_harad)(/person_socken/:person_socken)" 
				components={{popup: PlaceView}}/>

			<Route path="/person/:person_id" 
				components={{popup: PersonView}}/>

			<Route path="/record/:record_id(/search/:search)(/search_field/:search_field)(/type/:type)(/category/:category)(/year_from/:year_from)(/year_to/:year_to)(/person_relation/:person_relation)(/gender/:gender)(/person_landskap/:person_landskap)(/person_county/:person_county)(/person_harad/:person_harad)(/person_socken/:person_socken)" 
				components={{popup: RecordView}}/>

		</Route>
	</Router>,
	document.getElementById('app')
);
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router'

import Application from './components/Application';
import RecordListWrapper from './components/RecordListWrapper';
import RecordView from './components/RecordView';
import PlaceView from './components/PlaceView';
import PersonView from './components/PersonView';

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Application}>
			<Route path="/places(/search/:search)(/search_field/:search_field)(/type/:type)(/category/:category)(/year_from/:year_from)(/year_to/:year_to)(/person_relation/:person_relation)(/gender/:gender)(/person_landskap/:person_landskap)(/person_county/:person_county)(/person_harad/:person_harad)(/person_socken/:person_socken)" components={{below: RecordListWrapper}}/>
			<Route path="/place/:place_id(/search/:search)(/search_field/:search_field)(/type/:type)(/category/:category)(/year_from/:year_from)(/year_to/:year_to)(/person_relation/:person_relation)(/gender/:gender)(/person_landskap/:person_landskap)(/person_county/:person_county)(/person_harad/:person_harad)(/person_socken/:person_socken)" components={{below: RecordListWrapper, popup: PlaceView}}/>
			<Route path="/person/:person_id" components={{popup: PersonView}}/>
			<Route path="/record/:record_id" components={{popup: RecordView}}/>
		</Route>
	</Router>,
	document.getElementById('app')
);
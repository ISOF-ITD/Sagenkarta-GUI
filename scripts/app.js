import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Redirect } from 'react-router-dom'

import Application from './components/Application';
import RecordListWrapper from './../ISOF-React-modules/components/views/RecordListWrapper';
import RecordView from './../ISOF-React-modules/components/views/RecordView';
import PlaceView from './../ISOF-React-modules/components/views/PlaceView';
import PersonView from './../ISOF-React-modules/components/views/PersonView';

console.log(`Sägenkartan running React.js version ${React.version} and ReactDOM version ${ReactDOM.version}`);

/*
Object.assign polyfill
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
*/
if (typeof Object.assign != 'function') {
	// Must be writable: true, enumerable: false, configurable: true
	Object.defineProperty(Object, "assign", {
		value: function assign(target, varArgs) { // .length of function is 2
			'use strict';
			if (target == null) { // TypeError if undefined or null
				throw new TypeError('Cannot convert undefined or null to object');
			}

			var to = Object(target);

			for (var index = 1; index < arguments.length; index++) {
				var nextSource = arguments[index];

				if (nextSource != null) { // Skip over if undefined or null
					for (var nextKey in nextSource) {
						// Avoid bugs when hasOwnProperty is shadowed
						if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
							to[nextKey] = nextSource[nextKey];
						}
					}
				}
			}
			return to;
		},
		writable: true,
		configurable: true
	});
}

// IE 11 backwards compatibility, Promise och Fetch
import 'whatwg-fetch';
import Promise from 'promise-polyfill';

if (!window.Promise) {
	window.Promise = Promise;
}

// Initalisera stöd för flerspråkighet
import Lang from './../ISOF-React-modules/lang/Lang';
// Språk: svenska
Lang.setCurrentLang('sv');
window.Lang = Lang;
window.l = Lang.get;

// Initalisera React.js Router som bestämmer vilken "sida" användaren ser baserad på url:et 
// "component" pekar mot importerade componenter (se högst uppe i denna fil)
ReactDOM.render(

	<HashRouter>
		<Route exact path="/">
			<Redirect to="/places/nordic/true" />
		</Route>
		<Route 
			path={[
				"/places/text_ids/:text_ids",

				//"/places/search/:search?/category/:category,:subcategory/(has_metadata)?/:has_metadata?",
				//"/places/search/:search/category/:category/(has_metadata)?/:has_metadata?",
				//"/places/search/:search/(has_metadata)?/:has_metadata?",
				"/places/search/:search/category/:category/(nordic)?/:nordic?",
				"/places/search/:search/(nordic)?/:nordic?",
				
				"/places/search_field/:search_field",

				//"/places/:place_id/category/:category,:subcategory/(has_metadata)?/:has_metadata?",
				//"/places/:place_id/category/:category/(has_metadata)?/:has_metadata?",
				//"/places/category/:category,:subcategory/(has_metadata)?/:has_metadata?",
				//"/places/category/:category/(has_metadata)?/:has_metadata?",
				//"/places/:place_id/search/:search/category/:category,:subcategory/(has_metadata)?/:has_metadata?",
				//"/places/:place_id/search/:search/category/:category/(has_metadata)?/:has_metadata?",
				//"/places/:place_id/search/:search/(has_metadata)?/:has_metadata?",
				//"/places/:place_id/(has_metadata)?/:has_metadata?",

				"/places/:place_id/category/:category/(nordic)?/:nordic?",
				"/places/category/:category/(nordic)?/:nordic?",
				"/places/:place_id/(nordic)?/:nordic?",
				"/places/:place_id/search/:search/category/:category/(nordic)?/:nordic?",
				"/places/:place_id/search/:search/(nordic)?/:nordic?",

				"/places/(nordic)?/:nordic?", // this has to be the last item in order to match the other routes, 
				//"/places/(has_metadata)?/:has_metadata?", // this has to be the last item in order to match the other routes, 
				// otherwise it will match longer paths as well


			]}
			render={(match) =>
				<Application
					popup={<RecordListWrapper 
						{...match} 
						manuallyOpenPopup={true}
						//highlightRecordsWithMetadataField="sitevision_url" 
						openButtonLabel="Visa sökträffar som lista"
						disableRouterPagination={true}
						/>}
					{...match}	
				/>
			}
		/>
		<Route 
			path={[
				//"/record/:record_id/text_ids/:text_ids/(has_metadata)?/:has_metadata?",
				//"/record/:record_id/search/:search/category/:category,:subcategory/(has_metadata)?/:has_metadata?",
				//"/record/:record_id/search/:search/category/:category/(has_metadata)?/:has_metadata?",
				//"/record/:record_id/search/:search/(has_metadata)?/:has_metadata?",
				//"/record/:record_id/search_field/:search_field/(has_metadata)?/:has_metadata?",
				//"/record/:record_id/category/:category,:subcategory/(has_metadata)?/:has_metadata?",
				//"/record/:record_id/category/:category/(has_metadata)?/:has_metadata?",
				//"/record/:record_id/(has_metadata)?/:has_metadata?",

				"/record/:person_id/text_ids/:text_ids/(nordic)?/:nordic?",
				//"/record/:record_id/search/:search/category/:category,:subcategory/(nordic)?/:nordic?",
				"/record/:record_id/search/:search/category/:category/(nordic)?/:nordic?",
				"/record/:record_id/search/:search/(nordic)?/:nordic?",
				"/record/:record_id/search_field/:search_field/(nordic)?/:nordic?",
				//"/record/:record_id/category/:category,:subcategory/(nordic)?/:nordic?",
				"/record/:record_id/category/:category/(nordic)?/:nordic?",
				"/record/:record_id/(nordic)?/:nordic?",
			]}
			render={(match) =>
				<Application
					popup={<RecordView
						{...match} 
						fullWidthContentArea={true}
						/>}
					{...match}	
				/>
			}
		/>
		<Route 
			path={[
				"/person/:person_id",
			]}
			render={(match) =>
				<Application
					popup={<PersonView
						{...match} 
						fullWidthContentArea={true}
						/>}
					{...match}	
				/>
			}
		/>
	</HashRouter>,
	document.getElementById('app')


// Old:
//			<Route path="/places(/record_ids/:record_ids)(/search/:search)(/search_field/:search_field)(/type/:type)(/category/:category)(/year_from/:year_from)(/year_to/:year_to)(/person_relation/:person_relation)(/gender/:gender)(/person_landskap/:person_landskap)(/person_county/:person_county)(/person_harad/:person_harad)(/person_socken/:person_socken)(/nordic/:nordic)(/page/:page)" 
//				manuallyOpenPopup="true" openButtonLabel="Visa sökträffar som lista" components={{popup: RecordListWrapper}}/>

//			<Route path="/place/:place_id(/record_ids/:record_ids)(/search/:search)(/search_field/:search_field)(/type/:type)(/category/:category)(/year_from/:year_from)(/year_to/:year_to)(/person_relation/:person_relation)(/gender/:gender)(/person_landskap/:person_landskap)(/person_county/:person_county)(/person_harad/:person_harad)(/person_socken/:person_socken)(/nordic/:nordic)" 
//				components={{popup: PlaceView}}/>

//			<Route path="/person/:person_id" 
//				components={{popup: PersonView}}/>

//			<Route path="/record/:record_id(/record_ids/:record_ids)(/search/:search)(/search_field/:search_field)(/type/:type)(/category/:category)(/year_from/:year_from)(/year_to/:year_to)(/person_relation/:person_relation)(/gender/:gender)(/person_landskap/:person_landskap)(/person_county/:person_county)(/person_harad/:person_harad)(/person_socken/:person_socken)(/nordic/:nordic)" 
//				components={{popup: RecordView}}/>


);
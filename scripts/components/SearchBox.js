import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router';

import DropdownMenu from './../../ISOF-React-modules/components/controls/DropdownMenu';
import CategoryList from './CategoryList';

export default class SearchBox extends React.Component {
	constructor(props) {
		super(props);

		this.inputKeyPressHandler = this.inputKeyPressHandler.bind(this);

		this.searchValueChangeHandler = this.searchValueChangeHandler.bind(this);
		this.searchFieldChangeHandler = this.searchFieldChangeHandler.bind(this);
		this.searchPersonRelationChangeHandler = this.searchPersonRelationChangeHandler.bind(this);
		this.searchGenderChangeHandler = this.searchGenderChangeHandler.bind(this);
		this.searchCategoriesChangeHandler = this.searchCategoriesChangeHandler.bind(this);

		this.searchButtonClickHandler = this.searchButtonClickHandler.bind(this);

		this.executeSimpleSearch = this.executeSimpleSearch.bind(this);

		this.searchBoxClickHandler = this.searchBoxClickHandler.bind(this);
		this.toggleAdvanced = this.toggleAdvanced.bind(this);

		this.languageChangedHandler = this.languageChangedHandler.bind(this);

		if (window.eventBus) {
			window.eventBus.addEventListener('application.searchParams', this.receivedSearchParams.bind(this))
		}

		this.state = {
			searchValue: '',
			searchField: 'record',
			expanded: false,
			advanced: false,
			searchCategories: []
		};

		window.searchBox = this;
	}

	inputKeyPressHandler(event) {
		if (event.key == 'Enter') {
			this.executeSimpleSearch();
		}
	}

	executeSimpleSearch() {
		hashHistory.push('/places'+(this.state.searchValue != '' ? '/search/'+this.state.searchValue+'/search_field/'+this.state.searchField : ''));
	}

	searchButtonClickHandler() {
		hashHistory.push(
			'/places'+
			(
				this.state.searchValue != '' ?
					'/search/'+this.state.searchValue+
					'/search_field/'+this.state.searchField
				: ''
			)+
			(
				this.state.searchCategories.length > 0 ?
					'/category/'+this.state.searchCategories.join(';')
				: ''
			)+
			(
				this.state.searchPersonRelation != '' ?
					'/person_relation/'+this.state.searchPersonRelation
				: ''
			)+
			(
				this.state.searchGender != '' ?
					'/gender/'+this.state.searchGender
				: ''
			)
		);
	}

	searchValueChangeHandler(event) {
		if (event.target.value != this.state.searchValue) {
			this.setState({
				searchValue: event.target.value
			});
		}
	}

	searchFieldChangeHandler(event) {
		if (event.target.value != this.state.searchField) {
			this.setState({
				searchField: event.target.value
			});
		}
	}

	searchPersonRelationChangeHandler(event) {
		if (event.target.value != this.state.searchPersonRelation) {
			this.setState({
				searchPersonRelation: event.target.value == 'both' ? '' : event.target.value
			});
		}
	}

	searchGenderChangeHandler(event) {
		if (event.target.value != this.state.searchGender) {
			this.setState({
				searchGender: event.target.value == 'both' ? '' : event.target.value
			});
		}
	}

	searchCategoriesChangeHandler(event) {
		this.setState({
			searchCategories: event
		});
	}

	searchBoxClickHandler() {
		if (!this.state.expanded) {
			this.setState({
				expanded: true
			}, function() {
				if (this.props.onSizeChange) {
					this.props.onSizeChange(this.state)
				}
			}.bind(this));
			
			this.refs.searchInput.focus();
		}

	}

	toggleAdvanced() {
		this.setState({
			advanced: !this.state.advanced
		}, function() {
			if (this.props.onSizeChange) {
				this.props.onSizeChange(this.state)
			}
		}.bind(this));
	}

	receivedSearchParams(event) {
		this.setState({
			searchValue: event.target.searchValue || '',
			searchField: event.target.searchField || 'record',
			searchYearFrom: event.target.searchYearFrom,
			searchYearTo: event.target.searchYearTo,
			searchPersonRelation: event.target.searchPersonRelation || '',
			searchGender: event.target.searchGender || ''
		});
	}

	languageChangedHandler() {
		console.log('language changed');
		this.forceUpdate();
	}

	componentDidMount() {
		document.getElementById('app').addEventListener('click', this.windowClickHandler.bind(this));

		if (window.eventBus) {
			window.eventBus.addEventListener('Lang.setCurrentLang', this.languageChangedHandler)
		}
/*
		this.setState({
			searchValue: this.props.searchValue || '',
			searchField: this.props.searchField || 'record',
			searchYearFrom: this.props.searchYearFrom,
			searchYearTo: this.props.searchYearTo,
			searchPersonRelation: this.props.searchPersonRelation || '',
			searchGender: this.props.searchGender || ''
		});
*/
	}

	componentWillUnmount() {
		if (window.eventBus) {
			window.eventBus.removeEventListener('Lang.setCurrentLang', this.languageChangedHandler)
		}
	}

	windowClickHandler(event) {
		var componentEl = ReactDOM.findDOMNode(this.refs.container);

		if (!componentEl.contains(event.target) && !this.state.advanced) {
			this.setState({
				expanded: false
			}, function() {
				if (this.props.onSizeChange) {
					this.props.onSizeChange(this.state)
				}
			}.bind(this));
		}
	}

/*
	componentWillReceiveProps(props) {
		if (this.props.searchValue !== props.searchValue || 
			this.props.searchField !== props.searchField || 
			this.props.searchYearFrom !== props.searchYearFrom || 
			this.props.searchYearTo !== props.searchYearTo || 
			this.props.searchPersonRelation !== props.searchPersonRelation || 
			this.props.searchGender !== props.searchGender
		) {
			var advandedSearch = props.searchYearFrom || props.searchYearTo || props.searchPersonRelation || props.searchGender;

			this.setState({
				searchValue: props.searchValue || '',
				searchField: props.searchField || 'record',
				searchYearFrom: props.searchYearFrom,
				searchYearTo: props.searchYearTo,
				searchPersonRelation: props.searchPersonRelation || '',
				searchGender: props.searchGender || '',
				expanded: advandedSearch,
				advanced: advandedSearch
			}, function() {
				if (this.props.onSizeChange) {
					this.props.onSizeChange(this.state)
				}
			}.bind(this));
		}
	}
*/

	render() {
		return (
			<div ref="container" 
				onClick={this.searchBoxClickHandler} 
				className={'search-box map-floating-control'+(this.state.expanded ? ' expanded' : '')+(this.state.advanced ? ' advanced' : '')} >
				<input ref="searchInput" type="text" 
					value={this.state.searchValue} 
					onChange={this.searchValueChangeHandler} 
					onKeyPress={this.inputKeyPressHandler} />
				
				<div className="search-label">
					{
						this.state.searchValue != '' ?
						(
							this.state.searchField == 'record' ? 'Innehåll: ' :
							this.state.searchField == 'person' ? 'Person: ' :
							this.state.searchField == 'place' ? 'Ort: ' : ''
						) : l('Sök')
					}
					<strong>
						{
							this.state.searchValue != '' ?
							this.state.searchValue : ''
						}
					</strong>
				</div>

				<button className="search-button" onClick={this.executeSimpleSearch}></button>

				<div className="expanded-content">

					<div className="radio-group">

						<label>
							<input type="radio" value="record" onChange={this.searchFieldChangeHandler} name="search-field" checked={this.state.searchField == 'record'} />
							Innehåll
						</label>

						<label>
							<input type="radio" value="person" onChange={this.searchFieldChangeHandler} name="search-field" checked={this.state.searchField == 'person'} />
							Person
						</label>

						<label>
							<input type="radio" value="place" onChange={this.searchFieldChangeHandler} name="search-field" checked={this.state.searchField == 'place'} />
							Ort
						</label>

					</div>

					<a className="advanced-button" onClick={this.toggleAdvanced}>Avancerad sökning</a>

					<div className="advanced-content">

						<hr/>

						<h4>Kategorier</h4>
						<DropdownMenu label="Avgränsa till kategorier">
							<CategoryList multipleSelect="true" onChange={this.searchCategoriesChangeHandler} />
						</DropdownMenu>

						<hr/>

						<h4>Roll</h4>
						<div className="radio-group">
						
							<label>
								<input type="radio" value="c" onChange={this.searchPersonRelationChangeHandler} name="search-person-relation" checked={this.state.searchPersonRelation == 'c'} />
								Upptecknare
							</label>

							<label>
								<input type="radio" value="i" onChange={this.searchPersonRelationChangeHandler} name="search-person-relation" checked={this.state.searchPersonRelation == 'i'} />
								Meddelare
							</label>

							<label>
								<input type="radio" value="both" onChange={this.searchPersonRelationChangeHandler} name="search-person-relation" checked={this.state.searchPersonRelation == ''} />
								Båda
							</label>

						</div>

						<hr/>

						<h4>Kön</h4>
						<div className="radio-group">
						
							<label>
								<input type="radio" value="k" onChange={this.searchGenderChangeHandler} name="search-gender" checked={this.state.searchGender == 'k'} />
								Kvinna
							</label>

							<label>
								<input type="radio" value="m" onChange={this.searchGenderChangeHandler} name="search-gender" checked={this.state.searchGender == 'm'} />
								Man
							</label>

							<label>
								<input type="radio" value="both" onChange={this.searchGenderChangeHandler} name="search-gender" checked={this.state.searchGender == ''} />
								Båda
							</label>

						</div>

						<hr/>

						<button className="button-primary" onClick={this.searchButtonClickHandler}>{l('Sök')}</button>

					</div>

				</div>
			</div>
		);
	}
}
import React from 'react';

import SimpleMap from './SimpleMap';

export default class PlaceView extends React.Component {
	constructor(props) {
		super(props);

		window.placeView = this;

		this.state = {
			data: {},
			placeMarker: {}
		};

		this.url = 'http://www4.sprakochfolkminnen.se/sagner/api/place/';
	}

	componentDidMount() {
		this.fetchData(this.props.params);
	}

	componentWillReceiveProps(props) {
		if (props.params.place_id != this.props.params.place_id) {
			this.fetchData(props.params);
		}
	}

	fetchData(params) {
		if (params.place_id) {
			fetch(this.url+params.place_id)
				.then(function(response) {
					return response.json()
				}).then(function(json) {
					this.setState({
						data: json
					});
				}.bind(this)).catch(function(ex) {
					console.log('parsing failed', ex)
				})
			;
		}

		console.log('PlaceView: fetchData');
		console.log(params);

		if ((params.type && params.type != '') || (params.category && params.category != '')) {
			fetch(this.url)
		}
	}

	render() {
		var informantsItems = this.state.data.informants && this.state.data.informants.length > 0 ? this.state.data.informants.map(function(informant, index) {
			return <tr key={index}>
				<td><a href={'#person/'+informant.id}>{informant.firstname+' '+informant.surname}</a></td>
				<td>{informant.birth_year > 0 ? informant.birth_year : ''}</td>
			</tr>;
		}.bind(this)) : [];

		var recordsItems = this.state.data.records && this.state.data.records.length > 0 ? this.state.data.records.map(function(record, index) {
			return <tr key={index}>
				<td data-title=""><a href={'#record/'+record.id}>{record.title ? record.title : '(Untitled)'}</a></td>
				<td data-title="Kategori">{record.taxonomy.name}</td>
				<td data-title="Socken, Landskap">
					{record.places &&
						<span>{record.places[0].name+', '+record.places[0].landskap}</span>
					}
				</td>
				<td data-title="Uppteckningsår">{record.year > 0 ? record.year : ''}</td>
				<td data-title="Materialtyp">{record.type}</td>
			</tr>;
		}.bind(this)) : [];

		return (
			<div className="container">
		
				<div className="row">
					<div className="twelve columns">
						<h2>{this.state.data.name}</h2>
						<p><strong>Härad</strong>: {this.state.data.harad}, <strong>Län</strong>: {this.state.data.county}, <strong>Landskap</strong>: {this.state.data.landskap}</p>
					</div>
				</div>

				<div className="row">
					<div className="twelve columns">
						<SimpleMap marker={this.state.data.lat && this.state.data.lng ? {lat: this.state.data.lat, lng: this.state.data.lng, label: this.state.data.name} : null} />
					</div>
				</div>

				<div className="row search-results-container">
					<div className="twelve columns">
						<h4>Sökträffar</h4>
						<div className="records-list-container"></div>
					</div>
				</div>

				{this.state.data.informants && this.state.data.informants.length > 0 &&

					<div className="row">
						<div className="twelve columns">
							<h4>Intervjuade personer</h4>

							<div className="table-wrapper">
								<table width="100%">
									<thead>
										<tr>
											<th>Namn</th>
											<th>Födelseår</th>
										</tr>
									</thead>
									<tbody>
										{informantsItems}
									</tbody>
								</table>
							</div>
						</div>
					</div>

				}

				{this.state.data.records && this.state.data.records.length > 0 &&

					<div className="row">
						<div className="twelve columns">
							<h4>Samtliga uppteckningar från orten</h4>

							<div className="table-wrapper">
								<table width="100%" className="table-responsive">
									<thead>
										<tr>
											<th>Titel</th>
											<th>Kategori</th>
											<th>Socken, Landskap</th>
											<th>Uppteckningsår</th>
											<th>Materialtyp</th>
										</tr>
									</thead>
									<tbody>
										{recordsItems}
									</tbody>
								</table>
							</div>
						</div>
					</div>

				}

			</div>
		);
	}
}
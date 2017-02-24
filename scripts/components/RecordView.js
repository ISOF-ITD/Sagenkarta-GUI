import React from 'react';

export default class RecordView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: {}
		};

		this.url = 'http://www4.sprakochfolkminnen.se/sagner/api/record/';
	}

	componentDidMount() {
		this.fetchData(this.props.params);
	}

	componentWillReceiveProps(props) {
		if (props.params.record_id != this.props.params.record_id) {
			this.fetchData(props.params);
		}
	}

	fetchData(params) {
		console.log('PersonView: fetchData');
		if (params.record_id) {
			fetch(this.url+params.record_id)
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
	}

	render() {
		var imageUrl = 'http://www4.sprakochfolkminnen.se/Folkminnen/Svenska_sagor_filer/';
		var mediaItems = this.state.data.media && this.state.data.media.length > 0 ? this.state.data.media.map(function(image, index) {
			return <a key={index} className="image-link" target="_blank" href={imageUrl+image.source}><img className="archive-image" src={imageUrl+image.source} alt="" /></a>
		}) : [];

		var personItems = this.state.data.persons && this.state.data.persons.length > 0 ? this.state.data.persons.map(function(person, index) {
			return <tr key={index}>
				<td data-title=""><a href={'#person/'+person.id}>{(person.firstname ? person.firstname : '')+' '+(person.surname ? person.surname : '')}</a></td>
				<td data-title="Födelseår">{person.birth_year && person.birth_year > 0 ? person.birth_year : ''}</td>
				<td data-title="Födelseort">
					{
						person.home && person.home.length > 0 &&
						<a href={'#place/'+person.home.id}>{person.home.name+', '+person.home.harad}</a>
					}
				</td>
				<td data-title="Roll">{person.relation == 'collector' ? 'Upptecknare' : person.relation == 'informant' ? 'Informant' : ''}</td>
			</tr>;
		}) : [];


		var placeItems = this.state.data.places && this.state.data.places.length > 0 ? this.state.data.places.map(function(place, index) {
			return <tr key={index}>
				<td><a href={'#place/'+place.id}>{place.name+', '+place.harad}</a></td>
			</tr>;
		}) : [];

		return <div className="container">
		
				<div className="row">
					<div className="twelve columns">
						<h2>{this.state.data.title}<br/>
							<span className="lighter">
								Materialtyp: {this.state.data.type == 'arkiv' ? 'Arkiv' : this.state.data.type == 'register' ? 'Register' : this.state.data.type == 'tryckt' ? 'Tryckt' : '' }
							</span>
						</h2>
					</div>
				</div>

				<div className="row">

					<div className="six columns">
						<p>{this.state.data.text}</p>

						{
							this.state.data.comment && this.state.data.comment != '' &&
							<p><strong>Kommentarer:</strong><br/>{this.state.data.comment}</p>
						}
					</div>

					{
						mediaItems.length > 0 &&
						<div className="four columns u-pull-right">
							{mediaItems}
						</div>
					}

				</div>

				<hr/>

				{
					personItems.length > 0 &&
					<div className="row">

						<div className="twelve columns">
							<h4>Personer</h4>

							<div className="table-wrapper">
								<table width="100%" className="table-responsive">
									<thead>
										<tr>
											<th>Namn</th>
											<th>Födelseår</th>
											<th>Födelseort</th>
											<th>Roll</th>
										</tr>
									</thead>
									<tbody>
										{personItems}
									</tbody>
								</table>
							</div>
						</div>

					</div>
				}

				{
					placeItems.length > 0 &&
					<div className="row">

						<div className="six columns">
							<h4>Platser</h4>

							<div className="table-wrapper">
								<table width="100%">

									<thead>
										<tr>
											<th>Namn</th>
										</tr>
									</thead>

									<tbody>
										{placeItems}
									</tbody>

								</table>
							</div>
						</div>

						<div className="six columns">
							<div className="map-container small"></div>
						</div>

					</div>
				}

				<hr/>

				<div className="row">

					<div className="four columns">
						{
							this.state.data.archive && this.state.data.archive.archive && this.state.data.archive.archive != 'null' &&
							<p><strong>Arkiv</strong><br/>{this.state.data.archive.archive}</p>
						}

						{
							this.state.data.archive && this.state.data.archive.archive && this.state.data.archive.archive_id != 'null' &&
							<p><strong>Acc. nr</strong><br/>{this.state.data.archive.archive_id}</p>
						}

						{
							this.state.data.archive && this.state.data.archive.archive && this.state.data.archive.page != 'null' &&
							<p><strong>Sid. nr</strong><br/>this.state.data.archive.page}</p>
						}
					</div>

					<div className="four columns">
						<p><strong>Materialtyp</strong><br/>
							{this.state.data.type == 'arkiv' ? 'Arkiv' : this.state.data.type == 'register' ? 'Register' : this.state.data.type == 'tryckt' ? 'Tryckt' : '' }
						</p>

						<p><strong>Kategori</strong><br/>
							{this.state.data.taxonomy ? this.state.data.taxonomy.name : ''}</p>
					</div>

					<div className="four columns">
						{
							this.state.data.year && this.state.data.year > 0 &&
							<p><strong>Uppteckningsår</strong><br/>{this.state.data.year > 0 ? this.state.data.year :''}</p>
						}

						{
							this.state.data.printed_source &&
							<p><strong>Tryckt i</strong><br/>{this.state.data.printed_source}</p>
						}
					</div>

				</div>

			</div>;
	}
}
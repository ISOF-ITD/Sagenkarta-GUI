import React from 'react';

import SimpleMap from './SimpleMap';
import RecordList from './RecordList';

export default class PersonView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: {}
		};

		this.url = 'http://www4.sprakochfolkminnen.se/sagner/api/person/';
	}

	componentDidMount() {
		this.fetchData(this.props.params);
	}

	componentWillReceiveProps(props) {
		if (props.params.person_id != this.props.params.person_id) {
			this.fetchData(props.params);
		}
	}

	fetchData(params) {
		if (params.person_id) {
			fetch(this.url+params.person_id)
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
		var recordItems = this.state.data.records && this.state.data.records.length > 0 ? this.state.data.records.map(function(record, index) {
			return <tr key={index}>
				<td data-title=""><a href={'#record/'+record.id}>{record.title ? record.title : '(Utan titel)'}</a></td>
				<td data-title="Kategori:">{record.taxonomy.name}</td>
				<td data-title="Socken, Landskap:">
					{
						record.places &&
						<a href={'#place/'+record.places[0].id}>{record.places[0].name+', '+record.places[0].landskap}</a>
					}
				</td>
				<td data-title="Roll:">{record.relation == 'c' ? 'Upptecknare' : record.relation == 'i' ? 'Informant' : ''}</td>
				<td data-title="Uppteckningsår:">{record.year > 0 ? record.year : ''}</td>
				<td data-title="Materialtyp:">{record.type}</td>
			</tr>
		}) : [];

		return (
			<div className="container">
				
				<div className="row">
					<div className="twelve columns">
						<h2>{(this.state.data.firstname ? this.state.data.firstname : '')+' '+(this.state.data.surname ? this.state.data.surname : '')}</h2>
						<p>
						{
							(this.state.data.birth_year && this.state.data.birth_year > 0 ? 'Föddes '+this.state.data.birth_year : '')+
							(this.state.data.birth_year && this.state.data.birth_year > 0 && this.state.data.home ? ' i ' : '')
						}
						{
							this.state.data.home &&
							<a href={'#place/'+this.state.data.home[0].id}>{this.state.data.home[0].name+', '+this.state.data.home[0].landskap}</a>
						}
						</p>
					</div>
				</div>

				{
					this.state.data.home && this.state.data.home.length > 0 && this.state.data.home[0].lat && this.state.data.home[0].lng &&
					<div className="row">
						<div className="twelve columns">
							<SimpleMap marker={{lat: this.state.data.home[0].lat, lng: this.state.data.home[0].lng, label: this.state.data.home[0].name}} />
						</div>
					</div>
				}

				<div className="row">

					<div className={(this.state.data.image ? 'eight' : 'twelve')+' columns'}>
						{
							this.state.data.biography &&
							<p dangerouslySetInnerHTML={{__html: this.state.data.biography}} />
						}
					</div>
					{
						this.state.data.image &&
						<div className="four columns">
							<img className="archive-image" src={'http://www4.sprakochfolkminnen.se/Folkminnen/Svenska_sagor_filer/'+this.state.data.image} alt="" />
						</div>
					}

				</div>

				<div className="row">
			
					<div className="twelve columns">
						<h4>Uppteckningar</h4>

						<div className="table-wrapper person-records-container">
							<table className="table-responsive" width="100%">
								<thead>
									<tr>
										<th scope="col">Titel</th>
										<th scope="col">Kategori</th>
										<th scope="col">Socken, Landskap</th>
										<th scope="col">Roll</th>
										<th scope="col">Uppteckningsår</th>
										<th scope="col">Materialtyp</th>
									</tr>
								</thead>
								<tbody>
									{recordItems}
								</tbody>
							</table>
						</div>

					</div>
				</div>

			</div>
		);
	}
}
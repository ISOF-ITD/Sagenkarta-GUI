import React from 'react';
import RecordsCollection from './../collections/RecordsCollection';

export default class RecordList extends React.Component {
	constructor(props) {
		super(props);

		this.currentPage = 1;

		this.state = {
			records: []
		};

		this.nextPage = this.nextPage.bind(this);
		this.prevPage = this.prevPage.bind(this);

		this.collections = new RecordsCollection(function(json) {
			this.setState({
				records: json.data
			});
		}.bind(this));
	}

	componentDidMount() {
		console.log(this.props)
		this.fetchData(this.props);
	}

	componentWillReceiveProps(props) {
		var currentParams = JSON.parse(JSON.stringify(this.props));
		if (currentParams.place_id) {
			delete currentParams.place_id;
		}

		var params = JSON.parse(JSON.stringify(props));
		if (params.place_id) {
			delete params.place_id;
		}
		
		if (JSON.stringify(currentParams) !== JSON.stringify(params)) {
			if (currentParams.type != params.type ||currentParams.category != params.category) {
				this.currentPage = 1;
			}
			this.fetchData(params);
		}
	}

	nextPage() {
		console.log('next page');
		this.currentPage += 1;
		this.fetchData(this.props);
	}
	
	prevPage() {
		console.log('prev page');
		this.currentPage -= 1;
		this.fetchData(this.props);
	}
	
	fetchData(params) {
		this.collections.fetch({
			page: this.currentPage,
			type: params.type || null,
			category: params.category || null,
			person: params.person || null
		});
	}

	render() {
		var items = this.state.records ? this.state.records.map(function(item, index) {
			return <tr key={item.id}>
				<td className="text-larger"><a href={'#record/'+item.id}>{item.title ? item.title : '(Untitled'}</a></td>
				<td data-title="Kategori:">{item.taxonomy.name}</td>
				<td data-title="Socken, Landskap:">
				{
					item.places &&
					<span>{item.places[0].name+', '+item.places[0].landskap}</span>
				}
				</td>
				<td data-title="Uppteckningsår:">{item.year > 0 ? item.year : ''}</td>
				<td data-title="Materialtyp:">{item.type}</td>
			</tr>;

		}.bind(this)) : [];

		return (
			<div className="search-results-wrapper">
				<a className="search-results-button visible"><strong>Visa sökträffar som lista</strong></a>

				<div className="container-wrapper">
					<div className="container">

						<div className="row">
							<h2>Sökträffar som lista</h2>
							<div className="records-list-wrapper">
								<div className="table-wrapper list-container">

									<table width="100%" className="table-responsive">
										<thead>
											<tr>
												<th scope="col">Titel</th>
												<th scope="col">Kategori</th>
												<th scope="col">Socken, Landskap</th>
												<th scope="col">Uppteckningsår</th>
												<th scope="col">Materialtyp</th>
											</tr>
										</thead>
										<tbody>
											{items}
										</tbody>
									</table>

								</div>

								<div className="pagination">
									<p className="page-info"></p>
									<a className="button prev-button" onClick={this.prevPage}>Föregående</a> <a className="button next-button" onClick={this.nextPage}>Nästa</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
import React from 'react';

import CategoryMenu from './CategoryMenu';

export default class SearchMenu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedCategory: null
		};
	}

	componentDidMount() {
		this.setState({
			selectedCategory: this.props.selectedCategory
		});
	}

	componentWillReceiveProps(props) {
		this.setState({
			selectedCategory: props.selectedCategory
		});
	}

	render() {
		return (
			<div className="menu-wrapper">

				<div className="menu-bar">
					<a className="menu-item advanced-toggle" style={{display: 'none'}}>Avancerad sökning</a>

					<CategoryMenu selectedCategory={this.state.selectedCategory} />
				</div>

				<div className="menu-content advanced-view-content" style={{display: 'none'}}>
					<div className="menu-content-inner">
						
						<div className="form-item">
							<div className="form-heading">Fritext:</div>

							<div className="form-content">
								<input type="text" id="searchInput" className="search-input map-search-control"/>
			
								<div id="searchFieldRadio" className="check-list">
									<label><input name="searchFieldRadio" type="radio" value="record" />Innehåll</label>
									<label><input name="searchFieldRadio" type="radio" value="person" />Person</label>
									<label><input name="searchFieldRadio" type="radio" value="place" />Ort</label>
								</div>

								<div className="u-cf"></div>
							</div>

							<div className="u-cf"></div>

						</div>

						<div className="form-item">
							<div className="form-heading">Kategorier:</div>

							<div id="categoriesCheckAdvanced" className="form-content check-list">
								<div className="checked-label">Alla kategorier</div>

								<div className="dropdown-wrapper check-dropdown-wrapper">
									<a className="dropdown-link">Avgränsa till kategorier</a>

									<div className="dropdown-container check-dropdown-list">
										<label><input name="categoriesCheckAdvanced" value="a" type="checkbox" />Döden och de döda</label>
										<label><input name="categoriesCheckAdvanced" value="b" type="checkbox" />Odens jakt</label>
										<label><input name="categoriesCheckAdvanced" value="c" type="checkbox" />Skogsväsen</label>
										<label><input name="categoriesCheckAdvanced" value="d" type="checkbox" />Vattenväsen</label>
										<label><input name="categoriesCheckAdvanced" value="e" type="checkbox" />Bergväsen</label>

										<label><input name="categoriesCheckAdvanced" value="f" type="checkbox" />Tomtar</label>
										<label><input name="categoriesCheckAdvanced" value="g" type="checkbox" />Jättar</label>
										<label><input name="categoriesCheckAdvanced" value="h" type="checkbox" />Troll</label>
										<label><input name="categoriesCheckAdvanced" value="i" type="checkbox" />Älvor, vittror och vättar</label>
										<label><input name="categoriesCheckAdvanced" value="j" type="checkbox" />Djävulen</label>
										<label><input name="categoriesCheckAdvanced" value="k" type="checkbox" />Kloka</label>
										<label><input name="categoriesCheckAdvanced" value="l" type="checkbox" />Häxor och  trollkarlar</label>
										<label><input name="categoriesCheckAdvanced" value="m" type="checkbox" />Tjuvmjölkande väsen</label>
										<label><input name="categoriesCheckAdvanced" value="n" type="checkbox" />Spiritus, dragdocka och bodrag</label>
										<label><input name="categoriesCheckAdvanced" value="o" type="checkbox" />Förvandlade</label>
										<label><input name="categoriesCheckAdvanced" value="p" type="checkbox" />Djur och natur</label>
										<label><input name="categoriesCheckAdvanced" value="q" type="checkbox" />Farsoter</label>
										<label><input name="categoriesCheckAdvanced" value="r" type="checkbox" />Kyrkor och kyrkklockor</label>
										<label><input name="categoriesCheckAdvanced" value="s" type="checkbox" />Skatter</label>
										<label><input name="categoriesCheckAdvanced" value="t" type="checkbox" />Krig och fejder</label>
										<label><input name="categoriesCheckAdvanced" value="u" type="checkbox" />Brott och straff</label>
										<label><input name="categoriesCheckAdvanced" value="v" type="checkbox" />Kungar och herremän</label>
										<label><input name="categoriesCheckAdvanced" value="w" type="checkbox" />De ovanliga</label>
									</div>
								</div>

								<div className="u-cf"></div>
							</div>

							<div className="u-cf"></div>
						</div>

						<div className="form-item">
							<div className="form-heading">Materialtyp:</div>

							<div id="typeCheck" className="form-content check-list">
								<label><input name="typeCheck" type="checkbox" value="arkiv" />Arkiv</label>
								<label><input name="typeCheck" type="checkbox" value="tryckt" />Tryckt</label>
								<label><input name="typeCheck" type="checkbox" value="register" />Register</label>

								<div className="u-cf"></div>
							</div>

							<div className="disabled-overlay"></div>

							<div className="u-cf"></div>
						</div>

						<div className="form-item type-restricted">
							<div className="form-heading">Roll:</div>

							<div id="personRoleRadio" className="form-content check-list">
								<label><input name="personRoleRadio" type="radio" value="c" />Upptecknare</label>
								<label><input name="personRoleRadio" type="radio" value="i" />Meddelare</label>
								<label><input name="personRoleRadio" type="radio" value="both" />Båda</label>

								<div className="u-cf"></div>
							</div>

							<div className="disabled-overlay"></div>

							<div className="u-cf"></div>
						</div>

						<div className="form-item type-restricted">
							<div className="form-heading">Kön:</div>

							<div id="genderRadio" className="form-content check-list">
								<label><input name="genderRadio" type="radio" value="k" />Kvinna</label>
								<label><input name="genderRadio" type="radio" value="m" />Man</label>
								<label><input name="genderRadio" type="radio" value="both" />Båda</label>

								<div className="u-cf"></div>
							</div>

							<div className="disabled-overlay"></div>

							<div className="u-cf"></div>
						</div>

						<div className="form-item type-restricted">
							<div className="form-heading">Uppteckningsår:</div>

							<div className="form-content">
								<div id="yearSlider" className="slider-container"></div>

								<div className="u-cf"></div>
							</div>

							<div className="disabled-overlay"></div>

							<div className="u-cf"></div>
						</div>

						<div className="form-item">
							<a href="" className="button button-primary u-pull-right update-map-control">Sök</a>

							<div className="u-cf"></div>
						</div>

					</div>

				</div>

			</div>
		);
	}
}
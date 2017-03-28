import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';
import { hashHistory } from 'react-router';

import CategoryList from './CategoryList';

export default class CategoryMenu extends React.Component {
	constructor(props) {
		super(props);

		this.menuButtonClick = this.menuButtonClick.bind(this);
		this.toggleMinimize = this.toggleMinimize.bind(this);
		this.categoryItemClickHandler = this.categoryItemClickHandler.bind(this);

		this.state = {
			menuOpen: false,
			selectedCategory: null,
			minimized: false
		};
	}

	categoryItemClickHandler(event) {
		hashHistory.push('/places/type/arkiv;tryckt/category/'+event.selectedCategory);
	}

	menuButtonClick() {
		this.setState({
			menuOpen: !this.state.menuOpen
		});
	}

	toggleMinimize() {
		this.setState({
			minimized: !this.state.minimized
		});
	}

	componentDidMount() {
		this.setState({
			selectedCategory: this.props.selectedCategory
		});
	}

	componentWillReceiveProps(props) {
		if (this.props.selectedCategory !== props.selectedCategory) {
			this.setState({
				selectedCategory: props.selectedCategory
			});
		}
	}

	render() {
		var dropdownLink;

		return (
			<div ref="container" className={'heading-list-wrapper'+(this.state.minimized ? ' minimized' : '')}>
				<div className="list-heading panel-heading">
					<span className="heading-label">Kategorier<span className="selected-category">
						{
							this.refs.categoryList && this.refs.categoryList.state.selectedCategory ? ': '+this.refs.categoryList.state.selectedCategoryName : ''
						}
					</span></span>

					<button onClick={this.toggleMinimize} className="minimize-button"><span>Minimera</span></button>
				</div>

				<div className={'list-container minimal-scrollbar'}>
					<CategoryList onItemClick={this.categoryItemClickHandler} ref="categoryList" selectedCategory={this.state.selectedCategory} />
				</div>
			</div>
		);
	}
}
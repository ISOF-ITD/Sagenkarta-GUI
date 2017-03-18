import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';

const categories = [
	{
		letter: 'a',
		label: 'Döden och de döda'
	},
	{
		letter: 'b',
		label: 'Odens jakt'
	},
	{
		letter: 'c',
		label: 'Skogsväsen'
	},
	{
		letter: 'd',
		label: 'Vattenväsen'
	},
	{
		letter: 'e',
		label: 'Bergväsen'
	},
	{
		letter: 'f',
		label: 'Tomtar'
	},
	{
		letter: 'g',
		label: 'Jättar'
	},
	{
		letter: 'h',
		label: 'Troll'
	},
	{
		letter: 'i',
		label: 'Älvor, vittror och vättar'
	},
	{
		letter: 'j',
		label: 'Djävulen'
	},
	{
		letter: 'k',
		label: 'Kloka'
	},
	{
		letter: 'l',
		label: 'Häxor och  trollkarlar'
	},
	{
		letter: 'm',
		label: 'Tjuvmjölkande väsen'
	},
	{
		letter: 'n',
		label: 'Spiritus, dragdocka och bodrag'
	},
	{
		letter: 'o',
		label: 'Förvandlade'
	},
	{
		letter: 'p',
		label: 'Djur och natur'
	},
	{
		letter: 'q',
		label: 'Farsoter'
	},
	{
		letter: 'r',
		label: 'Kyrkor och kyrkklockor'
	},
	{
		letter: 's',
		label: 'Skatter'
	},
	{
		letter: 't',
		label: 'Krig och fejder'
	},
	{
		letter: 'u',
		label: 'Brott och straff'
	},
	{
		letter: 'v',
		label: 'Kungar och herremän'
	},
	{
		letter: 'w',
		label: 'De ovanliga'
	}
];

export default class CategoryMenu extends React.Component {
	constructor(props) {
		super(props);

		this.itemClickHandler = this.itemClickHandler.bind(this);

		this.state = {
			selectedCategory: null,
			selectedCategoryName: null
		};
	}

	componentDidMount() {
		this.setState({
			selectedCategory: this.props.selectedCategory,
			selectedCategoryName: this.getCategoryName(this.props.selectedCategory)
		});
	}

	componentWillReceiveProps(props) {
		if (this.props.selectedCategory !== props.selectedCategory) {
			this.setState({
				selectedCategory: props.selectedCategory,
				selectedCategoryName: this.getCategoryName(props.selectedCategory)
			});
		}
	}

	itemClickHandler(event) {
		var selectedCategory = {
			selectedCategory: categories[event.target.dataset.index].letter,
			selectedCategoryName: categories[event.target.dataset.index].label
		};

		this.setState(selectedCategory);

		if (this.props.onItemClick) {
			this.props.onItemClick(selectedCategory);
		}
	}

	getCategoryName(categoryLetter) {
		if (categoryLetter) {
			return _.find(categories, function(item) {
				return item.letter == categoryLetter;
			}.bind(this)).label;
		}
		else {
			return null;
		}
	}

	render() {
		var items = categories.map(function(item, index) {
			if (this.props.multipleSelect) {
				return <label key={index} data-index={index} className="item"><input onChange={this.selectionChangeHandler} type="checkbox"/>{item.label}</label>;
			}
			else {
				return <a key={index} data-index={index} className={'item'+(item.letter == this.state.selectedCategory ? ' selected' : '')} onClick={this.itemClickHandler}>{item.label}</a>;
			}
		}.bind(this));

		return (
			<div>
				{items}
			</div>
		);
	}
}
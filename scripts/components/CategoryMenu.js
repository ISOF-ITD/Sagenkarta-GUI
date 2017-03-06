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

		this.menuButtonClick = this.menuButtonClick.bind(this);
		this.closeMenu = this.closeMenu.bind(this);

		this.state = {
			menuOpen: false,
			selectedCategory: null
		};
	}

	menuButtonClick() {
		this.setState({
			menuOpen: !this.state.menuOpen
		});
	}

	closeMenu() {
		this.setState({
			menuOpen: false
		});
	}

	windowClickHandler(event) {
		var componentEl = ReactDOM.findDOMNode(this.refs.container);

		if (!componentEl.contains(event.target)) {
			this.closeMenu();
		}
	}

	componentDidMount() {
		window.addEventListener('click', this.windowClickHandler.bind(this));

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
		var items = categories.map(function(item, index) {
			return <a key={index} className={'item'+(item.letter == this.state.selectedCategory ? ' selected' : '')} onClick={this.closeMenu} href={'#places/type/arkiv;tryckt/category/'+item.letter}>{item.label}</a>;
		}.bind(this));

		var categoryName = '';
		if (this.state.selectedCategory) {
			categoryName = ': '+_.find(categories, function(item) {
				return item.letter == this.state.selectedCategory;
			}.bind(this)).label;
		}

		return (
			<div ref="container" className={'menu-item dropdown-wrapper categories-dropdown'+(this.props.keepOpen ? ' keep-open' : '')}>
				<a className="dropdown-link" onClick={this.menuButtonClick}>Kategorier<span className="selected-category">{categoryName}</span></a>

				<div className={'dropdown-container dropdown-list'+(this.state.menuOpen || this.props.keepOpen ? ' open' : '')}>
					{items}
				</div>
			</div>
		);
	}
}
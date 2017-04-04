import _ from 'underscore';

export default {
	getCategoryName(categoryLetter) {
		if (categoryLetter) {
			return _.find(this.categories, function(item) {
				return item.letter == categoryLetter;
			}.bind(this)).label;
		}
		else {
			return null;
		}
	},

	categories: [
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
	]
}

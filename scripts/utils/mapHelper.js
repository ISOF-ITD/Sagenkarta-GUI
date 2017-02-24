import turfInside from 'turf-inside';

import L from 'leaflet';
import Proj from 'proj4leaflet';

const swedenBorder = {
	"features": [
		{
			"geometry": {
				"coordinates": [
					[
						[
							[
								22.183173,
								65.723741000000004
							],
							[
								21.213517,
								65.026004999999998
							],
							[
								21.369630999999998,
								64.413588000000004
							],
							[
								19.778876,
								63.609554000000003
							],
							[
								17.847778999999999,
								62.749400000000001
							],
							[
								17.119554999999998,
								61.341166000000001
							],
							[
								17.831346,
								60.636583000000002
							],
							[
								18.787721999999999,
								60.081913999999998
							],
							[
								17.869225,
								58.953766000000002
							],
							[
								16.829184999999999,
								58.719827000000002
							],
							[
								16.447710000000001,
								57.041117999999997
							],
							[
								15.879785999999999,
								56.104301999999997
							],
							[
								14.666681000000001,
								56.200885
							],
							[
								14.100721,
								55.407781
							],
							[
								12.942911,
								55.361736999999998
							],
							[
								12.625101000000001,
								56.307079999999999
							],
							[
								11.787941999999999,
								57.441817
							],
							[
								11.027369,
								58.856149000000002
							],
							[
								11.468272000000001,
								59.432392999999998
							],
							[
								12.300366,
								60.117933000000001
							],
							[
								12.631147,
								61.293571999999998
							],
							[
								11.992063999999999,
								61.800362
							],
							[
								11.930569,
								63.128318
							],
							[
								12.579935000000001,
								64.066219000000004
							],
							[
								13.571916,
								64.049114000000003
							],
							[
								13.919905,
								64.445420999999996
							],
							[
								13.55569,
								64.787028000000007
							],
							[
								15.108411,
								66.193866999999997
							],
							[
								16.108712000000001,
								67.302456000000006
							],
							[
								16.768878999999998,
								68.013936999999999
							],
							[
								17.729182000000002,
								68.010552000000004
							],
							[
								17.993867999999999,
								68.567391000000001
							],
							[
								19.87856,
								68.407194000000004
							],
							[
								20.025269000000002,
								69.065139000000002
							],
							[
								20.645593000000002,
								69.106246999999996
							],
							[
								21.978535000000001,
								68.616845999999995
							],
							[
								23.539473000000001,
								67.936008999999999
							],
							[
								23.56588,
								66.396051
							],
							[
								23.903379000000001,
								66.006927000000005
							],
							[
								22.183173,
								65.723741000000004
							]
						]
					],
					[
						[
							[
								17.061767,
								57.385783000000004
							],
							[
								17.210083000000001,
								57.326521
							],
							[
								16.430053000000001,
								56.179195999999997
							],
							[
								16.364135000000001,
								56.556455
							],
							[
								17.061767,
								57.385783000000004
							]
						]
					],
					[
						[
							[
								19.35791,
								57.958587999999999
							],
							[
								18.803100000000001,
								57.651279000000002
							],
							[
								18.825073,
								57.444949000000001
							],
							[
								18.995360999999999,
								57.441992999999997
							],
							[
								18.951415999999998,
								57.370975999999999
							],
							[
								18.693237,
								57.305756000000002
							],
							[
								18.709716,
								57.204734000000002
							],
							[
								18.462523999999998,
								57.127294999999997
							],
							[
								18.319701999999999,
								56.926991999999998
							],
							[
								18.105467999999998,
								56.891002999999998
							],
							[
								18.187866,
								57.109402000000003
							],
							[
								18.072509,
								57.267162999999996
							],
							[
								18.154907000000001,
								57.394663999999999
							],
							[
								18.094481999999999,
								57.545312000000003
							],
							[
								18.660278000000002,
								57.929434000000001
							],
							[
								19.039306,
								57.941097999999997
							],
							[
								19.105224,
								57.993543000000003
							],
							[
								19.374389000000001,
								57.996454
							],
							[
								19.35791,
								57.958587999999999
							]
						]
					],
					[
						[
							[
								20.846557000000001,
								63.823709999999998
							],
							[
								21.066284,
								63.829768000000001
							],
							[
								20.972899999999999,
								63.715670000000003
							],
							[
								20.824584000000002,
								63.579121000000001
							],
							[
								20.695495000000001,
								63.591340000000002
							],
							[
								20.819091,
								63.714454000000003
							],
							[
								20.799865,
								63.780059000000001
							],
							[
								20.846557000000001,
								63.823709999999998
							]
						]
					]
				],
				"type": "MultiPolygon"
			},
			"id": "SWE",
			"properties": {
				"name": "Sweden"
			},
			"type": "Feature"
		}
	],
	"type": "FeatureCollection"
};

export default {
	markerIcon: L.icon({
		iconUrl: 'img/map-marker.png',
		shadowUrl: 'img/map-marker-shadow.png',

		iconSize:     [15, 23], // size of the icon
		shadowSize:   [14, 10], // size of the shadow
		iconAnchor:   [8, 22], // point of the icon which will correspond to marker's location
		shadowAnchor: [8, 22],  // the same for the shadow
		popupAnchor:  [-1, -15] // point from which the popup should open relative to the iconAnchor
	}),

	orangeIcon: L.icon({
		iconUrl: 'img/marker-orange.png',
		iconSize: [27, 27],
		iconAnchor: [15, 15],
		popupAnchor: [0, 0]
	}),

	tileLayers: [
/*
		{
			label: 'Lantmäteriet',
			url: 'http://ifsf0001:k7r9ZjQh4SN77N6p@maps.lantmateriet.se/topowebb/v1/wmts/1.0.0/topowebb/default/3006/{z}/{y}/{x}.png',
			maxZoom: 20,
			attribution: '&copy; <a href="http://www.lantmateriet.se/en/">Lantmäteriet</a> Topografisk Webbkarta Visning'
		},
*/
		{
			label: 'Open Map Surfer',
			url: 'http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}',
			maxZoom: 20,
			attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		},
		{
			label: 'Open Screet Map Mapnik',
			url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		},
		{
			label: 'Open Screet Map DE',
			url: 'http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
			maxZoom: 18,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		},
		{
			label: 'ESRI World Imagery',
			url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
			maxZoom: 18,
			attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
		},
		{
			label: 'ESRI Gray',
			url: 'http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
			attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
			maxZoom: 16
		},
		{
			label: 'Sverige Socken',
			url: 'http://localhost:8084/geoserver/sverige_socken_sweref/wms?',
			attribution: '&copy; <a href="http://www.lantmateriet.se/en/">Lantmäteriet</a>',
			maxZoom: 16,
			isWms: true,
			layerName: 'sverige_socken_sweref:se_socken_clipped'
		}
	],

	createLayers() {
		var ret = {};

		for (var i = 0; i<this.tileLayers.length; i++) {
			var newLayer;

			if (this.tileLayers[i].isWms) {
				newLayer = L.tileLayer.wms(this.tileLayers[i].url, {
					layers: this.tileLayers[i].layerName,
					maxZoom: this.tileLayers[i].maxZoom,
					attribution: this.tileLayers[i].attribution
				});
			}
			else {
				newLayer = L.tileLayer(this.tileLayers[i].url, {
					maxZoom: this.tileLayers[i].maxZoom,
					attribution: this.tileLayers[i].attribution
				});
			}
			ret[this.tileLayers[i].label] = newLayer;
		}

		return ret;
	},

	inSweden(lat, lng) {
		return (turfInside({
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [lng, lat]
			}
		}, swedenBorder.features[0]));
	},

	getSweref99crs() {
		var crs = new L.Proj.CRS('EPSG:3006',
			'+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
			{
				resolutions: [
					4096, 2048, 1024, 512, 256, 128,64, 32, 16, 8, 4, 2, 1, 0.5
				],
				origin: [-1200000.000000, 8500000.000000 ],
				bounds:  L.bounds( [-1200000.000000, 8500000.000000], [4305696.000000, 2994304.000000])
			}
		);
		return crs;
	}
};
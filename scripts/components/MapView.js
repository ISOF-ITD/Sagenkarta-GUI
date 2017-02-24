import React from 'react';

import L from 'leaflet';
import 'leaflet.markercluster';
import './../lib/leaflet-heat';
import 'leaflet.vectorgrid';
import _ from 'underscore';

import MapCollection from './../collections/MapCollection';
import mapHelper from './../utils/mapHelper';

export default class MapView extends React.Component {

	constructor(props) {
		super(props);

		window.mapView = this;

		window.L = L;

		this.mapData = [];

		this.collections = new MapCollection(function(json) {
			this.mapData = json.data || [];
			this.updateMap();
		}.bind(this));
	}

	componentDidMount() {
		var layers = mapHelper.createLayers();

		this.map = L.map(this.refs.mapView, {
			center: [61.5122, 16.7211], 
			zoom: 5,
			minZoom: 3,
			layers: [layers[Object.keys(layers)[0]]],
			scrollWheelZoom: true,
//			crs: mapHelper.getSweref99crs()
		});

		L.control.layers(layers).addTo(this.map);

		this.setViewmode('clusters');

		this.fetchData(this.props.searchParams);
	}

	componentWillReceiveProps(props) {
		var currentSearchParams = JSON.parse(JSON.stringify(this.props.searchParams));
		if (currentSearchParams.place_id) {
			delete currentSearchParams.place_id;
		}

		var searchParams = JSON.parse(JSON.stringify(props.searchParams));
		if (searchParams.place_id) {
			delete searchParams.place_id;
		}

		if (JSON.stringify(currentSearchParams) !== JSON.stringify(searchParams)) {
			this.fetchData(searchParams);
		}
	}

	fetchData(params) {
		if (params) {
			this.collections.fetch({
				type: params.type || 'arkiv;tryckt',
				category: params.category
			});
		}
	}

	setViewmode(viewMode) {
		if (viewMode != this.viewMode) {
			this.viewMode = viewMode;

			if (this.markers) {
				if (this.markers.clearLayers) {
					this.markers.clearLayers();
				}

				this.map.removeLayer(this.markers);
			}

			switch (this.viewMode) {
				case 'markers':
					this.markers = L.featureGroup();
					this.map.addLayer(this.markers);
					break;
				case 'clusters':
					this.markers = new L.MarkerClusterGroup({
						showCoverageOnHover: false,
						maxClusterRadius: 40,
						iconCreateFunction: function (cluster) {
							var childCount = cluster.getChildCount();
							var c = ' marker-cluster-';
							if (childCount < 10) {
								c += 'small';
							} else if (childCount < 20) {
								c += 'medium';
							} else {
								c += 'large';
							}
							return new L.DivIcon({
								html: '<div><span>'+
									'<b>'+childCount+'</b>'+
									'</span></div>',
								className: 'marker-cluster'+c,
								iconSize: new L.Point(24, 24)
							});
						}
					});
					this.map.addLayer(this.markers);
					break;
				case 'heatmap':
					this.markers = L.heatLayer([], {
						minOpacity: 0.35,
						radius: 18,
						blur: 15
					});
					this.markers.addTo(this.map);
			}

			if (this.mapData.length > 0) {
				this.updateMap();
			}
		}
	}

	updateMap() {
		if (this.viewMode == 'markers' || this.viewMode == 'clusters') {			
			this.markers.clearLayers();

			if (this.mapData.length > 0) {
				var bounds = [];
				
				_.each(this.mapData, function(mapItem) {
					if (mapItem.lat && mapItem.lng) {
						var marker = L.marker([Number(mapItem.lat), Number(mapItem.lng)], {
							title: mapItem.name,
							icon: mapHelper.orangeIcon
						});
/*
						var template = _.template($("#markerPopupTemplate").html());
						var popupHtml = template({
							model: model
						});

						marker.bindPopup(popupHtml).on('popupopen', _.bind(function(event) {
							_.each(this.$el.find('.place-view-link'), _.bind(function(linkEl) {
								$(linkEl).click(_.bind(function(event) {
									event.preventDefault();
									this.trigger('viewPlace', {
										placeId: mapItem.id')
									});
								}, this));
							}, this));
						}, this));
*/
						marker.on('click', function(event) {
							if (this.props.onMarkerClick) {
								this.props.onMarkerClick(mapItem.id);
							}
						}.bind(this));

						this.markers.addLayer(marker);

						if (mapHelper.inSweden(mapItem.lat, mapItem.lng)) {
							bounds.push([mapItem.lat, mapItem.lng])
						}
					}
				}.bind(this));

				this.map.fitBounds(bounds, {
					maxZoom: 10
				});
			}
		}
		if (this.viewMode == 'heatmap') {
			var latLngs = _.map(this.mapData, function(mapItem) {
				return [mapItem.lat, mapItem.lng, mapItem.c];
			}.bind(this));
			this.markers.setLatLngs(latLngs);
		}
	}

	render() {
		return (
			<div className="map-wrapper">
				<div className="map-view" ref="mapView"></div>
			</div>
		);
	}
}
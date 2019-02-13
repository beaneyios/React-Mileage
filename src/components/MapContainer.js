import React, { Component } from 'react'
import {Map, GoogleApiWrapper, Polyline} from 'google-maps-react'
import Route from '../Models/Route.js'
import uuid from 'uuid/v4'
import '../styles/Container.css';

export class MapContainer extends Component {

  constructor(props) {
      super(props);

      this.state = {
        mapsLoaded: false,
        routes: [],
        selectedIndex: 0
      }
    }

    componentDidUpdate(prevProps) {

      var newStartLocation = this.props.calculation.startPostcode;
      var newEndLocation = this.props.calculation.endPostcode;

      var oldStartLocation = prevProps.calculation.startPostcode;
      var oldEndLocation = prevProps.calculation.endPostcode;

      if(newStartLocation === oldStartLocation && newEndLocation === oldEndLocation) {
        return;
      }

      this.getDirections(newStartLocation, newEndLocation, this.props.google.maps);
    }

    getDirections(startLoc, destinationLoc, maps) {

      var request = {
        origin: startLoc,
        destination: destinationLoc,
        provideRouteAlternatives: true,
        travelMode: "DRIVING"
      };

      var directionsService = new maps.DirectionsService();

      var self = this;

      directionsService.route(request, (response, status) => {

        var routes = this.routes(response);
        this.props.routeClicked(this.props.calculation, routes[0].distance);

        self.setState({
          ...this.state,
          mapsLoaded: true,
          routes: routes
        });
      });
    }

    routes(response) {
      return response.routes.map((route, index) => {
        var path = this.path(route);
        var distance = this.distance(route);
        var title = route.summary;
        return new Route(path, distance, title);
      })
    }

    distance(route) {
      return route.legs.length > 0 ? route.legs[0].distance.value : 0;
    }

    path(route) {
      return route.overview_path.map((coords) => {
        return {
          lat: coords.lat(),
          lng: coords.lng()
        }
      });
    }

    polylines(possibleRoutes, selectedIndex) {
      return possibleRoutes.map((possibleRoute, index) => {
        return this.polyline(possibleRoute, index, selectedIndex)
      })
    }

    polyline(route, index, selectedIndex) {

      return (
        <Polyline
        distance={route.distance}
        polylineIndex={index}
        onClick={this.polylineClicked.bind(this)}
        key={uuid()}
        path={route.path}
        strokeColor={index === selectedIndex ? "#0000FF" : "#000000"}
        strokeOpacity={index === selectedIndex ? 0.8 : 0.3}
        strokeWeight={10} />
      );
    }

    polylineClicked(props, polyline, e) {
      var {calculation} = this.props;
      this.props.routeClicked(calculation, props.distance);

      this.setState({
        ...this.state,
        selectedIndex: props.polylineIndex
      })
    }

    findCenter(route) {

      var google = this.props.google;

      if(route == undefined && route == null) {
        return null;
      }

      var startLocation = route.path[0];
      var endLocation = route.path[route.path.length - 1];

      var startLatLng = new google.maps.LatLng(startLocation.lat, startLocation.lng);
      var endLatLng = new google.maps.LatLng(endLocation.lat, endLocation.lng);
      var midpoint = google.maps.geometry.spherical.interpolate(startLatLng, endLatLng, 0.5);

      var result = {
        lat: midpoint.lat(),
        lng: midpoint.lng()
      };

      return result;
    }

    render() {
      var possibleRoutes = this.state.routes;
      var selectedIndex = this.state.selectedIndex;

      if(possibleRoutes.length > 0) {
        this.findCenter(possibleRoutes[0]);
      }

      var center = this.findCenter(possibleRoutes[0]);

      var inputProps = {
        center: center
      };

      if(center == null) {
        inputProps = {}
      }

      return (
        <Map containerStyle={{position:"static"}} style={{}} google={this.props.google} zoom={14} {...inputProps} initialCenter={{lat:51.1465, lng:0.8750}}>
            {this.polylines(possibleRoutes, selectedIndex)}
        </Map>

      );
    }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyD9lHQz1qs4SdyMWxDkmWVbOr41KrdLCik')
})(MapContainer)

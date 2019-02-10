import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper, Polyline} from 'google-maps-react'
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

    componentDidMount() {

      this.getDirections(this.props.startLocation, this.props.endLocation, this.props.google.maps);
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

        console.log(response);

        self.setState({
          ...this.state,
          mapsLoaded: true,
          routes: this.routes(response)
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
      return route.legs.count > 0 ? route.legs[0].distance.value : 0;
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
        polylineIndex={index}
        onClick={this.polylineClicked.bind(this)}
        key={uuid()}
        path={route.path}
        strokeColor={index == selectedIndex ? "#0000FF" : "#000000"}
        strokeOpacity={index == selectedIndex ? 0.8 : 0.3}
        strokeWeight={10} />
      );
    }

    polylineClicked(props, polyline, e) {
      console.log(props);
      console.log(polyline);

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
      var {mapsLoaded} = this.state;

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
        <Map containerStyle={{position:"static"}} style={{}} google={this.props.google} zoom={14} {...inputProps} >
            {this.polylines(possibleRoutes, selectedIndex)}
        </Map>

      );
    }
}

const LoadingContainer = (props) => (
  <div className="Dinky">Fancy loading container!</div>
)

export default GoogleApiWrapper({
  apiKey: ('AIzaSyD9lHQz1qs4SdyMWxDkmWVbOr41KrdLCik'),
  ContainerStyles: {className: "willywilly"}
})(MapContainer)

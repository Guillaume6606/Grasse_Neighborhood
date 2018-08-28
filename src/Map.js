/* global google */

import React, {Component} from 'react';

class Map extends Component {

// Asynchronous mechanism inspired from https://stackoverflow.com/questions/48493960/using-google-map-in-react-component/51437173#51437173
  fetchGoogleAPI() {
    // Creates a promise to englobe the request if it does not exist yet
    if (!this.googleMapsPromise) {
      this.googleMapsPromise = new Promise(resolve => {
        // Add a global handler for when the API finishes loading
        window.resolveGoogleMapsPromise = () => {
          resolve(google);
          // Tidy up
          delete window.resolveGoogleMapsPromise;
        };

        // Load the Google Maps API
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?libraries=places,geometry,drawing&key=AIzaSyAiq4AVRW5PmATS3klmEw5wL9GSLkfWKwk&callback=resolveGoogleMapsPromise';
        script.async = true;
        document.body.appendChild(script);
      });
    }

    // Return a promise for the Google Maps API
    return this.googleMapsPromise;
  }

  componentWillMount() {
    this.fetchGoogleAPI();
  }

  componentDidMount() {
    //Styles from https://snazzymaps.com/style/15/subtle-grayscale
    let styles = [
      {
          "featureType": "administrative",
          "elementType": "all",
          "stylers": [
              {
                  "saturation": "-100"
              }
          ]
      },
      {
          "featureType": "administrative.province",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
              {
                  "saturation": -100
              },
              {
                  "lightness": 65
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
              {
                  "saturation": -100
              },
              {
                  "lightness": "50"
              },
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
              {
                  "saturation": "-100"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "all",
          "stylers": [
              {
                  "lightness": "30"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "all",
          "stylers": [
              {
                  "lightness": "40"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
              {
                  "saturation": -100
              },
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
              {
                  "hue": "#ffff00"
              },
              {
                  "lightness": -25
              },
              {
                  "saturation": -97
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "labels",
          "stylers": [
              {
                  "lightness": -25
              },
              {
                  "saturation": -100
              }
          ]
      }
  ];
    // Initializing the map once the API has finished loading
    this.fetchGoogleAPI().then(google => {
      const grasse = this.props.locations[0].location;
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: grasse,
        styles: styles
      });
      //Creating a bounds element
      let bounds = new google.maps.LatLngBounds();
      //Adapting the Marker color to the style
      let customMarkerIcon = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|D3D3D3|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
      //Placing all of the markers on the map
      this.props.locations.forEach(location => {
        const marker = new google.maps.Marker({
          position: location.location,
          map: map,
          icon:customMarkerIcon
        });
        bounds.extend(marker.position);
      });
      map.fitBounds(bounds);
    });
  }

  render() {
    return (
        <div id="map" className="map"></div>
    )
  }
}

export default Map;

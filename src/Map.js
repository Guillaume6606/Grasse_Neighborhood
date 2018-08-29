/* global google */

import React, {Component} from 'react';

class Map extends Component {
  constructor(props) {
    super(props);
    this.markers=[];
    this.windows={};
    this.map={};
  }

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
      this.map = new google.maps.Map(document.getElementById('map'), {
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
            title: location.title,
            map: this.map,
            animation: google.maps.Animation.DROP,
            icon:customMarkerIcon
          });
          const infoWindow = new google.maps.InfoWindow({position:marker.getPosition()});
          marker.addListener('click',() => {
            this.toggleWindow(marker,infoWindow);
            this.props.toggleInfo(location)});
          infoWindow.addListener('closeclick',() => {
            this.props.hideInfo();
            marker.setAnimation(null);
            infoWindow.marker = null;
          })
          this.windows[`'${location.title}'`]=infoWindow;
          bounds.extend(marker.position);
          this.markers.push(marker);
        });
        this.map.fitBounds(bounds);
    });
  }

  toggleWindow(marker,infoWindow) {
      if(infoWindow.marker === marker) {
        infoWindow.marker = null;
        marker.setAnimation(null);
        infoWindow.close();
      } else {
      infoWindow.marker = marker;
      marker.setAnimation(google.maps.Animation.BOUNCE);
      infoWindow.setContent(`<h2> ${marker.getTitle()}</h2><button tabindex=0 id='back'>Get back</button><button tabindex=0 id='info'>
          Show/Hide More About Location
      </button>`);
      infoWindow.open(this.map,marker);

      document.getElementById('info').addEventListener('click',()=>{
          document.getElementById("location-information").classList.toggle('slide-in');
        });
      document.getElementById('back').addEventListener('click',()=>{
          this.props.resetLocations();
          this.props.hideInfo();
          infoWindow.marker.setAnimation(null);
          infoWindow.marker = null;
          infoWindow.close();
        });
    }
  }

  updateMarkers() {
      this.markers.map(marker => {
        let showing = false;
        this.props.locations.forEach(location => {
          if (location.location.lat === marker.getPosition().lat()) {
            showing = true;
          }
        });
        if (showing) {
          marker.setVisible(true);
        } else {
          marker.setVisible(false);
        }
        return showing
      });
  }

  clickReaction = (location) => {
    let openMarker;
    let windowToOpen;
    this.markers.map(marker => {
      if(marker.getTitle()===location.title){
        openMarker = marker;
      }
      return true;
    })
    for(let win in this.windows) {
      if(this.windows[win].getPosition() === openMarker.getPosition()) {
        windowToOpen = this.windows[win];
        this.toggleWindow(openMarker,windowToOpen);
      }
    }
  }

  render() {
    this.updateMarkers();
    return (
        <div id="map" className="map"></div>
    )
  }
}

export default Map;

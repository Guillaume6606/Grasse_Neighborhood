import React, { Component } from 'react';
import Map from './Map';
import Sidebar from './Sidebar';
import Header from './Header';
import LocationInformation from './LocationInformation';
import fetchJsonp from 'fetch-jsonp';
import locations from './locations.json'
import escapeRegExp from 'escape-string-regexp';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        // Retreiving hard-coded locations database from json file
        locations: locations,
        //The list of locations that will be modified when searching
        showingLocations:locations,
        focusedLocation:'',
        // Contains the focused location data, i.e the extract from the Wikipedia API
        focusedLocationData:''
      };


  }


  // The Asynchronous function that retrieves data from the Wikipedia API when
  // called. Takes a location, parses its title and incorporates it in an url query
  fetchAPIinfo = location => {
    // Sets appThis to the App value to prevent issues with this when calling the function
    let appThis = this;
    let url =
      "https://fr.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=" +
      location.title;
    url = url.replace(/ /g, "%20");

    // Function from the fetch-jsonp package that fetches the url
    fetchJsonp(url)
      .then(response => (response.json()))
      .then(data => {
        let info = data.query.pages[Object.keys(data.query.pages)[0]].extract;

    // Passing the retrieved data to the state
        appThis.setState({
          focusedLocationData: info
        });
      })
      .catch(() => {
          appThis.setState({
          focusedLocationData: 'Failed to retreive data from the Wikipedia API'
        });
      });
  };

// Function to filter the list and the markers when searching. Changes the array
// of locations that is passed to the children.
  filterLocations= (query) => {
    const match = new RegExp(escapeRegExp(query), 'i');
    let showingLocations = this.state.locations.filter((location) => (match.test(location.title)));
    this.setState({showingLocations:showingLocations});
  }

// Resets the displayed locations to the default ones
  resetLocations = () => {
    this.setState({showingLocations:this.state.locations});
  }

// Displays the info regarding a location and hides the markers of the others
// when clicked
  clickLocation= (position) => {
    let showingLocations = this.state.locations.filter((location) => ((location.location.lat === position.lat)&&(location.location.lng === position.lng)));
    this.setState({showingLocations:showingLocations});
    document.getElementById('sidebar').classList.toggle('hide-sidebar');
    this.refs.map.clickReaction(showingLocations[0]);
    this.showLocationInfo(showingLocations[0]);
    this.fetchAPIinfo(showingLocations[0]);
  }

//Loads the info about the clicked location and passes it to the state.
// Also shows a popup at the bottom of the screen to click to access the info
  showLocationInfo = (location) => {
    document.getElementById('location-information').classList.remove('hide');
    this.setState({focusedLocation:location});
    this.fetchAPIinfo(location);
  }

// Hides the information  popup
  hideLocationInfo = () => {
    document.getElementById('location-information').classList.add('hide');
    this.setState({focusedLocation:''});
  }
//Toggles the information  popup and fetches data only if required
  toggleLocationInfo = (location) => {
    document.getElementById('location-information').classList.toggle('hide');
    if(this.state.focusedLocation === '') {
      this.fetchAPIinfo(location);
      this.setState({focusedLocation:location});
    } else {
      this.setState({focusedLocation:''});
    }
  }

  render() {
    return (
      <div className="container">
        <Header/>
        <Sidebar locations={this.state.showingLocations} clickLocation={this.clickLocation} filterLocations={this.filterLocations} resetLocations={this.resetLocations}/>
        <Map ref='map' resetLocations={this.resetLocations} locations={this.state.showingLocations} toggleInfo={this.toggleLocationInfo} hideInfo={this.hideLocationInfo}/>
        <LocationInformation info={this.state.focusedLocationData}/>
      </div>
    );
  }
}

export default App;

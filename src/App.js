import React, { Component } from 'react';
import Map from './Map';
import Sidebar from './Sidebar';
import Header from './Header';
import LocationInformation from './LocationInformation';
import fetchJsonp from 'fetch-jsonp';
import escapeRegExp from 'escape-string-regexp';
import './App.css';

class App extends Component {
  state = {
    locations: [
      {title:'Grasse', location:{lat:43.6579685, lng:6.923471}},
      {title:'Cannes', location: {lat:43.5370022, lng:6.9746801}},
      {title:'Antibes', location: {lat:43.5822762, lng:7.0698281}},
      {title:'Juan-les-Pins', location: {lat:43.5710752, lng:7.1070592}},
      {title:'Charabot', location:{lat:43.6583686, lng:6.917404}},
      {title:'Cathédrale Notre-Dame-du-Puy de Grasse', location:{lat:43.6587176, lng:6.9138394}},
      {title:'Robertet', location:{lat:43.6486986, lng:6.9303879}},
      {title:'Parfumerie Fragonard', location:{lat:43.6462532, lng:6.9374693}}
    ],
    showingLocations:[
      {title:'Grasse', location:{lat:43.6579685, lng:6.923471}},
      {title:'Cannes', location: {lat:43.5370022, lng:6.9746801}},
      {title:'Antibes', location: {lat:43.5822762, lng:7.0698281}},
      {title:'Juan-les-Pins', location: {lat:43.5710752, lng:7.1070592}},
      {title:'Charabot', location:{lat:43.6583686, lng:6.917404}},
      {title:'Cathédrale Notre-Dame-du-Puy de Grasse', location:{lat:43.6587176, lng:6.9138394}},
      {title:'Robertet', location:{lat:43.6486986, lng:6.9303879}},
      {title:'Parfumerie Fragonard', location:{lat:43.6462532, lng:6.9374693}}
    ],
    focusedLocation:'',
    focusedLocationData:''
  };

  fetchAPIinfo = location => {
    let appThis = this;
    let url =
      "https://fr.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=" +
      location.title;
    url = url.replace(/ /g, "%20");

    fetchJsonp(url)
      .then(response => (response.json()))
      .then(data => {
        let info = data.query.pages[Object.keys(data.query.pages)[0]].extract;

        appThis.setState({
          focusedLocationData: info
        });
      })
      .catch(err => {
          appThis.setState({
          focusedLocationData: `Failed to retreive data from the Wikipedia API : ${err}`
        });
      });
  };

  filterLocations= (query) => {
    const match = new RegExp(escapeRegExp(query), 'i')
    let showingLocations = this.state.locations.filter((location) => (match.test(location.title)));
    this.setState({showingLocations:showingLocations});
  }

  resetLocations = () => {
    this.setState({showingLocations:this.state.locations});
  }

  clickLocation= (position) => {
    let showingLocations = this.state.locations.filter((location) => ((location.location.lat === position.lat)&&(location.location.lng === position.lng)));
    this.setState({showingLocations:showingLocations});
    document.getElementById('sidebar').classList.toggle('hide-sidebar');
    this.refs.map.clickReaction(showingLocations[0]);
    this.showLocationInfo(showingLocations[0]);
    this.fetchAPIinfo(showingLocations[0]);
  }

  showLocationInfo = (location) => {
    document.getElementById('location-information').classList.remove('hide');
    this.setState({focusedLocation:location});
    this.fetchAPIinfo(location);
  }
  hideLocationInfo = () => {
    document.getElementById('location-information').classList.add('hide');
    this.setState({focusedLocation:''});
  }
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

import React, { Component } from 'react';
import Map from './Map';
import Sidebar from './Sidebar';
import Header from './Header';
import escapeRegExp from 'escape-string-regexp';
import './App.css';

class App extends Component {
  state = {
    locations: [
      {title:'Grasse', location:{lat:43.6579685, lng:6.923471}},
      {title:'La Bastide Saint Antoine', location: {lat:43.6534572, lng:6.9056107}},
      {title:'Musée International de la Parfumerie', location: {lat:43.6533529, lng:6.9142657}},
      {title:'Molinard Bastide historique Musée', location: {lat:43.6424, lng:6.9327642}},
      {title:'Charabot', location:{lat:43.6583686, lng:6.917404}},
      {title:'Cathédrale Notre-Dame Du Puy De Grasse', location:{lat:43.6587176, lng:6.9138394}},
      {title:'Office de Tourisme du Pays de Grasse', location:{lat:43.6575773, lng:6.9227717}},
      {title:'Parfumerie Galimard', location:{lat:43.6365073, lng:6.9459211}}
    ],
    showingLocations:[
      {title:'Grasse', location:{lat:43.6579685, lng:6.923471}},
      {title:'La Bastide Saint Antoine', location: {lat:43.6534572, lng:6.9056107}},
      {title:'Musée International de la Parfumerie', location: {lat:43.6533529, lng:6.9142657}},
      {title:'Molinard Bastide historique Musée', location: {lat:43.6424, lng:6.9327642}},
      {title:'Charabot', location:{lat:43.6583686, lng:6.917404}},
      {title:'Cathédrale Notre-Dame Du Puy De Grasse', location:{lat:43.6587176, lng:6.9138394}},
      {title:'Office de Tourisme du Pays de Grasse', location:{lat:43.6575773, lng:6.9227717}},
      {title:'Parfumerie Galimard', location:{lat:43.6365073, lng:6.9459211}}
    ]
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
    this.refs.map.clickReaction();
  }

  render() {
    return (
      <div className="container">
        <Header/>
        <Sidebar locations={this.state.showingLocations} clickLocation={this.clickLocation} filterLocations={this.filterLocations} resetLocations={this.resetLocations}/>
        <Map ref='map' resetLocations={this.resetLocations} locations={this.state.showingLocations}/>
      </div>
    );
  }
}

export default App;

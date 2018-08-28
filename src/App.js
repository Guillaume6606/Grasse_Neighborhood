import React, { Component } from 'react';
import Map from './Map';
import Sidebar from './Sidebar';
import Header from './Header';
import './App.css';

class App extends Component {
  state = {
    locations: [
      {title:'Grasse', location:{lat:43.6579685, lng:6.923471}},
      {title:'La Bastide Saint Antoine', location: {lat:43.6534572, lng:6.9056107}},
      {title:'Musée International de la Parfumerie', location: {lat:43.6424, lng:6.9327642}},
      {title:'Molinard Bastide historique Musée', location: {lat:43.6424, lng:6.9327642}},
      {title:'Charabot', location:{lat:43.6583686, lng:6.917404}},
      {title:'Cathédrale Notre-Dame Du Puy De Grasse', location:{lat:43.6587176, lng:6.9138394}},
      {title:'Office de Tourisme du Pays de Grasse', location:{lat:43.6575773, lng:6.9227717}},
      {title:'Parfumerie Galimard', location:{lat:43.6365073, lng:6.9459211}}
    ]
  };

  render() {
    return (
      <div className="container">
        <Header/>
        <Sidebar locations={this.state.locations}/>
        <Map locations={this.state.locations}/>
      </div>
    );
  }
}

export default App;
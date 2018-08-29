import React, {Component} from 'react';

class LocationInformation extends Component {
  render(){
    return(
      <aside id="location-information" className="location-information hide">
        <button
          onClick={()=>{
            document.getElementById("location-information").classList.toggle('slide-in');
          }}>
            Show/Hide More About Location
        </button>
        <div id="location-information-content">{this.props.info}</div>
      </aside>
    )
  }
}

export default LocationInformation

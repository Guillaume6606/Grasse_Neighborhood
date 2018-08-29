import React, {Component} from 'react';

class LocationInformation extends Component {
  render(){
    return(
      <aside id="location-information" className="location-information hide">
        <button id ='show-info'
          aria-label='button to display information about the selected location'
          onClick={()=>{
            document.getElementById("location-information").classList.toggle('slide-in');
          }}
          onKeyDown={(event) => {
            if((event.which === 13)){document.getElementById("location-information").classList.toggle('slide-in')}
            if((event.which === 9)){document.getElementById("back").focus()}
          }}
          >
            Show/Hide More About Location
        </button>
        <article aria-label='information regarding the selected location' id="location-information-content">{this.props.info}</article>
      </aside>
    )
  }
}

export default LocationInformation

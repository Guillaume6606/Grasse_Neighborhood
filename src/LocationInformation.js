import React from 'react';
//Displays the location data. Updated by the App parent Component
const LocationInformation = ((props) => {
    return(
      //It is normally hidden under the screen
      //When toogled, it emerges a bit from the bottom of the page, inviting the
      // user to click for more info about the location
      <aside id="location-information" className="location-information hide">
        <button id ='show-info'
          aria-label='button to display information about the selected location'
          onClick={()=>{
            document.getElementById("location-information").classList.toggle('slide-in');
          }}
          // For keyboard users, toggles the appropriate function when pressing enter
          // and switches the focus straight to the location window when pressing
          //tab
          onKeyDown={(event) => {
            if((event.which === 13)){document.getElementById("location-information").classList.toggle('slide-in')}
            if((event.which === 9)){document.getElementById("back").focus()}
          }}
          >
            Show/Hide More About Location
        </button>
        <article aria-label='information regarding the selected location' id="location-information-content">{props.info}</article>
      </aside>
    )
})

export default LocationInformation

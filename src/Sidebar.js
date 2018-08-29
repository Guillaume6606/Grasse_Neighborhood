import React from 'react'
//Functionnal Component used to render the sidebar
// A search field triggers the filterLocations function of the App
// Generates a list element for each location, with a link for both mouse
// and keyboard users to focus on the selected location's marker
// For keyboard users, switches the focus straight to the information
// when clicked
// The last button resets the list to the default locations
const Sidebar = ((props) => {
    return (
      <nav id='sidebar' className="sidebar hide-sidebar">
        <input type="text" placeholder="Filter Locations" onChange={event => props.filterLocations(event.target.value)}/>
        <ul>
         {props.locations.map(location => (
          <li onClick={() => props.clickLocation(location.location)} className="sidebar-location" key={location.title}>
            <a tabIndex={0} aria-label={`Link to access information about ${location.title}`}
               onKeyDown={(event) => {
                 if((event.which === 13)||(event.which === 32)){
                   props.clickLocation(location.location);
                   document.getElementById('show-info').focus();
                 }}}
              >{location.title}</a>
          </li>
        ))}
        </ul>
        <button aria-label="button to reset the search of locations" className='reset-button'onClick={()=>(props.resetLocations())}>Reset Search</button>
      </nav>
    )
})

export default Sidebar

import React from 'react'
//Functionnal Component used to render the sidebar
const Sidebar = ((props) => {
    return (
      <nav id='sidebar' className="sidebar hide-sidebar">
      {/*Search field that triggers the filterLocations function of the App */}
        <input type="text" placeholder="Filter Locations" onChange={event => props.filterLocations(event.target.value)}/>
        <ul>
      {  /* Generates a list element for each location, with a link for both mouse
            and keyboard users to focus on the selected location's marker */}
         {props.locations.map(location => (
          <li onClick={() => props.clickLocation(location.location)} className="sidebar-location" key={location.title}>
            <a tabindex={0} aria-label={`Link to access information about ${location.title}`}
               onKeyDown={(event) => {
                 if((event.which === 13)||(event.which === 32)){
                   props.clickLocation(location.location);
                   {/* For keyboard users, switches the focus straight to the information
                      when clicked */}
                   document.getElementById('show-info').focus();
                 }}}
              >{location.title}</a>
          </li>
        ))}
        </ul>
        {/* Button to reset the list to the default locations */}
        <button aria-label="button to reset the search of locations" className='reset-button'onClick={()=>(props.resetLocations())}>Reset Search</button>
      </nav>
    )
})

export default Sidebar

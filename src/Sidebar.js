import React from 'react'

const Sidebar = (() => {
    return (
      <nav id='sidebar' className="sidebar hide-sidebar">
        <input type="text" placeholder="Filter Locations" onChange={event => this.props.filterLocations(event.target.value)}/>
        <ul>
         {this.props.locations.map(location => (
          <li className="sidebar-location" key={location.title}>
            <a tabindex={0} aria-label={`Link to access information about ${location.title}`} onClick={() => this.props.clickLocation(location.location)}
               onKeyDown={(event) => {
                 if((event.which === 13)||(event.which === 32)){
                   this.props.clickLocation(location.location);
                   document.getElementById('show-info').focus();
                 }}}
              >{location.title}</a>
          </li>
        ))}
        </ul>
        <button aria-label="button to reset the search of locations" className='reset-button'onClick={()=>(this.props.resetLocations())}>Reset Search</button>
      </nav>
    )
})

export default Sidebar

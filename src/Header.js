import React from 'react';
//Functionnal Component used to render the Header
const Header = (() => {
  return (
    <header className="header container">
    // Font Awesome icon that shows or hides the list of locations and search feature
    // Is also available for keyboard users
      <i aria-label="The main menu button" tabindex={0} className="fa fa-bars" aria-hidden="true" onKeyDown={(event) => {if((event.which === 13)||(event.which === 32)){document.getElementById('sidebar').classList.toggle('hide-sidebar')}}} onClick={() => {document.getElementById('sidebar').classList.toggle('hide-sidebar')}}></i>
      <h1>Grasse Surroundings</h1>
    </header>
  )
})

export default Header;

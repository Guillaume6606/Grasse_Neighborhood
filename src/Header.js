import React from 'react';

const Header = (() => {
  return (
    <header className="header container">
      <i className="fa fa-bars" aria-hidden="true" onClick={() => {document.getElementById('sidebar').classList.toggle('hide-sidebar')}}></i>
      <h1>My Neighborhood Map</h1>
    </header>
  )
})

export default Header;

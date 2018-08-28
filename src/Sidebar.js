import React, {Component} from 'react'

class Sidebar extends Component {
  render() {
    return (
      <nav id='sidebar' className="sidebar hide-sidebar">
        <ul>
         {this.props.locations.map(location => (
          <li className="sidebar-location" key={location.title}>
            {location.title}
          </li>
        ))}
        </ul>
      </nav>
    )
  }
}

export default Sidebar
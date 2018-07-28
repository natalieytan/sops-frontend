import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({administrator, updateLogout}) => {
    const adminLinks = [{uri: "/manageusers", text: "Manage Users"}, {uri: "/managesop", text: "Manage SOP"}]
    
    const userLinks = [{uri: "/allsop", text: "All SOP"}]
    
    const adminLinkComponents = adminLinks.map(({uri, text}, key) => 
      <li className="nav-item" key={key}>
      <NavLink activeClassName="active-nav-link" className="nav-link" to={uri} exact>{text}</NavLink>
      </li>)
   
   const userLinkComponents = userLinks.map(({uri, text}, key) => 
      <li className="nav-item" key={key}>
      <NavLink activeClassName="active-nav-link" className="nav-link" to={uri}  exact>{text}</NavLink>
      </li>)

    return (
       <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <h1 className="title">TOYOTA</h1>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink activeClassName="active-nav-link" className="nav-link" to="/mysop" exact>My SOP</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink activeClassName="active-nav-link" className="nav-link" to="/myprofile" exact>My Profile</NavLink>
                </li>
                {administrator ? adminLinkComponents : userLinkComponents}
                <li className="nav-item">
                  <a href="#" className="nav-link" onClick={updateLogout}>Log out</a>
                </li>
            </ul>
            </div>
    </nav> 
    )
}

export default Navbar
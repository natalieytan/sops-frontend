import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../layout/Loader'
import instance from '../api/init'

class MyProfile extends Component {
  state = { 
    user: "",
    loaded: false,
    errorsList: false
  }
  componentDidMount() {
    instance.get('users/me')
     .then((response) => {
       this.setState({
         user: response.data,
         loaded: true
        })
     })
     .catch((error)=>{
      this.setState({
        errorsList: Object.values(error.response.data.errors)
      })
    })
  }
  render() {
    if (!this.state.loaded) { return(<Loader/>)}
    return (  
      <div>    
        <h3 className="head text-center">{this.state.user.firstName} {this.state.user.lastName} -  {this.state.user.department} </h3>
        <div className="data-wrapper4">
          <h3 className="solid-heading">Profile</h3>    
          <div className="details">
            <ul className="list-group">
              <li className="list-group-item 1">First Name:<span className="tab-space1">{this.state.user.firstName}</span> </li>
              <li className="list-group-item 2">Second Name:<span className="tab-space2"> {this.state.user.lastName}</span></li>
              <li className="list-group-item 3">Email:<span className="tab-space3"> {this.state.user.email}</span></li>
              <li className="list-group-item 4">Department:<span className="tab-space4"> {this.state.user.department}</span></li>
              <li className="list-group-item 5">Employee Number:<span className="tab-space5"> {this.state.user.employeeNumber}</span></li>
            </ul>
          </div>
          <br/>
          <div className="d-flex justify-content-around flex-wrap">
            <Link to="/password">
              <button type="button" id="btnSubmit" className="btn btn-secondary">Change Password</button>
            </Link>
            <a href={`mailto:${process.env.REACT_APP_EMAIL}?subject=Please update my details on SOP Portal`}>
              <button type="button" id="btnCancel" className="btn btn-secondary">Request Update</button>
            </a> 
          </div>
        </div> 
      </div> 
    )
  }
}

export default MyProfile
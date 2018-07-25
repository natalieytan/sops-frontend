import React, { Component } from 'react'
import instance from '../api/init'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      employeeNumber: "",
      password: "", 
      incorrectCredentials: "",
      errors: {}
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  
  onSubmit(e) {
    e.preventDefault()
    const user = {
      employeeNumber: this.state.employeeNumber,
      password: this.state.password,
    }
    instance.post("/users/login", user) 
      .then(res => {
        if (res.data.success) { 
          this.setState({ loggedIn: true})
          this.props.updateLogin(res.data) 
          }
       else{
         this.setState({incorrectCredentials: res.data.errors})
       }
      })
      .catch(err => {
        this.setState({incorrectCredentials: 'Your employee number or password is incorrect'})
      })
      
  }

  render() {
    return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br/>
            <br/>
            <br/>
              <h3 className="display-8 text-center">Toyota Australia</h3>
              <h3 className="display-8 text-center">Product Planning Division</h3>
              <h3 className="display-8 text-center">Standard Operating Procedures</h3>
            <br/>
            <br/>
            <form onSubmit={this.onSubmit.bind(this)}>
              <div className="form-group">
                <label className='label'>Toyota Number</label>
                <input type="text" 
                className="form-control form-control-lg"
                name="employeeNumber"
                value={this.state.employeeNumber}
                onChange={this.onChange.bind(this)} 
                />
              </div>
              <br/>
              <div className="form-group">
                <label className='label'>Password</label>
                <input type="password" 
                className="form-control form-control-lg"
                name="password" 
                value={this.state.password}
                onChange={this.onChange.bind(this)} 
                />
                <br/>
                <div className="form-alert">{this.state.incorrectCredentials}</div>
              </div>
              <br/>
              <br/>
              <div className="text-center"> 
              <button type="submit"  className="btn btn-secondary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Login

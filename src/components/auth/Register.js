import React, { Component } from 'react'
import axios from '../api/init'
import history from '../layout/history'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      firstName: "",
      firstNameError: "",
      lastName: "",
      lastNameError: "",
      employeeNumber: "",
      employeeNumberError: "",
      email: "",
      emailError: "",
      department: "",
      departmentError: "",
      password: "", 
      passwordError: "", 
      password2: "",
      password2Error: "",
      active: true,
      administrator: false,
      errors: {}
    }
  }

  onChange(e) {
    const target = e.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name

    this.setState({[e.target.name]: e.target.value})

    this.setState({
      [name]: value
    })
    
  }

  validate = () => {
    let isError = false
    const errors = {
      firstNameError: "",
      lastNameError: "",
      employeeNumberError: "",
      emailError: "",
      departmentError: "",
      passwordError: "",
      password2Error: ""
    }

    if (this.state.firstName.length < 3 || this.state.firstName.length > 30) {
      isError = true
      errors.firstNameError = 'First name must be between 2 and 30 characters'
    }

    if (this.state.lastName.length < 3 || this.state.lastName.length > 30) {
      isError = true
      errors.lastNameError = 'Last name must be between 2 and 30 characters'
    }

    if (this.state.employeeNumber.length !== 6) {
      isError = true
      errors.employeeNumberError = 'Please enter a valid employee number'
    }

    if (this.state.password.length < 6 || this.state.password.length > 30) {
      isError = true
      errors.passwordError = 'Password must be at least 6 characters'
    }

    if (this.state.password2 !== this.state.password) {
      isError = true
      errors.password2Error = 'Passwords must match'
    }

    if (isError) {
      this.setState(errors)
    }
    return isError
  }

  //TODO: edit user still submits if there is errors even though error messages are raised
  onSubmit(e) {
    e.preventDefault()
    const err = this.validate()
    if (!err) {

      // clear form
      this.setState({
        firstName: "",
        firstNameError: "",
        lastName: "",
        lastNameError: "",
        employeeNumber: "",
        employeeNumberError: "",
        email: "",
        emailError: "",
        department: "",
        departmentError: "",
        password: "", 
        passwordError: "",
        password2: "",
        password2Error: ""
      })

      const newUser = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        employeeNumber: this.state.employeeNumber,
        email: this.state.email,
        department: this.state.department,
        password: this.state.password,
        password2: this.state.password2,
        active: this.state.active,
        administrator: this.state.administrator,
      }

      console.log(newUser)
      axios.post("/users/register", newUser) 
      .then(res => {
        console.log(res);
        console.log(res.data);
        
      })
      .catch(err => console.error(err))
    }
  }

  render() {
    return (
      <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
          <br/>
            <p className="lead text-center">Create New User</p>
           
            <form onSubmit={this.onSubmit.bind(this)}>
           
            <br/>
              <div className="form-group">
              <label className='label'>First Name</label>
                <input type="text" 
                className="form-control 
                form-control-md"
                name="firstName" 
                value={this.state.firstName}
                onChange={this.onChange.bind(this)}
                required 
                />
                <div className="form-alert">{this.state.firstNameError}</div>
              </div>
              <div className="form-group">
              <label className='label'>Last Name</label>
                <input 
                type="text" 
                className="form-control form-control-md"
                name="lastName" 
                value={this.state.lastName}
                onChange={this.onChange.bind(this)}
                errortext={this.state.lastNameError}
                required 
                />
                <div className="form-alert">{this.state.lastNameError}</div>
              </div>
              <div className="form-group">
              <label className='label'>Toyota Number</label>
                <input 
                type="text" 
                className="form-control form-control-md"
                name="employeeNumber"
                value={this.state.employeeNumber}
                onChange={this.onChange.bind(this)}
                errortext={this.state.employeeNumberError}
                required
                 />
                 <div className="form-alert">{this.state.employeeNumberError}</div>
              </div>
              <div className="form-group">
              <label className='label'>Email</label>
                <input 
                type="email" 
                className="form-control 
                form-control-md"
                name="email" 
                value={this.state.email}
                onChange={this.onChange.bind(this)}
                errortext={this.state.emailError}
                required
                />
                <div className="form-alert">{this.state.emailError}</div>
              </div>
              <div className="form-group">
              <label className='label'>Department</label>
                <select 
                  className="form-control" 
                  name="department" value={this.state.department} 
                  onChange={this.onChange.bind(this)} 
                  errortext={this.state.departmentError}>
                  <option>Product Planning & Pricing</option>
                  <option>Product Design</option>
                  <option>Regulations, Conversions & Accessories</option>
                  <option>Vehicle Evaluation</option>
                  <option>Connected Vehicle Services</option>
                  <option>Technical administration</option>
                </select>
              </div>
              <div className="form-group">
              <label className='label'>Password</label>
                <input 
                type="password" 
                className="form-control form-control-md"
                name="password" 
                value={this.state.password}
                onChange={this.onChange.bind(this)}
                errortext={this.state.passwordError}
                required
                />
                <div className="form-alert">{this.state.passwordError}</div>
              </div>
              <div className="form-group">
              <label className='label'>Confirm Password</label>
                <input 
                type="password" 
                className="form-control 
                form-control-md" 
                name="password2"
                value={this.state.password2} 
                onChange={this.onChange.bind(this)}
                errortext={this.state.password2Error}
                required
                />
                <div className="form-alert">{this.state.password2Error}</div>
              </div>


              <div className="form-group checkbox">
                <label className="checkbox checkbox-label">
                  <input
                    className='checkbox'
                    name="active"
                    type="checkbox"
                    checked={this.state.active}
                    onChange={this.onChange.bind(this)}
                  />
                  Active
                </label>
              </div>

              <div className="form-group checkbox">
              <label className="checkbox-label">
                  <input
                    className='checkbox'
                    name="administrator"
                    type="checkbox"
                    checked={this.state.administrator}
                    onChange={this.onChange.bind(this)}
                  />
                  Admin
                </label>
              </div>


              <br/>
              <div className="text-center"> 
                <input type="submit" className="btn btn-primary" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    
    )
  }
}

export default Register
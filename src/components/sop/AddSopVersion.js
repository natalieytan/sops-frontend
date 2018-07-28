import React from 'react'
import { post } from 'axios';
import Loader from '../layout/Loader'
import { Redirect } from 'react-router-dom'

class AddSopVersion extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      file: null,
      author: '',
      createdAt: '',
      loaded: false,
      hello: '',
      sop: null,
      fireRedirect: false,
      errorsList: null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      sop: this.props.location.state.sop,
      loaded: true,
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onFormSubmit(e){
    e.preventDefault()
    const {file, author, createdAt} = this.state
    this.fileUpload(file, author, createdAt)
    .then((response)=>{
      if(response.data.success) {
        this.setState({
          fireRedirect: true
        })
      }
    })
    .catch(() => {
      alert("Unable to upload new version. Please try again.")
    })
  }

  onChange(e) {
    this.setState({file:e.target.files[0]})
  }

  fileUpload(file, author, createdAt){
    const url = `${process.env.REACT_APP_BACKEND_URL}/sops/addversion/${this.props.match.params.id}`;
    const formData = new FormData();
    formData.append('file', file)
    formData.append('author', author)
    formData.append('createdAt', createdAt)
    const config = {
        withCredentials: true,
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return post(url, formData, config)
  }

  render() {
    if (!this.state.loaded) { return(<Loader/>)}
    return (
      
      <div className="data-wrapper4">
        <h3 className="solid-heading">SOP - Upload New Version</h3>
        <br/>
        <dl className="row">
          <dt className="col-sm-3">Title</dt>
          <dd className="col-sm-9">{this.state.sop.title}</dd>
          <dt className="col-sm-3">Department</dt>
          <dd className="col-sm-9">{this.state.sop.department}</dd>
        </dl>
        <p className="text-muted"><strong>Note</strong>: The most recent version of this SOP was written by {this.state.sop.currentVersion.author} on {this.state.sop.currentVersion.createdAt} (version {this.state.sop.currentVersion.version})</p>
        <hr />

        <form onSubmit={this.onFormSubmit}>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input type="text" 
                  name="author" id="author"
                  className="form-control" 
                  value={this.state.author} 
                  onChange={this.handleInputChange} 
                  required
                  />
          </div>


          <div className="form-group">
            <label htmlFor="createdAt">Date Created</label>
            <input type="date" className="form-control" id="createdAt" name="createdAt"
            value={this.state.createdAt} 
            onChange={this.handleInputChange}
            required
            />
          </div>

          <div className="form-group">
            <input type="file" className="form-control-file" accept=".pdf" onChange={this.onChange} required/>
          </div>
        
          <div className="text-center">
            <button className="btn btn-secondary" type="submit">Add SOP Version</button>
          </div>
        </form>
        {this.state.fireRedirect && <Redirect to={`/sops/${this.props.match.params.id}`} />}
      </div>
   )
  }
}



export default AddSopVersion
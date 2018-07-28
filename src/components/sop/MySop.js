import React, { Component } from 'react'
import axios from '../api/init'
import Loader from '../layout/Loader'

class MySop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      readSops: [],
      unreadSops: [],
      outdatedSops: [],
      errorsLust: null
    }
  }

  componentDidMount() {
    axios.get(`/sops/mysop`)
      .then((response) => {
        this.setState({
          loaded: true,
          readSops: response.data.readSops,
          unreadSops: response.data.unreadSops,
          outdatedSops: response.data.outdatedSops
        })
      })
      .catch((error)=>{
        this.setState({
          errorsList: Object.values(error.response.data.errors)
        })
      })
  }

  onReadSop(sop) {
    const sopId = sop._id
    axios.patch(`/sops/markasread/${sopId}`)
    .then(res => {
      if (res.data.success) {
        this.setState((prevState) => {
          const readSops = prevState.readSops.concat(sop)
          const unreadSops  = prevState.unreadSops.filter( x => x._id !== sopId)
          const outdatedSops = prevState.outdatedSops.filter( x => x._id !== sopId)
          return {
            readSops,
            unreadSops,
            outdatedSops
          }
        })
      }})
    .catch(() => {
      alert("Unable to mark as read. Please try again.")
    })
  }
  
  render() {
    if (!this.state.loaded) { return(<Loader/>)}

    const readSops = this.state.readSops.map((sop, i) => <div className="sop-read" key={i}> 
    <a href={`${process.env.REACT_APP_BACKEND_URL}/sops/download/${sop.currentVersion.awsPath}`}>
      <img className="pdf-logo" alt="pdf logo" src={ require('../../img/pdf2.png') } />
      {sop.title}
    </a>
    </div>)

    const unreadSops = this.state.unreadSops.map((sop, i) => 
      <div className="unread-list-item" key={i}>
        <div className="sop-unread-user">
          <a href={`${process.env.REACT_APP_BACKEND_URL}/sops/download/${sop.currentVersion.awsPath}`}>
            <img className="pdf-logo" alt="pdf logo" src={ require('../../img/pdf2.png') } />
            {sop.title}
          </a>
        </div>
          <div className="span4 proj-div button-mark-read" data-toggle="modal" data-target={`#Modal${sop._id}`}>Mark as read</div>
          <div id={`Modal${sop._id}`} className="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" tabindex="-1" role="dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">User Agreement</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;  </button>
                </div>
                <div className="modal-body">
                  By pressing submit you agree to have read in detail and fully understand: {sop.title}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                  <button type="submit" className="btn btn-primary" onClick={() => this.onReadSop(sop) } data-dismiss="modal">Submit</button>
                </div>
              </div>
          </div>
        </div> 
      </div>)

    const outdatedSops = this.state.outdatedSops.map((sop, i) => 
      <div className="unread-list-item" key={i}>
          <a className="sop-outdated-user" href={`${process.env.REACT_APP_BACKEND_URL}/sops/download/${sop.currentVersion.awsPath}`}>
          <img className="pdf-logo" alt="pdf logo" src={ require('../../img/pdf.png') } />
          {sop.title}
          </a>
          <div className="span4 proj-div button-mark-read-outdated" data-toggle="modal" data-target={`#Modal${sop._id}`}>Mark as read</div>
          <div id={`Modal${sop._id}`} className="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" tabindex="-1" role="dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">User Agreement</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;  </button>
                </div>
                <div className="modal-body">
                  By pressing submit you agree to have read in detail and fully understand: {sop.title}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                  <button type="submit" className="btn btn-primary" onClick={() => this.onReadSop(sop) } data-dismiss="modal">Submit</button>
                </div>
              </div>
          </div>
        </div>
      </div>)

    if (!this.state.loaded) { return(<Loader/>)}

    return (
      <div className="data-wrapper4">
        <div className="col-md-12 m-auto">
        <h3 className="head text-center">Your SOPs</h3>
        <h3 className="solid-heading">Unread</h3>
        {unreadSops.length !== 0 ?
          <div className="sop-list">
            {unreadSops}
          </div>
          :
          <div className="read-success-message">
            <h5>You are all up to date.</h5>
          </div>
        }
        <h3 className="solid-heading">New Versions Available</h3>
        {outdatedSops.length !== 0 ?
          <div className="sop-list">
            {outdatedSops}
          </div>
          : 
          <div className="read-success-message">
            <h5>You are all up to date.</h5>
          </div>
        }

        <h3 className="solid-heading">Read</h3>
        {readSops.length !== 0 ?
          <div className="sop-list">
            {readSops}
          </div>
          : 
          <div className="read-success-message">
            <h5>No read SOP.</h5>
          </div>
        }
      </div>
      </div>
    )
  }
}

export default MySop

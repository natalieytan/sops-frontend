import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../layout/Loader'
import axios from '../api/init'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import moment from 'moment'
const pdfLogo = require('../../img/pdf.png')

class ManageSop extends Component {
  state = {
    sops: [],
    loaded: false,
    errorsList: false
  }

  componentDidMount() {
    axios.get('/sops')
      .then((response) => {
        this.setState({
          sops: response.data,
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
        <div className="solid-heading d-flex justify-content-between">Manage SOPs <Link to="/sops/create"><button className="btn btn-secondary">Create New SOP</button></Link></div>
        <ReactTable 
          data={this.state.sops}
          columns={[
            {
              Header: "Title",
              accessor: "title",
              Cell: (data) => (
                <a href={`${process.env.REACT_APP_BACKEND_URL}/sops/download/${data.original.currentVersion.awsPath}`}><span><img src={pdfLogo} alt="pdf icon"/> {data.value} </span></a>
              )
            },
            {
              Header: "Department",
              accessor: "department"
            },
            {
              Header: "Latest Version",
              accessor: "currentVersion.version"
            },
            {
              id: "createdAt",
              Header: "Created",
              accessor: d => {
                return moment(d.currentVersion.createdAt).format('DD MMM YYYY')
           
              }
            },
            {
              id: "currentExpires",
              Header: "Expires",
              accessor: d => {
                return moment(d.currentVersion.currentExpires).format('DD MMM YYYY')
             
              }
            },
            {
              Header: "Manage",
              accessor: "_id",
              Cell: row => (
                <Link to={`/sops/${row.value}`}>Manage</Link>
              )
            }
          ]}
          className="-striped -highlight"
          minRows={1}
          filterable={true}
        />
      </div>
    )
  }
}

export default ManageSop
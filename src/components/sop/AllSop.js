import React, { Component } from 'react'
import Loader from '../layout/Loader'
import axios from '../api/init'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import moment from 'moment'
const pdfLogo = require('../../img/pdf.png')

class AllSop extends Component {
  state = {
    sops: [],
    loaded: false,
    errorsList: false,
  }

  componentDidMount() {
    axios.get('/sops/allforuser')
      .then((response) => {
        this.setState({
          sops: response.data,
          loaded: true
        })
      })
    .catch((err)=>{
      this.setState({
        errorsList: Object.values(err.response.data.errors)
      })
    })
  }   

  render() {
    if (!this.state.loaded) { return(<Loader/>)}
    return (
      <div>
        <div className="solid-heading d-flex justify-content-between">All SOPs</div>        
        <ReactTable 
          data={this.state.sops}
          columns={[
            {
              Header: "Title",
              accessor: "title",
              Cell: (data) => (
                <a href={`${process.env.REACT_APP_BACKEND_URL}/sops/download/${data.original.awsPath}`} target="_blank" rel="noopener noreferrer"><span><img alt="pdf logo" src={pdfLogo} /> {data.value} </span></a>
              )
            },
            {
              Header: "Latest Version",
              accessor: "version",
              className: "table-center"
            },
            {
              Header: "Department",
              accessor: "department"
            },
            {
              Header: "Author",
              accessor: "author"
            },
            {
              id: "createdAt",
              Header: "Created",
              accessor: d => {
                return moment(d).format('DD MMM YYYY')
              }
            },
            {
              Header: "Read",
              accessor: "read",
              Cell: data => (
                <span>{ data.value ? "Read" : "Not Read"}</span>
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

export default AllSop
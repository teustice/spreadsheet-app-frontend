import React, {Component} from 'react';
import { connect } from 'react-redux';
import CSVReader from "react-csv-reader";

import {getTodos} from '../../actions/todoActions'
import apiUrl from '../../lib/apiUrl';

class CSVParser extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      errors: []
    }
  }

  renderData = data => {
    let csvInput = document.querySelector('.csv-input');
    let fileExtension = csvInput.value.split('.')[1];
    if(fileExtension !== 'csv') {
      this.setState({data: [['File must be a .csv']]});
    } else {
      this.setState({data: data});
      this.validateData();
      console.log(data);
    }
  };

  validateData() {
    let errors = [];

    //validate headers
    if(this.state.data[0][0] !== "title" || this.state.data[0][1] !== "text") {
      let error = 'Invalid headers! Headers must be the first row with no spaces.'
      !errors.includes(error) && errors.push(error);
    }

    //validate body
    this.state.data.forEach(function(entry, index) {
      if(entry.length !== 2) {
        let error = 'Invalid Data! A row was empty';
        !errors.includes(error) && errors.push(error);
      }
    })

    if(errors.length >= 1) {
      this.setState({errors: errors});
      return false;

    } else {
      this.setState({errors: []});
      return true;
    }
  }

  uploadCSV() {
    let that = this;
    if(this.validateData()) {
      console.log('uploading');
      let data = this.state.data.slice();
      data.shift(); //remove headers
      let body = [];
      data.forEach(function(entry, index) {
        body.push({
          title: entry[0],
          text: entry[1],
          user: that.props.currentUser
        })
      })

      fetch(`${apiUrl}/todos/batch`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then(response => response.json().then(body => ({ response, body })))
        .then(({ response, body }) => {
          console.log(response);
          if (response.ok) {
            console.log('uploaded');
            that.props.getTodos()
          } else {
            console.log('error');
          }
        });

    }
  }

  render() {
    let spreadsheet = this.state.data.map(function(row, rowIndex) {
      let cells = row.map(function(cell, cellIndex) {
        return (
          <td key={'c' + cellIndex}>{cell}</td>
        )
      })

      return (
        <tr key={'r' + rowIndex} className={`row-${rowIndex}`}>
          {cells}
        </tr>
      )
    })

    let errors = this.state.errors.map(function(error, index) {
      return(
        <p key={index}>{error}</p>
      )
    })

    return (
      <div>
        <CSVReader
          cssClass="react-csv-input"
          label="Select CSV to be validated"
          onFileLoaded={this.renderData.bind(this)}
          />

        {this.state.errors.length  ?
          errors :
          <div className="preview-area">
            <table>
              <tbody>
                {spreadsheet}
              </tbody>
            </table>

            {this.state.data.length > 0 &&
              <button className="btn btn-sm" onClick={this.uploadCSV.bind(this)}>Upload CSV</button>
            }
          </div>
        }

      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
})


const mapDispatchToProps = dispatch => ({
  getTodos: () => dispatch(getTodos())
})

export default connect(mapStateToProps, mapDispatchToProps)(CSVParser);

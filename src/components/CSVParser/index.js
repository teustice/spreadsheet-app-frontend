import React, {Component} from 'react';
import { connect } from 'react-redux';
import CSVReader from "react-csv-reader";

import {createTodoBatch} from '../../actions/todoActions'
import LoadingSpinner from '../LoadingSpinner'

class CSVParser extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      errorIndexes: [],
      errors: [],
      processing: false,
    }
  }

  renderData = data => {
    let csvInput = document.querySelector('.csv-input');
    let fileExtension = csvInput.value.split('.')[1];
    if(fileExtension !== 'csv') {
      this.setState({data: [['File must be a .csv']]});
    } else {
      this.setState({data: data});
      this.setState({displayData: data});
      this.validateData();
    }
  };

  validateData() {
    let errors = [];

    let errorIndexes = []

    //validate headers
    if(this.state.data[0][0] !== "title" || this.state.data[0][1] !== "text") {
      let error = 'Invalid headers! Headers must be the first row with no spaces.'
      !errors.includes(error) && errors.push(error);

      errorIndexes.push(0)
    }

    //validate body
    this.state.data.forEach(function(entry, index) {
      if(entry.length !== 2) {
        let error = `Invalid Data! Row ${index} was empty`;
        !errors.includes(error) && errors.push(error);
        errorIndexes.push(index)
      }
    })

    this.setState({errorIndexes: errorIndexes})

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
      let body = [];
      this.setState({processing: true});
      let data = this.state.data.slice();
      data.shift(); //remove headers
      data.forEach(function(entry, index) {

        body.push({
          title: entry[0],
          text: entry[1],
          user: that.props.currentUser
        })
      })

      this.props.createTodoBatch(body, function(err) {
        console.log(err);
        if(err) {
          that.setState({processing: false});
          that.props.notifications.addNotification({
            message: 'Something went wrong uploading the CSV!',
            level: 'warning'
          })
        } else {
          that.setState({data: []})
          document.querySelector('.csv-input').value = '';
          that.props.notifications.addNotification({
            message: 'CSV was imported successfully!',
            level: 'success'
          })
          that.setState({processing: false});
        }
      });
    }
  }

  render() {
    let that = this;
    let spreadsheet = this.state.data.map(function(row, rowIndex) {
      let cells = row.map(function(cell, cellIndex) {
        return (
          <td key={'c' + cellIndex}>{cell}</td>
        )
      })

      return (
        <tr key={'r' + rowIndex} className={`row-${rowIndex} ${that.state.errorIndexes.includes(rowIndex) ? 'error-message' : ''}`}>
          {cells}
        </tr>
      )
    })

    let errors = this.state.errors.map(function(error, index) {
      return(
        <p key={index} className="error-message">{error}</p>
      )
    })

    return (
      <div>
        <CSVReader
          cssClass="react-csv-input"
          label="Select CSV to upload"
          onFileLoaded={this.renderData.bind(this)}
          />

        {this.state.errors.length > 0 &&
          errors
        }
        <div className="spreadsheet-preview-area">
          {this.state.errors.length <= 0 && this.state.data.length > 0 &&
            <p className="success-message">CSV has been validated and is ready to import</p>
          }

          <br/>

          {this.state.processing ?
              <LoadingSpinner text="Uploading"/>
            : this.state.data.length > 0 && errors.length < 1 &&
              <button className="btn" onClick={this.uploadCSV.bind(this)}>Upload CSV</button>
          }

          <table>
            <tbody>
              {spreadsheet}
            </tbody>
          </table>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
})


const mapDispatchToProps = dispatch => ({
  createTodoBatch: (todoArray, callback) => dispatch(createTodoBatch(todoArray, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(CSVParser);

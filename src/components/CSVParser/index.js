import React, {Component} from 'react';
import { connect } from 'react-redux';
import CSVReader from "react-csv-reader";

import {createTodoBatch} from '../../actions/todoActions'
import LoadingSpinner from '../LoadingSpinner'

let csvData = [];

export class CSVParser extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      errorIndexes: [],
      spreadsheetPreview: [],
      errors: [],
      processing: false,
      spinnerText: ''
    }
  }

  renderData(data) {
    // let csvInput = document.querySelector('.csv-input');
    // let fileExtension = csvInput.value.split('.')[1];
    // if(fileExtension !== 'csv') {
    //   this.setState({data: [['File must be a .csv']]});
    // } else {
    //
    //   //place execution at the end of the stack to maintain interaction with site
    //   // that.setState({data: data});
    //   // that.setState({displayData: data});
    //   // that.validateData();
    // }
  };

  parserStep(results, file) {
    csvData = csvData.concat(results.data);
  }

  parserComplete() {
    console.log('COMPLETE');
    this.setState({data: csvData})
    csvData = [];
    this.setState({spreadsheetPreview: []})
    this.validateData();
    this.lazyLoadTablePreview();
  }

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
      this.setState({processing: true, spinnerText: 'Uploading'});
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

  lazyLoadTablePreview() {
    let that = this;
    var length = this.state.data.length;
    var index = 0;
    that.setState({processing: true, spinnerText: `Loading CSV Preview...`})

    var process = function() {
      for (; index < length; index++) {
        var row = that.state.data[index];

        let cells = row.map(function(cell, cellIndex) {
          return (
            <td key={'c' + cellIndex}>{cell}</td>
          )
        })

        let rowMarkup = (
          <tr key={'r' + index} className={`row-${index} ${that.state.errorIndexes.includes(index) ? 'error-message' : ''}`}>
            {cells}
          </tr>
        )

        var newPreview = that.state.spreadsheetPreview.concat(rowMarkup);
        that.setState({ spreadsheetPreview: newPreview })
        // Perform xml processing
        //change modulo division number to set chunk count
        if (index + 1 < length && index % 100 == 0) {
          setTimeout(process, 5);
          index++;
          break;
        } else if(index + 1 === length) {
          that.setState({processing: false})
        }
      }
    };
    process();
  }

  render() {
    let that = this;

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
          parserOptions={{
            chunk: (results, file) => this.parserStep(results, file),
            complete: () => this.parserComplete()
          }}
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
              <LoadingSpinner text={this.state.spinnerText}/>
            : this.state.data.length > 0 && errors.length < 1 &&
              <button className="btn" onClick={this.uploadCSV.bind(this)}>Upload CSV</button>
          }

          <table>
            <tbody>
              {this.state.spreadsheetPreview}
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

import React, {Component} from 'react';
import LocationSearchInput from '../components/LocationSearchInput'
import CSVReader from "react-csv-reader";


class Test extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  doGeocode() {
    var addr = document.getElementById("address");
    // Get geocoder instance
    var geocoder = new window.google.maps.Geocoder();

    // Geocode the address
    geocoder.geocode({
      'address': addr.value
    }, function(results, status) {
      if (status === window.google.maps.GeocoderStatus.OK && results.length > 0) {

        // set it to the correct, formatted address if it's valid
        addr.value = results[0].formatted_address;

        // show an error if it's not
      } else alert("Invalid address");
    });
  };


  renderData = data => {
    let csvInput = document.querySelector('.csv-input');
    let fileExtension = csvInput.value.split('.')[1];
    if(fileExtension !== 'csv') {
      this.setState({data: [['File must be a .csv']]});
    } else {
      this.setState({data: data});
      console.log(data);
    }
  };

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
    return(
      <div className="container">
        <h1 className="h2 page-title">Test Page</h1>
        <p>Address autocomplete</p>
        <LocationSearchInput />
        <p>Address Validation</p>
        <input type="text" id="address" onChange={this.doGeocode} />

        <br/>
        <br/>
        <br/>

        <CSVReader
          cssClass="react-csv-input"
          label="Select CSV to be validated"
          onFileLoaded={this.renderData.bind(this)}
        />

        <table>
          <tbody>
            {spreadsheet}
          </tbody>
        </table>
      </div>
    )
  }
}


export default (Test);

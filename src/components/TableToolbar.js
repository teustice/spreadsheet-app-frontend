import React from 'react';

import { Toolbar } from "react-data-grid-addons";

export default class TableToolbar extends Toolbar {

  renderDeleteRowButton() {
    if (this.props.bulkDelete ) {
      return (<button type="button" className="btn-force" onClick={this.props.bulkDelete}>
        Delete Selected
    </button>);
    }
  }

  renderDownloadCSVButton() {
    if (this.props.bulkDelete ) {
      return (<button type="button" className="btn-force" onClick={this.props.downloadCSV}>
        Export as CSV
    </button>);
    }
  }

  render() {
    return (
      <div className="react-grid-Toolbar">
        <div className="tools">
        {this.props.selected.length > 0 && this.renderDownloadCSVButton()}
        {this.props.selected.length > 0 && this.renderDeleteRowButton()}
        {this.renderToggleFilterButton()}
        </div>
      </div>);
  }
}

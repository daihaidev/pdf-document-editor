import React from 'react'

import CommonFieldOptions from './CommonFieldOptions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglass } from '@fortawesome/free-solid-svg-icons'

export default class GridCellFieldOptions extends React.Component {
  render() {
    const row = this.props.object.fieldProperties.structureCoordinates.y + 1
    const col = this.props.object.fieldProperties.structureCoordinates.x + 1

    return (
      <CommonFieldOptions {...this.props} >
        <div className="form-group row">
          <label htmlFor="objectTypeField" className="col-sm-4 col-form-label">Type</label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="objectTypeField"
              value="Grid Cell"
              disabled={true}
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="gridCellColField" className="col-sm-4 col-form-label">Cell col</label>
          <div className="col-sm-6">
            <input type="text" name="gridCellField" id="gridCellField" className="form-control" disabled
              value={"row: " + row + ", col: " + col}
            />
          </div>
          <button
            disabled={!this.props.isCustomFile || this.props.detectingFields}
            onClick={e => this.props.detectGridStructure(this.props.object.id)}
            className="btn condensed-button btn-outline-secondary pull-right">
              {this.props.detectingFields ? <FontAwesomeIcon icon={faHourglass} /> : '...'}
          </button>
        </div>
      </CommonFieldOptions>
    );
  }
}

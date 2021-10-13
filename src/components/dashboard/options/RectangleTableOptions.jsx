import React from 'react'

export default class RectangleTableOptions extends React.Component {
  selectRowMergingRule = (e) => {
    const value = e.target.value == "none" ? undefined : e.target.value

    this.props.changeTableRowMergingRule(this.props.object.id, value)
  }

  render() {
    const fieldProperties = this.props.object["fieldProperties"]

    return (
      <div className="object-options-body">
        <div className="form-group row">
          <label htmlFor="objectNameField" className="col-sm-5 col-form-label">Name</label>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              id="objectNameField"
              placeholder="Name"
              value={this.props.object.name}
              onChange={(e) => this.props.changeObjectName(this.props.object.id, e.target.value)}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-5 col-form-label">Type</label>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              value="Rectangle Table"
              disabled={true}
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="tableRowMergingRuleField" className="col-sm-5 col-form-label">Row merging rule</label>
          <div className="col-sm-7">
            <select
              name="tableRowMergingRuleField"
              id="tableRowMergingRuleField"
              onChange={this.selectRowMergingRule}
              className="form-control"
            >
              <option value="none">none</option>
              <option value="byBorders">By borders</option>
              <option value="hangingRows">Hanging rows</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

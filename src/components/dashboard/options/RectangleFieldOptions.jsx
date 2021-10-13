import React from 'react'

import CommonFieldOptions from './CommonFieldOptions'

export default class RectangleFieldOptions extends React.Component {

  handleMouseEnter = () => {
    this.props.handleEnterExpandArea()
  }

  handleMouseLeave = () => {
    this.props.handleLeaveExpandArea()
  }

  render() {
    const fieldProperties = this.props.object["fieldProperties"]
    const left = Math.round(fieldProperties["rectangle"][0] * 100) / 100
    const top  = Math.round(fieldProperties["rectangle"][1] * 100) / 100
    const width = Math.round(fieldProperties["rectangle"][2] * 100) / 100
    const height = Math.round(fieldProperties["rectangle"][3] * 100) / 100
    const expression = this.props.object.fieldProperties.expression || ""

    return (
      <CommonFieldOptions {...this.props}>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Data</label>
          <div className="col-sm-9 object-options-coordinates">
            {`${fieldProperties["fieldType"]}: {${left}, ${top}, ${width}, ${height}}`}
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="objectExpressionField" className="col-sm-3 col-form-label">Expression</label>
          <div className="col-sm-9">
            <textarea
              className="form-control"
              name="objectExpressionField"
              id="objectExpressionField"
              cols="30" rows="2"
              value={expression}
              onChange={(e) => this.props.changeObjectExpression(this.props.object.id, e.target.value)}
              onMouseEnter={() => this.handleMouseEnter()}
              onMouseLeave={() => this.handleMouseLeave()}
            >
            </textarea>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-12">
            <div className="form-check regex-form pull-left mT-10">
              <input
                type="checkbox"
                id="regexCheckbox"
                checked={this.props.object.fieldProperties.regex}
                onChange={e => this.props.setRegexStatusToObject(this.props.object.id, !this.props.object.fieldProperties.regex)}
              />
              <label className="form-check-label mL-10" htmlFor="regexCheckbox">Regex</label>
            </div>
            <button onClick={this.props.openMacrosModal} className="btn btn-outline-secondary mT-10 pull-right">
              Insert Macro
            </button>

            <button disabled={this.props.detectingMacro || this.props.isRunningTemplate || !this.props.isCustomFile} onClick={e => this.props.detectMacro(this.props.object.id)} className="btn btn-outline-secondary mR-10 mT-10 pull-right">
              {this.props.detectingMacro ? "Detecting..." : "Autodetect Expression"}
            </button>
          </div>
        </div>
      </CommonFieldOptions>
    );
  }
}

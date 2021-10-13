import React from 'react'

import CommonFieldOptions from './CommonFieldOptions'

export default class TextSearchFieldOptions extends React.Component {
  render() {
    return (
      <CommonFieldOptions {...this.props} >
        <div className="form-group row">
          <label htmlFor="objectTypeField" className="col-sm-5 col-form-label">Type</label>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              id="objectTypeField"
              value="Text search"
              disabled={true}
            />
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
              value={this.props.object.fieldProperties.expression}
              onChange={(e) => this.props.changeObjectExpression(this.props.object.id, e.target.value)}
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
              Insert macro
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

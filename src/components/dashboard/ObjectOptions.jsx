import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare } from '@fortawesome/free-solid-svg-icons'

import RectangleFieldOptions from './options/RectangleFieldOptions'
import RectangleTableOptions from './options/RectangleTableOptions'
import StaticValueFieldOptions from './options/StaticValueFieldOptions'
import TextSearchFieldOptions from './options/TextSearchFieldOptions'
import SearchBasedTableOptions from './options/SearchBasedTableOptions'
import GridCellFieldOptions from './options/GridCellFieldOptions'

import classNames from 'classnames'

export default class ObjectOptions extends React.Component {
  rectangleTable = (object) => {
    const props = object["tableProperties"]
    const convertedProps = typeof props === 'string' ? JSON.parse(props) : props;
    return props && convertedProps["start"] && convertedProps["end"] &&
      convertedProps["start"]["pageIndex"] !== -1 &&
      convertedProps["end"]["pageIndex"] !== -1 &&
      convertedProps["start"]["pageIndex"] === convertedProps["end"]["pageIndex"]
      && !isNaN(convertedProps["left"]) && !isNaN(convertedProps["right"])
  }

  handleRunTestObject = (objectId, objectType) => {
    if (this.props.isCustomFile) {
      this.props.runTemplateWithOneObject(objectId, objectType)
    }
    else {
      if (window.confirm("No PDF file is loaded for testing. Do you want to load PDF file now?")) {
        this.props.handleUploadPdf()
      }
    }
  }

  render() {
    var optionsComponent = null
    const object = this.props.object
    const objects = this.props.objects
    const buttonsClasses = classNames("btn btn-outline-secondary pull-right mL-10", { hidden: !object })
    const buttonsClassesDanger = classNames("btn btn-outline-danger pull-right mL-10", { hidden: !object })

    const runTemplateResult = this.props.runTemplateResult.jsonResult && JSON.parse(this.props.runTemplateResult.jsonResult.replace(/(\r\n|\n|\r)/gm, ""))
    const showTestResult = object && object["objectType"] == "field" && runTemplateResult && runTemplateResult.objects && this.props.testFieldResultId == object.id
    if (object) {
      if (object["objectType"] == "field" && object["fieldProperties"]["fieldType"] == "rectangle") {
        optionsComponent = <RectangleFieldOptions {...this.props} />
      } else if (object["objectType"] == "field" && object["fieldProperties"]["fieldType"] == "static") {
        optionsComponent = <StaticValueFieldOptions {...this.props} />
      } else if (object["objectType"] == "field" && object["fieldProperties"]["fieldType"] == "macros") {
        optionsComponent = <TextSearchFieldOptions {...this.props} />
      } else if (object["objectType"] == "table" && !this.rectangleTable(object)) {
        optionsComponent = <SearchBasedTableOptions {...this.props} />
      } else if (object["objectType"] == "table" && this.rectangleTable(object)) {
        optionsComponent = <RectangleTableOptions {...this.props} />
      } else if (object["objectType"] == "field" && object["fieldProperties"]["fieldType"] == "structure") {
        optionsComponent = <GridCellFieldOptions {...this.props} />
      }
    }



    return (
      <div className="object-options ta-left">
        <h5>Selected Object Properties:</h5>
        {optionsComponent}
        <div className="row">
          <div className="col-lg-12 mB-10">
            <button disabled={this.props.isRunningTemplate} className={buttonsClassesDanger} onClick={e => this.handleRunTestObject(object.id, object.objectType)}>{this.props.isRunningTemplate ? 'Testing...' : 'Test Object'}</button>
          </div>
        </div>
        {
          showTestResult &&
          <textarea disabled rows="10" id="objectTestResult" className="form-control mB-10 bg-warning" value={runTemplateResult.objects[0].value}></textarea>
        }
      </div>
    );
  }
}

import React from 'react'
import ReactDOM from "react-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Modal, Button, Tabs, Tab } from 'react-bootstrap'

import RunTemplateResultGrid from './elements/RunTemplateResultGrid'

import classNames from 'classnames'

import { closeAllWindows } from './actions'

import styles from './windows.css'

class RunTemplateResult extends React.Component {
  render() {
    const extractedText = this.props.runTemplateResult.documentText && this.props.runTemplateResult.documentText.replace(/(\r\n|\n|\r)/gm, "<br>")
    const parsingLog    = JSON.stringify(this.props.runTemplateResult.parsingLog, null, 2)
    const jsonResult    = this.props.runTemplateResult.jsonResult && JSON.parse(this.props.runTemplateResult.jsonResult.replace(/(\r\n|\n|\r)/gm, ""))
    const yamlResult    = this.props.runTemplateResult.yamlResult && this.props.runTemplateResult.yamlResult.replace(/(\r\n|\n|\r)/gm, "<br>")
    const csvResult     = this.props.runTemplateResult.csvResult && this.props.runTemplateResult.csvResult.replace(/(\r\n|\n|\r)/gm, "<br>")

    console.log("this.props.runTemplateResult.xmlResult", this.props.runTemplateResult.xmlResult)

    return (
      <div id="run-template-result-window" className="collapsible-window bg-warning">
        <div className="collapsible-window-header">
          Output Results Extracted Using Your Template
          <button onClick={this.props.closeAllWindows} className="close text-danger">[Close Results]</button>
        </div>
        <div className="collapsible-window-body">
          <Tabs defaultActiveKey="parsing-result" id="run-template-result">
            <Tab eventKey="parsing-result" title="Parser Results">
              <Tabs defaultActiveKey="result-grid" id="run-template-formats">
                <Tab eventKey="result-grid" title="Grids">
                  <div className="container-fluid text-left">
                    <div className="row">
                      <div className="col-lg-12 text-left">
                        <div className="code mT-20">
                          {jsonResult && <RunTemplateResultGrid objects={jsonResult["objects"]} />}
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="result-json" title="JSON">
                  <div className="container-fluid text-left">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="code mT-20">
                          <textarea className="form-control" name="" id="" rows="30" value={JSON.stringify(jsonResult, null, 2)} disabled></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="result-xml" title="XML">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="code mT-20">
                          <textarea className="form-control" name="" id="" rows="30" value={this.props.runTemplateResult.xmlResult} disabled></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="result-yaml" title="YAML">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="code mT-20">
                          <textarea className="form-control" name="" id="" rows="30" value={this.props.runTemplateResult.yamlResult} disabled></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="result-csv" title="CSV">
                  <div className="container-fluid text-left form-control">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="code mT-20" dangerouslySetInnerHTML={{__html: csvResult}}>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </Tab>
            <Tab eventKey="extracted-document-text" title="Extracted as Plain Text">
              <div className="container-fluid text-left form-control">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="code mT-20" dangerouslySetInnerHTML={{__html: extractedText}}>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="template-code" title="Template Code">
              <div className="container-fluid text-left">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="code mT-20">
                      <textarea className="form-control" name="" id="" rows="30" value={JSON.stringify(this.props.template, null, 2)} disabled></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="parsing-log" title="Parsing Log">
              <div className="container-fluid text-left form-control">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="code mT-20" dangerouslySetInnerHTML={{__html: parsingLog}}>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    runTemplateResult: state.pdfViewer.runTemplateResult,
    template: state.template
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    closeAllWindows
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RunTemplateResult)

import React from 'react'
import ReactDOM from "react-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Modal, Button, Tabs, Tab } from 'react-bootstrap'

import { closeAllModals } from './actions'

import RunTemplateResultGrid from './elements/RunTemplateResultGrid'

class RunTemplateResultModal extends React.Component {
  render() {
    const extractedText = this.props.runTemplateResult.documentText && this.props.runTemplateResult.documentText.replace(/(\r\n|\n|\r)/gm, "<br>")
    const parsingLog    = JSON.stringify(this.props.runTemplateResult.parsingLog, null, 2)
    const jsonResult    = this.props.runTemplateResult.jsonResult && JSON.parse(this.props.runTemplateResult.jsonResult.replace(/(\r\n|\n|\r)/gm, ""))
    const yamlResult    = this.props.runTemplateResult.yamlResult && this.props.runTemplateResult.yamlResult.replace(/(\r\n|\n|\r)/gm, "<br>")
    const csvResult     = this.props.runTemplateResult.csvResult && this.props.runTemplateResult.csvResult.replace(/(\r\n|\n|\r)/gm, "<br>")

    return (
      <Modal show={this.props.runTemplateResultModalOpened} onHide={this.props.closeAllModals} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Testing template</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey="parsing-result" id="run-template-result">
            <Tab eventKey="parsing-result" title="Parsing result">
              <Tabs defaultActiveKey="result-grid" id="run-template-formats">
                <Tab eventKey="result-grid" title="Grids">
                  <div className="container-fluid">
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
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="code mT-20">
                          <textarea className="form-control" name="" id="" rows="30" value={JSON.stringify(jsonResult, null, 2)} disabled></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="result-xml" title="XML"><div className="container-fluid">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="code mT-20">
                          <textarea className="form-control" name="" id="" rows="30" value={this.props.runTemplateResult.xmlResult} disabled></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="result-yaml" title="YAML"><div className="container-fluid">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="code mT-20">
                          <textarea className="form-control" name="" id="" rows="30" value={this.props.runTemplateResult.yamlResult} disabled></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="result-csv" title="CSV"><div className="container-fluid">
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
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="code mT-20" dangerouslySetInnerHTML={{__html: extractedText}}>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="template-code" title="Template code">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="code mT-20">
                      <textarea className="form-control" name="" id="" rows="30" value={JSON.stringify(this.props.template, null, 2)} disabled></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="parsing-log" title="Parsing log">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="code mT-20" dangerouslySetInnerHTML={{__html: parsingLog}}>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.closeAllModals}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    runTemplateResultModalOpened: state.modals.runTemplateResultModalOpened,
    runTemplateResult: state.pdfViewer.runTemplateResult,
    template: state.template
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    closeAllModals
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RunTemplateResultModal)

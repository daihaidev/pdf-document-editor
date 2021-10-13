import React from 'react'
import ReactDOM from "react-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Modal, Button, Tabs, Tab } from 'react-bootstrap'

import { closeAllModals } from './actions'

import RunObjectResultGrid from './elements/RunObjectResultGrid'

class RunTemplateWithOneObjectResultModal extends React.Component {
  render() {
    const extractedText = this.props.runTemplateResult.documentText && this.props.runTemplateResult.documentText.replace(/(\r\n|\n|\r)/gm, "<br>")
    const jsonResult    = this.props.runTemplateResult.jsonResult && JSON.parse(this.props.runTemplateResult.jsonResult.replace(/(\r\n|\n|\r)/gm, ""))
    const yamlResult    = this.props.runTemplateResult.yamlResult && this.props.runTemplateResult.yamlResult.replace(/(\r\n|\n|\r)/gm, "<br>")
    const csvResult     = this.props.runTemplateResult.csvResult && this.props.runTemplateResult.csvResult.replace(/(\r\n|\n|\r)/gm, "<br>")

    return (
      <Modal show={this.props.runTemplateWithOneObjectResultModalOpened} onHide={this.props.closeAllModals} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Testing "{jsonResult && jsonResult["objects"][0] && jsonResult["objects"][0]["name"]}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="code mT-20">
                  {jsonResult && <RunObjectResultGrid objects={jsonResult["objects"]} />}
                </div>
              </div>
            </div>
          </div>
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
    runTemplateWithOneObjectResultModalOpened: state.modals.runTemplateWithOneObjectResultModalOpened,
    runTemplateResult: state.pdfViewer.runTemplateResult,
    template: state.template
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    closeAllModals
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RunTemplateWithOneObjectResultModal)

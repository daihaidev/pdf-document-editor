import React from 'react'
import ReactDOM from "react-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Modal, Button } from 'react-bootstrap'

import { closeAllModals } from './actions'
import { setTemplate, updateTemplate, createTemplate } from '../template/actions'

import {CopyToClipboard} from 'react-copy-to-clipboard';

import { convertTemplateCode, templateToJSON, templateToYaml } from '../template/converters'
import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';

class EditTemplateModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      templateCode: undefined,
      syntaxError: false,
      syntaxErrorMessage: '',
      copied: false
    }
  }

  handleOpenShow = (e) => {
    this.setState({
      templateCode: JSON.stringify(this.props.template, null, 2),
      copied: false
    })
  }

  handleChangeCode = (e) => {
    this.setState({
      templateCode: e.target.value,
      copied: false
    })
  }

  handleSaveCode = (e) => {
    try {
      const jsonTemplate = convertTemplateCode(this.state.templateCode)
      this.props.setTemplate(jsonTemplate)
      this.setState({
        syntaxError: false,
        syntaxErrorMessage: "",
        copied: false        
      })
      this.props.closeAllModals()
    } catch (err) {
      this.setState({
        syntaxError: true,
        syntaxErrorMessage: err,
        copied: false
      })
    }
  }

  render() {
    var exportToPdfButton = null;

    if (process.env.REACT_APP_DOCPARSER_TEMPLATE_EDITOR_EMBEDDED != 1) {
      exportToPdfButton = <CopyToClipboard format="text/html" text={templateToJSON(convertTemplateCode(this.state.templateCode))} onCopy={() => this.setState({copied: true})}>
        <Button variant="primary">Export To PDF.co</Button>
      </CopyToClipboard>
    }

    return (
      <Modal show={this.props.editTemplateModalOpened} onShow={this.handleOpenShow} onHide={this.props.closeAllModals} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit or Export Template</Modal.Title>
          
        </Modal.Header>
        <Modal.Body>
          <span><small>edit or paste your template code, click Update to load template into visual editor</small></span>
          <textarea className="form-control" name="" id="" cols="30" rows="10" value={this.state.templateCode} onChange={this.handleChangeCode}>

          </textarea>
        </Modal.Body>
        <Modal.Footer>
          {
            this.state.syntaxError &&
            <span className="text-danger mR-10">
              Sorry, syntax error in the template code: {this.syntaxErrorMessage}
            </span>
          }
          {this.state.copied && !this.state.syntaxError ? <span style={{color: 'red'}}>Templated was copied to the clipboard! Now please paste from clipboard into your PDF.co template code</span> : null}          

          { exportToPdfButton }

          <Button variant="primary" onClick={this.handleSaveCode}>
            Update
          </Button>

          <Button variant="secondary" onClick={this.props.closeAllModals}>
            Discard
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    editTemplateModalOpened: state.modals.editTemplateModalOpened,
    template: state.template
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    closeAllModals,
    setTemplate,
    updateTemplate,
    createTemplate
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTemplateModal)

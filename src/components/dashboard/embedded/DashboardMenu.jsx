import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faSave, faUpload, faFilePdf, faPlay, faHourglass, faLifeRing } from '@fortawesome/free-solid-svg-icons'
import { convertTemplateCode } from '../../template/converters'
import { updateTemplate, createTemplate } from '../../template/actions'
import { Dropdown } from 'react-bootstrap'
import { SampleTemplateOptions } from '../../../constants/templateConsts'

class DashboardMenu extends React.Component {
  handleUploadClick = (e) => {
    this.uploadRef.click()
  }

  handleUploadTemplateClick = (e) => {
    if (!this.props.isTemplateModified || window.confirm("Are you sure you want to discard the current template?")) {
      this.uploadTemplateRef.click()
    }
  }

  handleSaveClick = (redirectAfterSave = false) => {
    try {
      const jsonTemplate = convertTemplateCode(this.props.template)
      if (this.props.templateId == null) {
        this.props.createTemplate(jsonTemplate, redirectAfterSave)
      } else {
        this.props.updateTemplate(this.props.templateId, jsonTemplate, redirectAfterSave)
      }
    } catch (err) {
      this.setState({
        syntaxError: true,
        syntaxErrorMessage: err,
        copied: false
      })
    }
  }

  handleSaveExitClick = () => {
    this.props.disableUnloadAlert()
    this.handleSaveClick(true)
  }

  handleDiscardChangesClick = () => {
    if (!this.props.isTemplateModified || window.confirm("Are you sure you want to discard all changes in the current template?")) {
      this.props.disableUnloadAlert()
      window.location.assign(process.env.REACT_APP_DOCPARSER_TEMPLATE_EDITOR_UPDATE_TEMPLATE_REDIRECT)
    }
  }

  handleClickLoadSample = (option) => {
    if (window.confirm("Are you sure you want to discard all changes in the current template?")) {
      this.props.handleLoadSampleTemplate(option)
    }
  }

  handleClickRunTemplate = () => {
    if (this.props.isCustomFile) {
      this.props.handleRunTemplate()
    }
    else {
      if (window.confirm("No PDF file is loaded for testing. Do you want to load PDF file now?")) {
        this.uploadRef.click()
      }
    }
  }

  render() {
    return (
      <div className="input-group mb-3 dashboard-menu pT-10 pB-10">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 ta-left">

              <Dropdown className="mR-10" drop="down" menuAlign="right">
                <Dropdown.Toggle variant="success" id="dropdown-basic" disabled={this.props.isRunningTemplate}>
                  <FontAwesomeIcon icon={faLifeRing} />&nbsp;
                  Sample Templates
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {SampleTemplateOptions.map(option => (
                    <Dropdown.Item onClick={e => this.handleClickLoadSample(option)} key={option.label}>{option.label}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              <button disabled={this.props.isRunningTemplate} className="btn btn-outline-secondary mR-10" data-toggle="tooltip" data-placement="bottom" title="Load test PDF document that you will use to test your template" onClick={this.handleUploadClick}>
                <FontAwesomeIcon icon={faFilePdf} /> Load Test PDF or Image
              </button>

              <button disabled={!this.props.fileUploaded || this.props.isRunningTemplate} className="btn btn-info mR-10" data-toggle="tooltip" data-placement="bottom" title="Edit template" onClick={this.props.handleEditClick}>
                <FontAwesomeIcon icon={faSave} /> Edit Template
              </button>

              <button disabled={!this.props.fileUploaded || this.props.isRunningTemplate} className="btn btn-success mR-10" data-toggle="tooltip" data-placement="bottom" title="Save template" onClick={this.handleSaveClick}>
                <FontAwesomeIcon icon={faSave} /> Save Template
              </button>

              <button disabled={!this.props.fileUploaded || this.props.isRunningTemplate} className="btn btn-success mR-10" data-toggle="tooltip" data-placement="bottom" title="Save template" onClick={this.handleSaveExitClick}>
                <FontAwesomeIcon icon={faSave} /> Save Template and Return
              </button>

              <button disabled={!this.props.fileUploaded || this.props.isRunningTemplate} className="btn btn-danger mR-10" data-toggle="tooltip" data-placement="bottom" title="Discard template changes" onClick={this.handleDiscardChangesClick}>
                <FontAwesomeIcon icon={faSave} /> Discard and Return
              </button>

              <button disabled={this.props.isRunningTemplate} className="btn btn-outline-success mR-10" data-toggle="tooltip" data-placement="bottom" title="Run template" onClick={this.handleClickRunTemplate}>
                {this.props.isRunningTemplate ? <FontAwesomeIcon icon={faHourglass} /> : <FontAwesomeIcon icon={faPlay} />} Run Template
              </button>

            </div>
          </div>
        </div>

        <div className="custom-file hidden">
          <input ref={(ref) => this.uploadRef = ref} type="file" className="form-control" accept="application/pdf,image/jpeg,image/png,image/tiff" id="uploadPdf" onChange={(e) => this.props.handleFileUploaded(e.target.files)} />
          <label className="custom-file-label ta-left" htmlFor="uploadPdf">{this.props.fileName}</label>
        </div>

      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    template: state.template,
    templateId: state.templateId
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateTemplate,
    createTemplate
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardMenu)

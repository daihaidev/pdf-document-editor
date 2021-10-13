import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faFilePdf, faMagic, faSave, faUpload, faCog, faEdit, faPlay, faHourglass, faLifeRing } from '@fortawesome/free-solid-svg-icons'
import { Dropdown } from 'react-bootstrap'
import { SampleTemplateOptions } from '../../constants/templateConsts'

export default class DashboardMenu extends React.Component {
  handleUploadClick = (e) => {
    this.uploadRef.click()
  }

  handleUploadTemplateClick = (e) => {
    if (!this.props.isTemplateModified || window.confirm("Are you sure you want to discard the current template?")) {
      this.uploadTemplateRef.click()
    }
  }

  handleSaveClick = (e) => {
    var a = document.createElement("a");
    var file = new Blob([JSON.stringify(this.props.template, null, 2)], { type: "application/json" });
    a.href = URL.createObjectURL(file);
    a.download = this.props.templateName || "template.json";
    a.click();
    this.props.setIsTemplateModified(false)
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
                  Load Sample Template
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {SampleTemplateOptions.map(option => (
                    <Dropdown.Item onClick={e => this.handleClickLoadSample(option)} key={option.label}>{option.label}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>


              <button disabled={this.props.isRunningTemplate} className="btn btn-outline-secondary mR-10" data-toggle="tooltip" data-placement="bottom" title="Load test PDF document that you will use to test your template" onClick={this.handleUploadClick}>
                <FontAwesomeIcon icon={faFilePdf} /> Load Source PDF or Image
              </button>

              <button disabled={this.props.isRunningTemplate} className="btn btn-primary mR-10" data-toggle="tooltip" data-placement="bottom" title="New template" onClick={this.props.resetTemplate}>
                <FontAwesomeIcon icon={faFile} /> New Template
              </button>

              <button disabled={!this.props.fileUploaded || this.props.isRunningTemplate} className="btn btn-info mR-10" data-toggle="tooltip" data-placement="bottom" title="Load template" onClick={this.handleUploadTemplateClick}>
                <FontAwesomeIcon icon={faUpload} /> Load Template From File
              </button>

              <button disabled={!this.props.fileUploaded || this.props.isRunningTemplate} className="btn btn-success mR-10" data-toggle="tooltip" data-placement="bottom" title="Save template" onClick={this.handleSaveClick}>
                <FontAwesomeIcon icon={faSave} /> Save Template To File
              </button>

              <button disabled={!this.props.fileUploaded || this.props.isRunningTemplate} className="btn btn-info mR-10" data-toggle="tooltip" data-placement="bottom" title="Load template" onClick={this.props.handleEditClick}>
                <FontAwesomeIcon icon={faUpload} /> Load Template From Clipboard
              </button>

              <button disabled={!this.props.fileUploaded || this.props.isRunningTemplate} className="btn btn-success mR-10" data-toggle="tooltip" data-placement="bottom" title="Save template" onClick={this.props.handleEditClick}>
                <FontAwesomeIcon icon={faSave} /> Edit & Export Template
              </button>

              {/*
              <button disabled={!this.props.fileUploaded || this.props.isRunningTemplate} className="btn btn-outline-dark mR-10" data-toggle="tooltip" data-placement="bottom" title="Manually edit source code of the template" onClick={this.props.handleEditClick}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
*/}

              <button disabled={this.props.isRunningTemplate} className="btn btn-danger mR-10" data-toggle="tooltip" data-placement="bottom" title="Run template" onClick={this.handleClickRunTemplate}>
                {this.props.isRunningTemplate ? <FontAwesomeIcon icon={faHourglass} /> : <FontAwesomeIcon icon={faPlay} />} Run Template
              </button>
            </div>
          </div>
        </div>

        <div className="custom-file hidden">
          <input ref={(ref) => this.uploadRef = ref} type="file" className="form-control" accept="application/pdf,image/jpeg,image/png,image/tiff" id="uploadPdf" onChange={(e) => this.props.handleFileUploaded(e.target.files)} />
          <label className="custom-file-label ta-left" htmlFor="uploadPdf">{this.props.fileName}</label>
        </div>

        <div className="custom-file hidden">
          <input ref={(ref) => this.uploadTemplateRef = ref} type="file" className="form-control" accept=".json,.yml" id="uploadTemplate" onChange={(e) => this.props.handleTemplateUploaded(e)} />
        </div>


      </div>

    );
  }
}

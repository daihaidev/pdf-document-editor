import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faPlus, faTrash, faFile, faMagic, faUndo } from '@fortawesome/free-solid-svg-icons'
import { animateScroll } from "react-scroll"
import classNames from 'classnames'
import { Dropdown } from 'react-bootstrap'
import { isEqual } from 'lodash'


import styles from './dashboard.css'
import ObjectsList from './ObjectsList.jsx'
import ObjectOptions from './ObjectOptions.jsx'
import DashboardMenu from './DashboardMenu.jsx'
import DashboardMenuEmbedded from './embedded/DashboardMenu'

import { yamlToTemplate, convertTemplateToNewerVersion } from '../template/converters'
import Endpoints from '../../api/methods'

import { setPdfFile, convertToPdf, setPdfUrl, detectMacro, detectFields, detectGridStructure, setTestFieldResultId, uploadFileFromUrl } from './actions.jsx'
import { setActiveObject, resetPdfFileAndUrl, runTemplate, runTemplateWithOneObject, setIsCustomFile, setPdfFileName, uploadSampleDocumentFromUrl } from '../pdfViewer/actions.jsx'
import {
  changeObjectName,
  changeTemplateName,
  changeObjectDataType,
  changeObjectExpression,
  changeObjectCoalescingObject,
  changeObjectDateFormat,
  addDefaultRectangleField,
  changeTableRowMergingRule,
  addDefaultStaticField,
  addDefaultTextSearchField,
  addDefaultSearchBasedTable,
  changeSearchBasedTableProperties,
  addDefaultGridCellField,
  changeGridCellFieldColumn,
  changeGridCellFieldRow,
  setTemplate,
  deleteObject,
  resetTemplate,
  setRegexStatusToObject,
  addDefaultRectangleTable,
  undoObjectChanges
} from '../template/actions.jsx'
import { openTemplateSettingsModal, openEditTemplateModal, openMacrosModal } from '../modals/actions'
import { openRunTemplateResultWindow, openRunObjectResultWindow } from '../windows/actions'
import { setIsTemplateModified, setTemplateFileName } from '../editor/actions'
import { getBase64 } from '../../utils/base64.jsx'
import { getBlankPdf } from '../../constants/blankPdf'
class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    props.setPdfFile(getBlankPdf())

    this.state = {
      fileName: "Choose file",
      fileUploaded: true
    }
  }

  handleFileUploaded = (files) => {
    if (files && files.length) {
      const { convertToPdf, setPdfUrl, setPdfFile, resetPdfFileAndUrl, setIsCustomFile, setPdfFileName } = this.props

      this.setState({
        fileName: "Choose file", fileUploaded: false
      })
      resetPdfFileAndUrl()

      setPdfFileName(files[0].name)

      if (files[0].name.split('.').pop() === 'pdf') {
        getBase64(files[0], (result) => {
          setPdfFile(result)
          setIsCustomFile(true)

          this.setState({
            fileName: files[0].name, fileUploaded: true
          })
        })
      } else if (['jpg', 'jpeg', 'bmp', 'tif', 'tiff'].includes(files[0].name.split('.').pop())) {
        convertToPdf(files[0], url => {
          setPdfUrl(url)
          setIsCustomFile(true)

          this.setState({
            fileName: files[0].name, fileUploaded: true
          })
        })
      }
    }

  }

  handleTemplateUploaded = (e) => {
    const files = e.target.files
    var self = this
    var fr = new FileReader();
    const extension = files[0].name.split('.').pop()

    this.props.setTemplateFileName(files[0].name)

    fr.onload = function (e) {
      if (extension == 'json') {
        var result = JSON.parse(e.target.result)
      } else if (extension == 'yml') {
        var result = yamlToTemplate(e.target.result)
      }

      if (parseInt(result.templateVersion) < 4) {
        Endpoints.convertTemplateToNewerVersion(result)
          .then(result => {
            setTemplate(result.template)
          })
          .catch(err => {
            alert("Template version is too old, error converting to newer version")
          })
      } else {
        setTemplate(result)
      }
    }

    fr.readAsText(files.item(0));

    e.target.value = ""

    function setTemplate(template) {
      try {
        self.setTemplateByJson(template)
      } catch (e) {
        console.log(e, "Template error")
        alert("Template error")
      }
    }
  }

  /**
   * loads sample template from the templateUrl and loads pdf from the file
   * @param  sampleTemplate : selected sample template data from the dropdown
   */

  handleLoadSampleTemplate = async (sampleTemplate) => {
    const { setPdfUrl, resetPdfFileAndUrl, setIsCustomFile, setPdfFileName, uploadFileFromUrl, uploadSampleDocumentFromUrl } = this.props
    var self = this
    const extension = sampleTemplate.templateUrl.split('.').pop();
    this.props.setTemplateFileName(sampleTemplate.label);

    uploadFileFromUrl(sampleTemplate.templateUrl, async url => {
      const templateData = await Endpoints.getSampleTemplate(url)

      if (extension == 'json') {
        var result = JSON.parse(templateData.data)
      } else if (extension == 'yml') {
        var result = yamlToTemplate(templateData.data)
      }

      if (parseInt(result.templateVersion) < 4) {
        Endpoints.convertTemplateToNewerVersion(result)
          .then(data => {
            setTemplate(data.template)
          })
          .catch(err => {
            alert("Template version is too old, error converting to newer version")
          })
      } else {
        setTemplate(result)
      }
    })

    this.setState({
      fileUploaded: false
    })
    resetPdfFileAndUrl()
    setPdfFileName(sampleTemplate.label)

    uploadSampleDocumentFromUrl(sampleTemplate.testDocumentUrl, url => {
      setPdfUrl(url)
      setIsCustomFile(true)

      this.setState({
        fileUploaded: true
      })
    })

    setIsCustomFile(true)

    function setTemplate(template) {
      try {
        self.setTemplateByJson(template)
      } catch (e) {
        console.log(e, "Template error")
        alert("Template error")
      }
    }
  }

  setTemplateByJson = (result) => {
    const { setTemplate } = this.props

    result.objects = result.objects.map((obj, i) => {
      return {
        ...obj,
        id: i
      }
    })
    result.culture = result.culture || "en-US"
    result.options = result.options || {}
    result.options.ocrMode = result.options.ocrMode || "auto"
    result.options.ocrLanguage = result.options.ocrLanguage || "eng"

    setTemplate(result)
  }

  handleUploadClick = (e) => {
    this.uploadRef.click()
  }

  runTemplate = (e) => {
    this.props.runTemplate(this.props.openRunTemplateResultWindow)
  }

  runTemplateWithOneObject = (id, type) => {
    const { openRunObjectResultWindow, setTestFieldResultId } = this.props

    this.props.runTemplateWithOneObject(id, () => {
      if (type == "field") {
        setTestFieldResultId(id)
      } else {
        openRunObjectResultWindow()
      }

      animateScroll.scrollToBottom({
        containerId: "dashboard",
        duration: 50
      })
    })
  }

  resetTemplate = () => {
    if (!this.props.isTemplateModified || window.confirm("Are you sure?")) {
      this.props.resetTemplate()
    }
  }

  addObject = (type) => {
    if (type == "placeholder") {
      return
    }

    switch (type) {
      case "rectangle-field":
        return this.props.addDefaultRectangleField(this.props.page - 1, (id) => {
          this.props.setActiveObject(id)
        })
      case "rectangle-table":
        return this.props.addDefaultRectangleTable(this.props.page - 1, (id) => {
          this.props.setActiveObject(id)
        })
      case "static-field":
        return this.props.addDefaultStaticField(this.props.page - 1, (id) => {
          this.props.setActiveObject(id)
        })
      case "text-search-field":
        return this.props.addDefaultTextSearchField((id) => {
          this.props.setActiveObject(id)
        })
      case "search-based-table":
        return this.props.addDefaultSearchBasedTable((id) => {
          this.props.setActiveObject(id)
        })
      case "grid-cell-field":
        return this.props.addDefaultGridCellField(this.props.page - 1, (id) => {
          this.props.setActiveObject(id)
        })
    }
  }

  handleDeleteConfirm = (e) => {
    if (window.confirm("Are you sure?")) {
      this.props.deleteObject(this.props.activeObjectId)
    }
  }

  handleUploadPdf = () => {
    if (process.env.REACT_APP_DOCPARSER_TEMPLATE_EDITOR_EMBEDDED == 1) {
      this.embeddedMenuRef.handleUploadClick()
    }
    else {
      this.menuRef.handleUploadClick()
    }
  }

  handleClickUndo = () => {
    this.props.undoObjectChanges()
  }

  render() {
    var dashboardMenu = null
    const activeObject = this.props.objects && this.props.objects.length ? this.props.objects.find(obj => {
      return obj["id"] == this.props.activeObjectId
    }) : undefined

    const templateNameClassNames = classNames("form-group row", { hidden: !this.state.fileUploaded })

    const undoable = !isEqual(this.props.objects, this.props.oldObjects)

    console.log("undoable, objects, oldObjects", undoable, this.props.objects, this.props.oldObjects)

    if (process.env.REACT_APP_DOCPARSER_TEMPLATE_EDITOR_EMBEDDED == 1) {
      //console.log(`loading embedded menu`);

      dashboardMenu = <DashboardMenuEmbedded
        handleFileUploaded={this.handleFileUploaded}
        template={this.props.template}
        templateName={this.props.templateName}
        fileUploaded={this.state.fileUploaded}
        handleTemplateUploaded={this.handleTemplateUploaded}
        handleLoadSampleTemplate={this.handleLoadSampleTemplate}
        handleEditClick={this.props.openEditTemplateModal}
        resetTemplate={this.resetTemplate}
        handleRunTemplate={this.runTemplate}
        isRunningTemplate={this.props.isRunningTemplate}
        isCustomFile={this.props.isCustomFile}
        setIsTemplateModified={this.props.setIsTemplateModified}
        isTemplateModified={this.props.isTemplateModified}
        disableUnloadAlert={this.props.disableUnloadAlert}
        ref={(ref) => this.embeddedMenuRef = ref}
      />
    } else {
      //console.log(`loading non-embedded menu`);

      dashboardMenu = <DashboardMenu
        handleFileUploaded={this.handleFileUploaded}
        template={this.props.template}
        templateName={this.props.templateName}
        fileUploaded={this.state.fileUploaded}
        handleTemplateUploaded={this.handleTemplateUploaded}
        handleLoadSampleTemplate={this.handleLoadSampleTemplate}
        handleEditClick={this.props.openEditTemplateModal}
        resetTemplate={this.resetTemplate}
        handleRunTemplate={this.runTemplate}
        isRunningTemplate={this.props.isRunningTemplate}
        isCustomFile={this.props.isCustomFile}
        setIsTemplateModified={this.props.setIsTemplateModified}
        isTemplateModified={this.props.isTemplateModified}
        ref={(ref) => this.menuRef = ref}
      />
    }

    return (
      <div className="container dashboard" id="dashboard">
        <div className="row">
          <div className="col-lg-12 pl-0">
            {dashboardMenu}
            <div className="form-group row mT-30 ta-left">
              <div className="col-lg-12">
                <div
                  disabled={this.props.isRunningTemplate || !this.props.isCustomFile || this.props.detectingFields}
                  className="d-flex justify-content-between"
                >
                  <div>
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <FontAwesomeIcon icon={faPlus} /> Add Object
                    </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={e => this.addObject("rectangle-field")}>FIELD from Rectangle</Dropdown.Item>
                        <Dropdown.Item onClick={e => this.addObject("rectangle-table")}>TABLE from Rectangle</Dropdown.Item>
                        <Dropdown.Item onClick={e => this.addObject("static-field")}>STATIC value </Dropdown.Item>
                        <Dropdown.Item onClick={e => this.addObject("grid-cell-field")}>CELL from virtual grid</Dropdown.Item>
                        <Dropdown.Item onClick={e => this.addObject("text-search-field")}>FIELD based on search</Dropdown.Item>
                        <Dropdown.Item onClick={e => this.addObject("search-based-table")}>TABLE based on search</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    {/*
                  <button
                    disabled={this.props.isRunningTemplate || this.props.detectingFields}
                    className="btn btn-danger mL-10" data-toggle="tooltip" data-placement="bottom" title="Delete object" onClick={this.handleDeleteConfirm}>
                    <FontAwesomeIcon icon={faTrash} /> Delete Object
                  </button>
*/}

                    <button disabled={this.props.isRunningTemplate || this.props.detectingFields}
                      className="btn btn-outline-primary mL-10"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Detect Objects.."
                      onClick={this.props.detectFields}>
                      <FontAwesomeIcon icon={faMagic} /> {this.props.detectingFields ? 'Detecting...' : 'Detect Objects..'}
                    </button>
                  </div>
                  <button onClick={this.handleClickUndo} className="btn btn-primary" disabled={!undoable}><FontAwesomeIcon icon={faUndo} /> Undo</button>
                </div>
              </div>
            </div>

            {this.state.fileUploaded && <hr />}

            <div className={templateNameClassNames}>
              <label htmlFor="templateNameField" className="col-sm-5 col-form-label">Template Name</label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  id="templateNameField"
                  placeholder="Template Name"
                  value={this.props.templateName}
                  onChange={(e) => this.props.changeTemplateName(e.target.value)}
                />
              </div>
              <div className="col-sm-4"></div>
              <div className="col-sm-8">
                <button disabled={!this.state.fileUploaded} onClick={this.props.openTemplateSettingsModal} className="btn btn-outline-primary pull-right mT-10" data-toggle="tooltip" data-placement="bottom" title="Template options" data-toggle="modal" data-target="#templateSettingsModal">
                  Template options...
                </button>
              </div>
            </div>

            <ObjectsList
              activeObjectId={this.props.activeObjectId}
              setActiveObject={this.props.setActiveObject}
              objects={this.props.objects}
              tabindex="0"
              deleteObject={this.props.deleteObject}
            />

            <ObjectOptions
              object={activeObject}
              objects={this.props.objects}
              changeObjectName={this.props.changeObjectName}
              changeObjectDataType={this.props.changeObjectDataType}
              changeObjectExpression={this.props.changeObjectExpression}
              changeObjectDateFormat={this.props.changeObjectDateFormat}
              changeObjectCoalescingObject={this.props.changeObjectCoalescingObject}
              changeTableRowMergingRule={this.props.changeTableRowMergingRule}
              changeSearchBasedTableProperties={this.props.changeSearchBasedTableProperties}
              changeGridCellFieldColumn={this.props.changeGridCellFieldColumn}
              changeGridCellFieldRow={this.props.changeGridCellFieldRow}
              openMacrosModal={this.props.openMacrosModal}
              setRegexStatusToObject={this.props.setRegexStatusToObject}
              handleRunTemplate={this.runTemplate}
              isRunningTemplate={this.props.isRunningTemplate}
              runTemplateWithOneObject={this.runTemplateWithOneObject}
              isCustomFile={this.props.isCustomFile}
              detectMacro={this.props.detectMacro}
              detectingMacro={this.props.detectingMacro}
              detectingFields={this.props.detectingFields}
              detectGridStructure={this.props.detectGridStructure}
              runTemplateResult={this.props.runTemplateResult}
              testFieldResultId={this.props.testFieldResultId}
              handleUploadPdf={this.handleUploadPdf}
              handleEnterExpandArea={this.props.handleEnterExpandArea}
              handleLeaveExpandArea={this.props.handleLeaveExpandArea}
            />
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    objects: state.template.objects,
    oldObjects: state.template.oldObjects,
    activeObjectId: state.pdfViewer.activeObjectId,
    templateName: state.template.templateName,
    page: state.pdfViewer.page,
    template: state.template,
    isRunningTemplate: state.pdfViewer.isRunningTemplate,
    runTemplateResult: state.pdfViewer.runTemplateResult,
    isCustomFile: state.pdfViewer.isCustomFile,
    detectingMacro: state.pdfViewer.detectingMacro,
    detectingFields: state.pdfViewer.detectingFields,
    testFieldResultId: state.dashboard.testFieldResultId,
    isTemplateModified: state.editor.isTemplateModified
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setPdfFile,
    setActiveObject,
    changeObjectName,
    changeTemplateName,
    changeObjectDataType,
    changeObjectExpression,
    changeObjectDateFormat,
    changeObjectCoalescingObject,
    addDefaultRectangleField,
    addDefaultRectangleTable,
    addDefaultStaticField,
    changeTableRowMergingRule,
    addDefaultTextSearchField,
    addDefaultSearchBasedTable,
    addDefaultGridCellField,
    changeSearchBasedTableProperties,
    changeGridCellFieldColumn,
    changeGridCellFieldRow,
    setTemplate,
    deleteObject,
    openTemplateSettingsModal,
    convertToPdf,
    setPdfUrl,
    resetPdfFileAndUrl,
    openEditTemplateModal,
    openMacrosModal,
    setRegexStatusToObject,
    resetTemplate,
    runTemplate,
    runTemplateWithOneObject,
    openRunObjectResultWindow,
    setIsCustomFile,
    detectMacro,
    detectFields,
    detectGridStructure,
    openRunTemplateResultWindow,
    setTestFieldResultId,
    setIsTemplateModified,
    setPdfFileName,
    uploadFileFromUrl,
    uploadSampleDocumentFromUrl,
    setTemplateFileName,
    undoObjectChanges
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

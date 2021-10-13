import React from 'react'
import ReactDOM from "react-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import classNames from 'classnames'

import './pageLoader.css'

class PageLoader extends React.Component {
  render() {
    const {convertingToPdf, isRunningTemplate, detectingMacro, detectingFields, fileUploadingFromUrl} = this.props
    const pageLoaderClassNames = classNames({active: convertingToPdf || isRunningTemplate || detectingMacro || detectingFields || fileUploadingFromUrl})

    return (
      <div id="page-loader" className={pageLoaderClassNames}>
        <div class="lds-spinner"><div></div>
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    convertingToPdf: state.pdfViewer.convertingToPdf,
    isRunningTemplate: state.pdfViewer.isRunningTemplate,
    detectingMacro: state.pdfViewer.detectingMacro,
    detectingFields: state.pdfViewer.detectingFields,
    fileUploadingFromUrl: state.dashboard.fileUploadingFromUrl
  }
}

export default connect(mapStateToProps)(PageLoader)

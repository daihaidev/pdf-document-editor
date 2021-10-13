import React from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactResizeDetector from 'react-resize-detector'

import styles from './pdfViewer.css'

import PDFViewer from 'pdf-viewer-reactjs'
import { Document, Page } from 'react-pdf/dist/entry.webpack'

import PdfToolbar from './PdfToolbar'
import Editor from '../editor/Editor.jsx'
import { cors_api_host } from '../../api/methods'

export default class PdfViewer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 1,
      totalPages: 0,
      scale: 100
    }
  }

  changePage = (page) => {
    this.setState({
      page: page
    })
    this.setCurrentEditorPage(page)
  }

  handleDocumentLoadSuccess = (document) => {
    this.setState({
      totalPages: document.numPages
    })
  }

  handlePageLoadSuccess = (page) => {
    this.props.setCanvasCurrentPageOriginalDimensions(page.originalHeight, page.originalWidth, page._pageInfo.rotate)
    this.saveCanvasSizes()
  }

  setCurrentEditorPage = (page) => {
    if (page > 0 && page <= this.state.totalPages) {
      return this.props.setPdfPage(+page)
    }
    return this.props.setPdfPage(1)
  }

  setCurrentEditorScale = (scale) => {
    if (scale > 0) {
      return this.props.setPdfScale(scale / 100)
    }
    return this.props.setPdfScale(1)
  }

  resetPage = () => {
    if (this.props.currentEditorPage != +this.state.page) {
      this.changePage(1)
    }
  }

  resetZoom = () => {
    if (this.props.currentEditorScale != this.state.scale / 100) {
      this.changeZoom(100)
    }
  }

  changeZoom = (scale) => {
    this.setState({
      scale: scale
    }, () => {
      this.setCurrentEditorScale(scale)
    })
  }

  cursorPositionInPixels = (e) => {
    var bounds = e.target.getBoundingClientRect();
    var x = e.clientX - bounds.left;
    var y = e.clientY - bounds.top;
    return { x: x, y: y };
  }

  saveCanvasSizes = () => {
    if (!this.pageRef || !this.props.reactCursorPositionRef) return;
    const canvas = this.pageRef.querySelector('canvas')

    this.props.setCanvasMarginLeft(this.pageRef.offsetWidth > canvas.offsetWidth ? (this.pageRef.offsetWidth - canvas.offsetWidth) / 2 : 0)
    this.props.setCanvasDimensions(canvas.offsetHeight, canvas.offsetWidth)

    this.props.reactCursorPositionRef.reset()
  }

  getCursorPositionLeftInPdfUnits = () => {
    if (!this.props.position || !this.pageRef) return 0;

    let pixelPositionLeft = Math.abs(this.props.position.x - this.props.canvasMarginLeft + this.pageRef.parentElement.scrollLeft)
    return this.convertXToPdfUnits(pixelPositionLeft)
  }

  getCursorPositionTopInPdfUnits = () => {
    if (!this.props.position || !this.pageRef) return 0;

    let pixelPositionTop = Math.abs(this.props.position.y - 50 + this.pageRef.parentElement.scrollTop)
    return this.convertYToPdfUnits(pixelPositionTop)
  }

  convertYToPdfUnits = (pixelPosition) => {
    let baseCanvasLength = -1;
    // if we have 270 rotation then we change to use canvas width instead
    if (this.props.currentPageOriginalRotationAngle == 270 || this.props.currentPageOriginalRotationAngle == 90) {
      baseCanvasLength = this.props.canvasWidth;
    }
    else {
      baseCanvasLength = this.props.canvasHeight;
    }
    return Math.round(pixelPosition * this.props.currentPageOriginalHeight / baseCanvasLength)
  }

  convertXToPdfUnits = (pixelPosition) => {
    let baseCanvasLength = -1;
    // if we have 270 rotation then we change to use canvas height instead
    if (this.props.currentPageOriginalRotationAngle == 270 || this.props.currentPageOriginalRotationAngle == 90) {
      baseCanvasLength = this.props.canvasHeight;
    }
    else {
      baseCanvasLength = this.props.canvasWidth;
    }
    return Math.round(pixelPosition * this.props.currentPageOriginalWidth / baseCanvasLength)
  }


  render() {
    const height = window.innerHeight
    const editorPage = this.props.currentEditorPage
    const editorScale = this.props.currentEditorScale
    const cursorTopPdf = this.getCursorPositionTopInPdfUnits()
    const cursorLeftPdf = this.getCursorPositionLeftInPdfUnits()
    const file = this.props.pdfFile
    const url = this.props.pdfUrl;

    const pageWrapperWidth = this.pageRef ? this.pageRef.offsetWidth + this.pageRef.parentElement.scrollLeft : 0
    const pageWrapperHeight = this.pageRef ? this.pageRef.offsetHeight : 0

    return (
      <div>
        <ReactResizeDetector handleWidth handleHeight onResize={this.saveCanvasSizes} />
        <PdfToolbar
          currentPage={this.state.page}
          changePage={this.changePage}
          totalPages={this.state.totalPages}
          resetPage={this.resetPage}
          scale={this.state.scale}
          setZoom={this.changeZoom}
          resetZoom={this.resetZoom}
          cursorTopPdf={cursorTopPdf}
          cursorLeftPdf={cursorLeftPdf}
        />

        {
          this.props.convertingToPdf &&
          <div className="loader">Loading...</div>
        }
        <Document file={file || url} noData="" onLoadSuccess={this.handleDocumentLoadSuccess}>
          <Editor
            width={pageWrapperWidth}
            height={pageWrapperHeight}
            position={this.props.position}
            pageRef={this.pageRef}
            convertYToPdfUnits={this.convertYToPdfUnits}
            convertXToPdfUnits={this.convertXToPdfUnits}
          />
          <Page
            pageNumber={editorPage}
            scale={editorScale}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            height={height}
            onLoadSuccess={this.handlePageLoadSuccess}
            inputRef={ref => this.pageRef = ref}
            onRenderSuccess={this.saveCanvasSizes}
          />
        </Document>
      </div>
    );
  }
}

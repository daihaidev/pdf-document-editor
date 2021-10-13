import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faSearchPlus, faSearchMinus } from '@fortawesome/free-solid-svg-icons'
import CursorPosition from './CursorPosition'

export default class PdfToolbar extends React.Component {
  prevPage = () => {
    if (this.props.currentPage <= 1) return
    this.setPage(this.props.currentPage - 1)
  }

  nextPage = () => {
    if (this.props.currentPage + 1 > this.props.totalPages) return
    this.setPage(this.props.currentPage + 1)
  }

  setPage = (page) => {
    this.props.changePage(page)
  }

  zoomOut = () => {
    if (this.props.scale <= 10) return
    this.setZoom(this.props.scale - 10)
  }

  zoomIn = () => {
    this.setZoom(this.props.scale + 10)
  }

  setZoom = (zoom) => {
    this.props.setZoom(zoom)
  }

  render() {
    return (
      <div className="pdf-toolbar">
        <div className="d-inline-flex align-items-center mr-4">
          <button className="btn btn-link p-0 mr-2" onClick={this.prevPage}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <input
            className="form-control page-number"
            type="number"
            value={this.props.currentPage}
            onChange={e => this.setPage(e.target.value)}
            onBlur={this.props.resetPage}
          /> / {this.props.totalPages}
          <button className="btn btn-link p-0 ml-2" onClick={this.nextPage}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>

        <div className="d-inline-flex align-items-center mr-4">
          <button className="btn btn-link p-0 mr-2" onClick={this.zoomOut}>
            <FontAwesomeIcon icon={faSearchMinus} />
          </button>
          <input
            className="form-control zoom-value"
            type="number"
            value={this.props.scale}
            onChange={e => this.setZoom(e.target.value)}
            onBlur={this.props.resetZoom}
          />
          <button className="btn btn-link p-0 ml-2 mr-1" onClick={this.zoomIn}>
            <FontAwesomeIcon icon={faSearchPlus} />
          </button>
          <span>
            %
          </span>
        </div>

        <CursorPosition
          cursorLeftPdf={this.props.cursorLeftPdf}
          cursorTopPdf={this.props.cursorTopPdf}
        />
      </div>
    );
  }
}

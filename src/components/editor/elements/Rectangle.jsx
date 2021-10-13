import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classNames from 'classnames'

import { setActiveObject } from '../../pdfViewer/actions.jsx'
import { changeRectangleFieldCoordinates, changeRectangleFieldSizes, changeRectangleTableCoordinates, changeRectangleTableSizes } from '../../template/actions.jsx'

import ResizableRect from 'react-resizable-rotatable-draggable'

import { getRectangleCoordinates, getOriginalRectangleCoordinates } from './coordinateParsers'

class Rectangle extends React.Component {
  constructor(props) {
    super(props)
  }

  handleResize = (style, isShiftKey, type) => {
    // type is a string and it shows which resize-handler you clicked
    // e.g. if you clicked top-right handler, then type is 'tr'
    let { top, left, width, height } = style

    let coefficientX = 0
    let coefficientY = 0
    if(this.props.currentPageOriginalRotationAngle == 270 || this.props.currentPageOriginalRotationAngle == 90){
      coefficientX = this.props.currentPageOriginalWidth / this.props.canvasHeight
      coefficientY = this.props.currentPageOriginalHeight / this.props.canvasWidth
    }
    else{
      coefficientX = this.props.currentPageOriginalWidth / this.props.canvasWidth
      coefficientY = this.props.currentPageOriginalHeight / this.props.canvasHeight
    }

    top = Math.round(top) * coefficientY
    left = (Math.round(left) - this.props.canvasMarginLeft) * coefficientX
    width = Math.round(width) * coefficientX
    height = Math.round(height) * coefficientY

    this.changeObjectCoordinates(
      left,
      top
    )
    this.changeObjectSizes(
      width,
      height
    )
  }

  handleDrag = (deltaX, deltaY) => {
    const {topLeftX, topLeftY} = getOriginalRectangleCoordinates(this.props.templateObject, 
      this.props.currentPageOriginalWidth, 
      this.props.currentPageOriginalHeight, 
      this.props.currentPageOriginalRotationAngle
      )

    let coefficientX = 0
    let coefficientY = 0
    if(this.props.currentPageOriginalRotationAngle == 270 || this.props.currentPageOriginalRotationAngle == 90){
      coefficientX = this.props.currentPageOriginalWidth / this.props.canvasHeight
      coefficientY = this.props.currentPageOriginalHeight / this.props.canvasWidth
    }
    else{
      coefficientX = this.props.currentPageOriginalWidth / this.props.canvasWidth
      coefficientY = this.props.currentPageOriginalHeight / this.props.canvasHeight
    }

    deltaX *= coefficientX
    deltaY *= coefficientY

    this.changeObjectCoordinates(
      topLeftX + deltaX,
      topLeftY + deltaY,
    )
  }

  getCoordinates = () => {
    return getRectangleCoordinates(
      this.props.templateObject,
      this.props.canvasWidth,
      this.props.canvasHeight,
      this.props.currentPageOriginalHeight,
      this.props.currentPageOriginalWidth,
      this.props.canvasMarginLeft,
      this.props.currentPageOriginalRotationAngle
    )
  }

  changeObjectCoordinates = (x, y) => {
    const object = this.props.templateObject

    if (object["objectType"] == "field" && object["fieldProperties"]["fieldType"] == "rectangle") {
      return this.props.changeRectangleFieldCoordinates(object.id, x, y)
    } else if (object["objectType"] == "table") {
      return this.props.changeRectangleTableCoordinates(object.id, x, y)
    }
  }

  changeObjectSizes = (w, h) => {
    const object = this.props.templateObject

    if (object["objectType"] == "field" && object["fieldProperties"]["fieldType"] == "rectangle") {
      return this.props.changeRectangleFieldSizes(object.id, w, h)
    } else if (object["objectType"] == "table") {
      return this.props.changeRectangleTableSizes(object.id, w, h)
    }
  }

  render() {
    const wrapperClassnames = classNames({active: this.props.activeObjectId == this.props.templateObject.id})

    const {width, height, topLeftX, topLeftY} = this.getCoordinates()

    return (
      <div className={wrapperClassnames} onClick={() => this.props.setActiveObject(this.props.templateObject.id)}>
        <ResizableRect
          left={topLeftX}
          top={topLeftY}
          width={width}
          height={height}
          // aspectRatio={false}
          minWidth={10}
          minHeight={10}
          zoomable='n, w, s, e, nw, ne, se, sw'
          rotatable={false}
          // onResizeStart={this.handleResizeStart}
          onResize={this.handleResize}
          // onResizeEnd={this.handleUp}
          // onDragStart={this.handleDragStart}
          onDrag={this.handleDrag}
          // onDragEnd={this.handleDragEnd}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    page:  state.pdfViewer.page,
    scale: state.pdfViewer.scale,
    objects: state.template.objects,
    activeObjectId: state.pdfViewer.activeObjectId,
    canvasMarginLeft: state.pdfViewer.canvasMarginLeft,
    canvasWidth: state.pdfViewer.canvasWidth,
    canvasHeight: state.pdfViewer.canvasHeight,
    currentPageOriginalHeight: state.pdfViewer.currentPageOriginalHeight,
    currentPageOriginalWidth: state.pdfViewer.currentPageOriginalWidth,
    currentPageOriginalRotationAngle: state.pdfViewer.currentPageOriginalRotationAngle
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    setActiveObject,
    changeRectangleFieldCoordinates,
    changeRectangleFieldSizes,
    changeRectangleTableCoordinates,
    changeRectangleTableSizes
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Rectangle)

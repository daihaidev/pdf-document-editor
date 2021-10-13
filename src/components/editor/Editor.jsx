import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addTemplateObject, deleteObject } from '../template/actions'
import { generateRectangleField, drawRectangleElements } from './objectGenerators'
import { setActiveObject } from '../pdfViewer/actions.jsx'

import styles from './editor.css'

class Editor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isMouseDown: false,
      mouseDownPositionX: undefined,
      mouseDownPositionY: undefined
    }
  }

  handleMouseDown = (e) => {
    if (e.target.classList.contains("single-resizer") || e.target.closest(".single-resizer")) return;

    this.setState({
      isMouseDown: true,
      mouseDownPositionX: this.props.position.x,
      mouseDownPositionY: this.props.position.y
    })
  }

  handleMouseUp = (e) => {
    if (!this.state.isMouseDown) return;

    const {topLeftCornerX, topLeftCornerY, bottomRightCornerX, bottomRightCornerY} = this.getFrameCoordinates()

    if (bottomRightCornerX - topLeftCornerX > 1 && bottomRightCornerY - topLeftCornerY > 1) {
      const rectangleObject = generateRectangleField(this.props.objects, {
        topLeftCornerX: this.props.convertXToPdfUnits(topLeftCornerX + this.props.pageRef.parentElement.scrollLeft - this.props.canvasMarginLeft),
        topLeftCornerY: this.props.convertYToPdfUnits(topLeftCornerY + this.props.pageRef.parentElement.scrollTop - 44 - 6),
        width: this.props.convertXToPdfUnits(bottomRightCornerX - topLeftCornerX),
        height: this.props.convertYToPdfUnits(bottomRightCornerY - topLeftCornerY),
        page: this.props.page - 1
      })
      this.props.addTemplateObject(rectangleObject)
      this.props.setActiveObject(rectangleObject.id)
    }

    this.resetMouseData()
  }

  resetMouseData = () => {
    this.setState({
      isMouseDown: false,
      mouseDownPositionX: undefined,
      mouseDownPositionY: undefined
    })
  }

  handleKeyPress = (e) => {
    if(e.charCode == 127 && window.confirm("Are you sure?")) {
      this.props.deleteObject(this.props.activeObjectId)
    }
  }

  drawFrame = () => {
    if (!this.state.isMouseDown) return;

    const {topLeftCornerX, topLeftCornerY, bottomRightCornerX, bottomRightCornerY} = this.getFrameCoordinates()
    return (
      <div
        className="rectangle"
        style={{
          left:   topLeftCornerX + this.props.pageRef.parentElement.scrollLeft + 'px',
          top:    topLeftCornerY + this.props.pageRef.parentElement.scrollTop - 44 - 6 + 'px',
          width:  bottomRightCornerX - topLeftCornerX + 'px',
          height: bottomRightCornerY - topLeftCornerY + 'px'
        }}>
      </div>
    )
  }

  getFrameCoordinates = () => {
    const topLeftCornerX     = Math.min(this.props.position.x, this.state.mouseDownPositionX)
    const topLeftCornerY     = Math.min(this.props.position.y, this.state.mouseDownPositionY)

    const bottomRightCornerX = Math.max(this.props.position.x, this.state.mouseDownPositionX)
    const bottomRightCornerY = Math.max(this.props.position.y, this.state.mouseDownPositionY)

    return {topLeftCornerX, topLeftCornerY, bottomRightCornerX, bottomRightCornerY}
  }

  render() {
    return (
      <div
        className="editor"
        style={{width: this.props.width + 'px', height: this.props.height + 'px'}}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseLeave={this.resetMouseData}
        onKeyPress={this.handleKeyPress}
        tabIndex="0"
      >
        {this.drawFrame()}
        {drawRectangleElements(this.props.objects, this.props.page)}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    page:  state.pdfViewer.page,
    scale: state.pdfViewer.scale,
    objects: state.template.objects,
    canvasMarginLeft: state.pdfViewer.canvasMarginLeft,
    activeObjectId: state.pdfViewer.activeObjectId
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    addTemplateObject,
    setActiveObject,
    deleteObject
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)

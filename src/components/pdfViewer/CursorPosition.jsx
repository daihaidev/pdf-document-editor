import React from 'react'

export default class CursorPosition extends React.Component{
  render() {
    return (
      <div className="inline-block">
        Position: <span className="inline-block cursor-position-data">{this.props.cursorLeftPdf}, {this.props.cursorTopPdf}</span>
      </div>
    )
  }
}

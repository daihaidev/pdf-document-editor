import React from 'react'
import ReactDOM from "react-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import "./modals.css"

import { Modal, Button } from 'react-bootstrap'

import { closeAllModals } from './actions'
import { changeGridCellFieldColumn, changeGridCellFieldRow } from '../template/actions'

class SelectGridCellModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeRowIndex: undefined,
      activeColIndex: undefined,
      initialOpen:    true
    }
  }

  activateInitialCell = (e) => {
    const object = this.props.objects.find(obj => obj.id == this.props.detectGridStructureObjectId)
    const activeRowIndex = object.fieldProperties.structureCoordinates.y
    const activeColIndex = object.fieldProperties.structureCoordinates.x

    this.setState({
      activeRowIndex, activeColIndex
    }, () => {
      this.scrollableBodyRef.scrollTo(0, this.activeElemRef.offsetTop)
    })
  }

  activateCell = (activeRowIndex, activeColIndex) => {
    this.setState({
      activeRowIndex, activeColIndex,
      initialOpen: false
    })
  }

  selectGridCell = (rowIndex, colIndex) => {
    this.props.changeGridCellFieldColumn(this.props.detectGridStructureObjectId, colIndex)
    this.props.changeGridCellFieldRow(this.props.detectGridStructureObjectId, rowIndex)
    this.props.closeAllModals()
  }

  closeModal = (e) => {
    this.setState({
      initialOpen: true
    }, this.props.closeAllModals)
  }

  render() {
    const gridStructureTable = this.props.detectGridStructureResult.map((row, rowIndex) => {
      var cols = row.map((value, colIndex) => {
        const active = colIndex == this.state.activeColIndex && rowIndex == this.state.activeRowIndex

        if (active) {
          return (
            <td
            ref={ref => this.activeElemRef = ref}
            key={`${rowIndex}_${colIndex}`}
            className="active bg-warning"
            onClick={e => this.activateCell(rowIndex, colIndex)}
            onDoubleClick={e => this.selectGridCell(rowIndex, colIndex)}>
              {value}
            </td>
          )
        } else {
          return (
            <td
            key={`${rowIndex}_${colIndex}`}
            onClick={e => this.activateCell(rowIndex, colIndex)}
            onDoubleClick={e => this.selectGridCell(rowIndex, colIndex)}>
              {value}
            </td>
          )
        }
      })

      return <tr key={rowIndex}>{cols}</tr>
    })

    return (
      <Modal animation={false} className="select-grid-cell-modal" onShow={this.activateInitialCell} show={this.props.selectGridCellModalOpened} onHide={this.closeModal} dialogClassName="modal-75w">
        <Modal.Header closeButton>
          <Modal.Title>Grid Cell Selector</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3 className="mB-10">Select the cell to use from the virtual grid below. This virtual cell will be extracted every time.</h3>
          <div className="modal-scrollable-body" ref={ref => this.scrollableBodyRef = ref}>
            <table className="table td-hover grid-cell-selector">
              <tbody>
                {gridStructureTable}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={this.state.activeRowIndex == undefined || this.state.activeColIndex == undefined}
                  variant="primary lg"
                  onClick={e => this.selectGridCell(this.state.activeRowIndex, this.state.activeColIndex)}>
            Use Selected Cell
          </Button>
          <Button variant="secondary" onClick={this.props.closeAllModals}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectGridCellModalOpened: state.modals.selectGridCellModalOpened,
    detectGridStructureObjectId: state.pdfViewer.detectGridStructureObjectId,
    detectGridStructureResult: state.pdfViewer.detectGridStructureResult,
    objects: state.template.objects
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    closeAllModals,
    changeGridCellFieldColumn,
    changeGridCellFieldRow
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectGridCellModal)

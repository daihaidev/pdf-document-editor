import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faTable, faTrash } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
class ObjectsList extends React.Component {
  handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      this.props.deleteObject(id)
    }
  }

  drawObjects = () => {
    const icons = {
      "rectangle": <FontAwesomeIcon className="mR-10" icon={faSquare} />,
      "table": <FontAwesomeIcon className="mR-10" icon={faTable} />,
      "static-field": <span className="object-list-icon mR-10">s</span>,
      "text-search-field": <span className="object-list-icon mR-10">=</span>,
      "search-based-table": <FontAwesomeIcon className="mR-10" icon={faTable} />,
      "grid-cell-field": <span className="object-list-icon mR-10"> </span>
    }

    if (!this.props.objects) {
      return null
    }

    return this.props.objects.map((object) => {
      const elementClasses = classNames("object-list-item", { active: (this.props.activeObjectId && object.id && this.props.activeObjectId == object.id) })
      const rectangle = object["fieldProperties"] && object["fieldProperties"]["fieldType"] == "rectangle"
      const table = object["objectType"] == "table" && !object["tableType"]
      const staticField = object["objectType"] == "field" && object["fieldProperties"]["fieldType"] == "static"
      const textSearchField = object["objectType"] == "field" && object["fieldProperties"]["fieldType"] == "macros"
      const searchBasedTable = object["objectType"] == "table" && object["tableType"] == "searchBased"
      const gridCellField = object["objectType"] == "field" && object["fieldProperties"]["fieldType"] == "structure"

      if (rectangle) {
        return (
          <div key={object["id"]} className={elementClasses} onClick={() => this.props.setActiveObject(object["id"])}>
            {icons["rectangle"]}{object["name"]}
            <button data-toggle="tooltip" data-placement="bottom" title="Delete object" className="delete-object" onClick={e => this.handleDelete(object["id"])}>
              <FontAwesomeIcon className="mR-10" icon={faTrash} />
            </button>
            <span className="pull-right">(page: {object["fieldProperties"]["pageIndex"] + 1})</span>
          </div>
        )
      } else if (table) {
        return (
          <div key={object["id"]} className={elementClasses} onClick={() => this.props.setActiveObject(object["id"])}>
            {icons["table"]}{object["name"]}
            <button data-toggle="tooltip" data-placement="bottom" title="Delete object" className="delete-object" onClick={e => this.handleDelete(object["id"])}>
              <FontAwesomeIcon className="mR-10" icon={faTrash} />
            </button>
            <span className="pull-right">(page: {isNaN(object["tableProperties"]["start"]["pageIndex"]) ? 'ALL' : object["tableProperties"]["start"]["pageIndex"] + 1})</span>
          </div>
        )
      } else if (staticField) {
        return (
          <div key={object["id"]} className={elementClasses} onClick={() => this.props.setActiveObject(object["id"])}>
            {icons["static-field"]}{object["name"]}
            <button data-toggle="tooltip" data-placement="bottom" title="Delete object" className="delete-object" onClick={e => this.handleDelete(object["id"])}>
              <FontAwesomeIcon className="mR-10" icon={faTrash} />
            </button>
          </div>
        )
      } else if (textSearchField) {
        return (
          <div key={object["id"]} className={elementClasses} onClick={() => this.props.setActiveObject(object["id"])}>
            {icons["text-search-field"]}{object["name"]}
            <button data-toggle="tooltip" data-placement="bottom" title="Delete object" className="delete-object" onClick={e => this.handleDelete(object["id"])}>
              <FontAwesomeIcon className="mR-10" icon={faTrash} />
            </button>
          </div>
        )
      } else if (searchBasedTable) {
        return (
          <div key={object["id"]} className={elementClasses} onClick={() => this.props.setActiveObject(object["id"])}>
            {icons["search-based-table"]}{object["name"]}
            <button data-toggle="tooltip" data-placement="bottom" title="Delete object" className="delete-object" onClick={e => this.handleDelete(object["id"])}>
              <FontAwesomeIcon className="mR-10" icon={faTrash} />
            </button>
          </div>
        )
      } else if (gridCellField) {
        return (
          <div key={object["id"]} className={elementClasses} onClick={() => this.props.setActiveObject(object["id"])}>
            {icons["grid-cell-field"]}{object["name"]}
            <button data-toggle="tooltip" data-placement="bottom" title="Delete object" className="delete-object" onClick={e => this.handleDelete(object["id"])}>
              <FontAwesomeIcon className="mR-10" icon={faTrash} />
            </button>
            <span className="pull-right">(page: {object["fieldProperties"]["pageIndex"] + 1})</span>
          </div>
        )
      }
    })
  }

  render() {
    return (
      <div className="objects ta-left">
        <div className="d-flex justify-content-between">
          <h5>Objects:</h5>
        </div>

        <div className="object-list">
          {this.drawObjects()}
        </div>
      </div>
    );
  }
}

export default ObjectsList;

import React from 'react'
import { IsJsonString } from '../../../utils/jsonUtils';

const SearchBasedTableOptions = (props) => {
  const tablePropertiesRef = React.useRef(null);
  const [error, setError] = React.useState('')
  const [currentPoistion, setCurrentPosition] = React.useState(0);

  React.useEffect(() => {
    if (props.object) {
      const currentTableProperties = typeof props.object.tableProperties === 'string' ? JSON.parse(props.object.tableProperties) : { ...props.object.tableProperties };
      try {
        if (currentTableProperties && currentTableProperties.additionalMacro) {
          if (currentPoistion) {
            const addedMacro = currentTableProperties.additionalMacro;
            delete currentTableProperties.additionalMacro;
            const stringOfTableProperties = JSON.stringify(currentTableProperties, undefined, 2);
            props.changeSearchBasedTableProperties(props.object.id, stringOfTableProperties.substring(0, currentPoistion) + addedMacro + stringOfTableProperties.substring(currentPoistion));
          }
          else {
            const addedMacro = currentTableProperties.additionalMacro;
            delete currentTableProperties.additionalMacro;
            currentTableProperties.end.expression = currentTableProperties.end.expression + addedMacro;
            props.changeSearchBasedTableProperties(props.object.id, JSON.stringify(currentTableProperties))
          }
        }
      }
      catch {
        delete currentTableProperties.additionalMacro;
        props.changeSearchBasedTableProperties(props.object.id, JSON.stringify(currentTableProperties))
      }
    }
  }, [props])

  const handleChangeTableProperties = (event) => {
    if (IsJsonString(event.target.value)) {
      setError('')
      props.changeSearchBasedTableProperties(props.object.id, event.target.value)
    }
    else {
      setError('Property was invalid')
    }
  }

  const handleClickTableProperties = (event) => {
    props.handleEnterExpandArea()
    if (tablePropertiesRef && tablePropertiesRef.current) {
      setCurrentPosition(tablePropertiesRef.current.selectionStart);
    }
  }

  const handlePressTableProperties = (event) => {
    props.handleEnterExpandArea()
    if (tablePropertiesRef && tablePropertiesRef.current) {
      setCurrentPosition(tablePropertiesRef.current.selectionStart + 1);
    }
  }

  const handleMouseEnter = () => {
    props.handleEnterExpandArea()
  }

  const handleMouseLeave = () => {
    props.handleLeaveExpandArea()
  }

  return (
    <div className="object-options-body">
      <div className="form-group row">
        <label htmlFor="objectNameField" className="col-sm-3 col-form-label">Name</label>
        <div className="col-sm-9">
          <input
            type="text"
            className="form-control"
            id="objectNameField"
            placeholder="Name"
            value={props.object.name}
            onChange={(e) => props.changeObjectName(props.object.id, e.target.value)}
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="col-sm-3 col-form-label">Type</label>
        <div className="col-sm-9">
          <input
            type="text"
            className="form-control"
            value="Search-based Table"
            disabled={true}
          />
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="objectValueField" className="col-sm-3 col-form-label">
          Properties
        </label>
        <div className="col-sm-9">
          <div className="text-danger col-form-label">{error}</div>
          <textarea
            className="form-control"
            name="searchBasedTablePropertiesField"
            id="searchBasedTablePropertiesField"
            cols="30" rows="4"
            value={(typeof props.object.tableProperties === 'string' ? props.object.tableProperties : JSON.stringify(props.object.tableProperties, undefined, 2))}
            onChange={handleChangeTableProperties}
            ref={tablePropertiesRef}
            onClick={handleClickTableProperties}
            onKeyDown={handlePressTableProperties}
            onMouseEnter={() => handleMouseEnter()}
            onMouseLeave={() => handleMouseLeave()}
          >
          </textarea>
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-12">
          <button onClick={props.openMacrosModal} className="btn btn-outline-secondary mT-10 pull-right">
            Insert Macro
            </button>
        </div>
      </div>
    </div>
  );
}
export default SearchBasedTableOptions

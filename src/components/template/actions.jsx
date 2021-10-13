import actionTypes from '../../constants/actionTypes'
import {
  generateRectangleField,
  generateRectangleTable,
  generateStaticField,
  generateTextSearchField,
  generateSearchBasedTable,
  generateGridCellField } from '../editor/objectGenerators'
  import Endpoints from '../../api/methods'
import { setTemplateId } from '../templateId/actions'
import { convertTemplateCode } from './converters'

export function saveTamplate() {
  return { type: actionTypes.SAVE_TEMPLATE }
}

export function resetTemplate(object) {
  return {
    type: actionTypes.RESET_TEMPLATE
  }
}

export function addTemplateObject(object) {
  return {
    type: actionTypes.ADD_TEMPLATE_OBJECT,
    object
  }
}

export function addDefaultRectangleTable(page, callback) {
  return (dispatch, getState) => {
    const existingObjects = getState().template.objects
    var data = {
      topLeftCornerX: 0,
      topLeftCornerY: findAvailableCoordinate(existingObjects, page),
      width: 250,
      height: 100,
      page: page
    }

    const object = generateRectangleTable(existingObjects, data)

    dispatch(addTemplateObject(object))

    if (callback) {
      callback(object.id)
    }
  }
}

export function addDefaultRectangleField(page, callback) {
  return (dispatch, getState) => {
    const existingObjects = getState().template.objects
    var data = {
      topLeftCornerX: 0,
      topLeftCornerY: findAvailableCoordinate(existingObjects, page),
      width: 50,
      height: 50,
      page: page
    }

    const object = generateRectangleField(existingObjects, data)

    dispatch(addTemplateObject(object))

    if (callback) {
      callback(object.id)
    }
  }
}

export function addDefaultStaticField(page, callback) {
  return (dispatch, getState) => {
    const existingObjects = getState().template.objects
    var data = {
      page: page
    }

    const object = generateStaticField(existingObjects, data)

    dispatch(addTemplateObject(object))

    if (callback) {
      callback(object.id)
    }
  }
}

export function addDefaultTextSearchField(callback) {
  return (dispatch, getState) => {
    const existingObjects = getState().template.objects
    const object = generateTextSearchField(existingObjects)

    dispatch(addTemplateObject(object))

    if (callback) {
      callback(object.id)
    }
  }
}

export function addDefaultSearchBasedTable(callback) {
  return (dispatch, getState) => {
    const existingObjects = getState().template.objects
    const object = generateSearchBasedTable(existingObjects)

    dispatch(addTemplateObject(object))

    if (callback) {
      callback(object.id)
    }
  }
}

export function addDefaultGridCellField(page, callback) {
  return (dispatch, getState) => {
    var data = {
      page: page
    }
    const existingObjects = getState().template.objects
    const object = generateGridCellField(existingObjects, data)

    dispatch(addTemplateObject(object))

    if (callback) {
      callback(object.id)
    }
  }
}

function findAvailableCoordinate(objects, page) {
  var availableCoordinate
  var coordinateY = 0

  while (availableCoordinate == undefined) {
    var objectInPlace = objects.find(obj => {
      if (obj["fieldProperties"] && obj["fieldProperties"]["rectangle"] && obj["fieldProperties"]["pageIndex"] == page) {
        return obj["fieldProperties"]["rectangle"][1] == coordinateY
      } else if (obj["fieldProperties"] && obj["fieldProperties"]["start"] && obj["fieldProperties"]["start"]["pageIndex"] == page) {
        return obj["fieldProperties"]["start"]["y"] == coordinateY
      }
    })

    if (objectInPlace) {
      if (objectInPlace["fieldProperties"] && objectInPlace["fieldProperties"]["rectangle"]) {
        coordinateY += objectInPlace["fieldProperties"]["rectangle"][3] + 10
      } else if (objectInPlace["fieldProperties"] && objectInPlace["fieldProperties"]["end"]) {
        coordinateY += objectInPlace["fieldProperties"]["end"]["y"] + 10
      }
    } else {
      availableCoordinate = coordinateY
    }
  }

  return availableCoordinate
}

export function changeObjectName(id, name) {
  return {
    type: actionTypes.CHANGE_OBJECT_NAME,
    id,
    name
  }
}

export function changeRectangleFieldCoordinates(id, x, y) {
  return {
    type: actionTypes.CHANGE_RECTANGLE_FIELD_COORDINATES,
    id,
    x,
    y
  }
}

export function changeRectangleFieldSizes(id, width, height) {
  return {
    type: actionTypes.CHANGE_RECTANGLE_FIELD_SIZES,
    id,
    width,
    height
  }
}

export function changeRectangleTableCoordinates(id, x, y) {
  return {
    type: actionTypes.CHANGE_RECTANGLE_TABLE_COORDINATES,
    id,
    x,
    y
  }
}

export function changeRectangleTableSizes(id, width, height) {
  return {
    type: actionTypes.CHANGE_RECTANGLE_TABLE_SIZES,
    id,
    width,
    height
  }
}

export function changeTemplateName(templateName) {
  return {
    type: actionTypes.CHANGE_TEMPLATE_NAME,
    templateName
  }
}

export function changeObjectDataType(id, dataType) {
  return {
    type: actionTypes.CHANGE_OBJECT_DATA_TYPE,
    id,
    dataType
  }
}

export function changeObjectExpression(id, expression) {
  return {
    type: actionTypes.CHANGE_OBJECT_EXPRESSION,
    id,
    expression
  }
}

export function changeObjectDateFormat(id, dateFormat) {
  return {
    type: actionTypes.CHANGE_OBJECT_DATE_FORMAT,
    id,
    dateFormat
  }
}

export function changeObjectCoalescingObject(id, targetObjectId) {
  return {
    type: actionTypes.CHANGE_OBJECT_COALESCING_WITH,
    id,
    targetObjectId
  }
}

export function changeTableRowMergingRule(id, rowMergingRule) {
  return {
    type: actionTypes.CHANGE_TABLE_ROW_MERGING_RULE,
    id,
    rowMergingRule
  }
}

export function changeSearchBasedTableProperties(id, tableProperties) {
  return {
    type: actionTypes.CHANGE_SEARCH_BASED_TABLE_PROPERTIES,
    id,
    tableProperties
  }
}

export function changeGridCellFieldColumn(id, x) {
  return {
    type: actionTypes.CHANGE_GRID_CELL_FIELD_COLUMN,
    id,
    x
  }
}

export function changeGridCellFieldRow(id, y) {
  return {
    type: actionTypes.CHANGE_GRID_CELL_FIELD_ROW,
    id,
    y
  }
}

export function setTemplate(template) {
  return {
    type: actionTypes.SET_TEMPLATE,
    template
  }
}

export function deleteObject(id) {
  return {
    type: actionTypes.DELETE_TEMPLATE_OBJECT,
    id
  }
}

export function undoObjectChanges() {
  return {
    type: actionTypes.UNDO_OBJECTS_CHANGES,
  }
}


export function changeTemplatePriority(templatePriority) {
  return {
    type: actionTypes.CHANGE_TEMPLATE_PRIORITY,
    templatePriority
  }
}
export function changeTemplateCulture(culture) {
  return {
    type: actionTypes.CHANGE_TEMPLATE_CULTURE,
    culture
  }
}
export function changeTemplateOcrMode(ocrMode) {
  return {
    type: actionTypes.CHANGE_TEMPLATE_OCR_MODE,
    ocrMode
  }
}
export function changeTemplateOcrLanguage(ocrLanguage) {
  return {
    type: actionTypes.CHANGE_TEMPLATE_OCR_LANGUAGE,
    ocrLanguage
  }
}

export function insertMacrosIntoObject(id, macros) {
  return {
    type: actionTypes.INSERT_MACROS_INTO_OBJECT,
    id,
    macros
  }
}

export function setRegexStatusToObject(id, regex) {
  return {
    type: actionTypes.SET_REGEX_STATUS_TO_OBJECT,
    id,
    regex
  }
}

export function getTemplate(id) {
  return (dispatch) => {
    Endpoints.getDocumentParserTemplate(id)
      .then(response => {
        dispatch(setTemplate(convertTemplateCode(response.data.body)))
        dispatch(setTemplateId(id))
      })
      .catch(err => {
        dispatch(setTemplateId(id))
        alert("Error getting template")
        console.log(err)
      })
  }
}

export function updateTemplate(id, template, shouldExit = false) {
  return (dispatch) => {
    Endpoints.updateDocumentParserTemplate(id, { template: JSON.stringify(template) })
      .then(_response => {
        dispatch(saveTamplate())
        if (shouldExit == true) {
          window.location.assign(process.env.REACT_APP_DOCPARSER_TEMPLATE_EDITOR_UPDATE_TEMPLATE_REDIRECT)
        }
      }).catch(err => {
        dispatch(saveTamplate())
        alert("Error updating template")
        console.log(err)
      })
  }
}

export function createTemplate(template, shouldExit = false) {
  return (dispatch) => {
    Endpoints.createDocumentParserTemplate( { template: JSON.stringify(template) })
      .then(_response => {
        dispatch(saveTamplate())
        if (shouldExit == true) {
          window.location.assign(process.env.REACT_APP_DOCPARSER_TEMPLATE_EDITOR_UPDATE_TEMPLATE_REDIRECT)
        }
      }).catch(err => {
        dispatch(saveTamplate())
        alert("Error creating template")
        console.log(err)
      })
  }
}
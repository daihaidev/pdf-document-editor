import actionTypes from '../../constants/actionTypes'

const initialState = {
  isTemplateModified: false,
  templateFileName: undefined
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RECEIVE_DETECT_MACRO:
    case actionTypes.RECEIVE_DETECT_FIELDS:
    case actionTypes.RECEIVE_DETECT_GRID_STRUCTURE:
    case actionTypes.DELETE_TEMPLATE_OBJECT:
    case actionTypes.ADD_TEMPLATE_OBJECT:
    case actionTypes.CHANGE_OBJECT_NAME:
    case actionTypes.CHANGE_RECTANGLE_FIELD_COORDINATES:
    case actionTypes.CHANGE_RECTANGLE_FIELD_SIZES:
    case actionTypes.CHANGE_RECTANGLE_TABLE_COORDINATES:
    case actionTypes.CHANGE_RECTANGLE_TABLE_SIZES:
    case actionTypes.CHANGE_OBJECT_DATA_TYPE:
    case actionTypes.CHANGE_OBJECT_EXPRESSION:
    case actionTypes.CHANGE_OBJECT_DATE_FORMAT:
    case actionTypes.CHANGE_TABLE_ROW_MERGING_RULE:
    case actionTypes.CHANGE_SEARCH_BASED_TABLE_PROPERTIES:
    case actionTypes.CHANGE_GRID_CELL_FIELD_COLUMN:
    case actionTypes.CHANGE_GRID_CELL_FIELD_ROW:
    case actionTypes.INSERT_MACROS_INTO_OBJECT:
    case actionTypes.SET_REGEX_STATUS_TO_OBJECT:
    case actionTypes.CHANGE_TEMPLATE_NAME:
    case actionTypes.CHANGE_TEMPLATE_TIMESTAMP:
    case actionTypes.CHANGE_TEMPLATE_PRIORITY:
    case actionTypes.CHANGE_TEMPLATE_CULTURE:
    case actionTypes.CHANGE_TEMPLATE_OCR_MODE:
    case actionTypes.CHANGE_TEMPLATE_OCR_LANGUAGE:
    case actionTypes.SET_REGEX_STATUS_TO_OBJECT:
    case actionTypes.SET_REGEX_STATUS_TO_OBJECT:
    case actionTypes.SET_REGEX_STATUS_TO_OBJECT:
    case actionTypes.SET_REGEX_STATUS_TO_OBJECT:
    case actionTypes.SET_REGEX_STATUS_TO_OBJECT:
    case actionTypes.SET_REGEX_STATUS_TO_OBJECT:
      return {
        ...state,
        isTemplateModified: true
      }
    case actionTypes.SET_TEMPLATE:
    case actionTypes.RESET_TEMPLATE:
      return {
        ...state,
        isTemplateModified: false
      }
    case actionTypes.SET_IS_TEMPLATE_MODIFIED:
      return {
        ...state,
        isTemplateModified: action.isTemplateModified
      }
    case actionTypes.SET_TEMPLATE_FILE_NAME:
      return {
        ...state,
        templateFileName: action.templateFileName
      }
    default:
      return state
  }
}

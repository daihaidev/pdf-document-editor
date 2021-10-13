import actionTypes from '../../constants/actionTypes'

const initialState = {
  detectingMacroObjectId: undefined,
  testFieldResultId: undefined,
  detectedMacros: [],
  fileUploadingFromUrl: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_DETECT_MACRO:
      return {
        ...state,
        detectingMacroObjectId: action.detectingMacroObjectId
      }
    case actionTypes.RECEIVE_DETECT_MACRO:
      return {
        ...state,
        detectedMacros: action.detectedMacros
      }
    case actionTypes.SET_TEST_FIELD_RESULT_ID:
      return {
        ...state,
        testFieldResultId: action.testFieldResultId
      }
    case actionTypes.CHANGE_RECTANGLE_FIELD_COORDINATES:
    case actionTypes.CHANGE_RECTANGLE_FIELD_SIZES:
    case actionTypes.CHANGE_RECTANGLE_TABLE_COORDINATES:
    case actionTypes.CHANGE_RECTANGLE_TABLE_SIZES:
    case actionTypes.CHANGE_OBJECT_DATA_TYPE:
      return {
        ...state,
        detectingMacroObjectId: initialState.detectingMacroObjectId,
        testFieldResultId: initialState.testFieldResultId,
        detectedMacros: initialState.detectedMacros
      }
    case actionTypes.REQUEST_UPLOAD_FILE_FROM_URL:
      return {
        ...state,
        fileUploadingFromUrl: true
      }
    case actionTypes.RECEIVE_UPLOAD_FILE_FROM_URL:
      return {
        ...state,
        fileUploadingFromUrl: false
      }
    default:
      return state
  }
}

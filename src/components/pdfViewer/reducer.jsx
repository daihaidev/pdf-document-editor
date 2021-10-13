import actionTypes from '../../constants/actionTypes'

const initialState = {
  page: 1,
  scale: 1,
  activeObjectId: undefined,
  file: undefined,
  url: undefined,
  canvasMarginLeft: 0,
  canvasHeight: 0,
  canvasWidth: 0,
  currentPageOriginalHeight: 1,
  currentPageOriginalWidth: 1,
  currentPageOriginalRotationAngle: 0,
  convertingToPdf: false,
  isRunningTemplate: false,
  runTemplateResult: {},
  isCustomFile: false,
  detectingMacro: false,
  detectingFields: false,
  detectGridStructureResult: [],
  pdfFileName: undefined
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PDF_FILE_NAME:
      return {
        ...state,
        pdfFileName: action.pdfFileName
      }
    case actionTypes.RESET_PDF_FILE_AND_URL:
      return {
        ...state,
        file: undefined,
        url: undefined
      }
    case actionTypes.SET_IS_CUSTOM_FILE:
      return {
        ...state,
        isCustomFile: action.isCustomFile
      }
    case actionTypes.REQUEST_CONVERT_TO_PDF:
      return {
        ...state,
        convertingToPdf: true
      }
    case actionTypes.RECEIVE_CONVERT_TO_PDF:
      return {
        ...state,
        convertingToPdf: false
      }
    case actionTypes.REQUEST_DETECT_MACRO:
      return {
        ...state,
        detectingMacro: true
      }
    case actionTypes.RECEIVE_DETECT_MACRO:
      return {
        ...state,
        detectingMacro: false
      }
    case actionTypes.REQUEST_DETECT_GRID_STRUCTURE:
    case actionTypes.REQUEST_DETECT_FIELDS:
      return {
        ...state,
        detectingFields: true,
        detectGridStructureObjectId: action.detectGridStructureObjectId
      }
    case actionTypes.RECEIVE_DETECT_GRID_STRUCTURE:
      return {
        ...state,
        detectingFields: false,
        detectGridStructureResult: action.detectGridStructureResult
      }
    case actionTypes.RECEIVE_DETECT_FIELDS:
      return {
        ...state,
        detectingFields: false
      }
    case actionTypes.SET_PDF_FILE:
      return {
        ...state,
        file: action.file,
        url: undefined
      }
    case actionTypes.SET_PDF_URL:
      return {
        ...state,
        url: action.url,
        file: undefined
      }
    case actionTypes.SET_PDF_PAGE:
      return {
        ...state,
        page: action.page
      }
    case actionTypes.SET_PDF_SCALE:
      return {
        ...state,
        scale: action.scale
      }
    case actionTypes.SET_ACTIVE_OBJECT:
      return {
        ...state,
        activeObjectId: action.activeObjectId
      }

    case actionTypes.SET_CANVAS_MARGIN_LEFT:
      return {
        ...state,
        canvasMarginLeft: action.canvasMarginLeft
      }
    case actionTypes.SET_CANVAS_DIMENSIONS:
      return {
        ...state,
        canvasHeight: action.canvasHeight,
        canvasWidth: action.canvasWidth
      }
    case actionTypes.SET_CANVAS_CURRENT_PAGE_ORIGINAL_DIMENSIONS:
      return {
        ...state,
        currentPageOriginalHeight: action.currentPageOriginalHeight,
        currentPageOriginalWidth: action.currentPageOriginalWidth,
        currentPageOriginalRotationAngle: action.currentPageOriginalRotationAngle
      }
    case actionTypes.REQUEST_RUN_TEMPLATE:
      return {
        ...state,
        isRunningTemplate: true
      }
    case actionTypes.RECEIVE_RUN_TEMPLATE:
      return {
        ...state,
        isRunningTemplate: false,
        runTemplateResult: action.runTemplateResult
      }
    default:
      return state
  }
}

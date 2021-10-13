import actionTypes from '../../constants/actionTypes'
import Endpoints from '../../api/methods'
import axios from 'axios'

import { changeObjectExpression, addTemplateObject } from '../template/actions'
import { openSelectGridCellModal } from '../modals/actions'

export function setPdfFile(file) {
  return {
    type: actionTypes.SET_PDF_FILE,
    file
  }
}

export function setPdfUrl(url) {
  return {
    type: actionTypes.SET_PDF_URL,
    url
  }
}

export function requestConvertToPdf() {
  return {
    type: actionTypes.REQUEST_CONVERT_TO_PDF
  }
}

export function requestDetectMacro(detectingMacroObjectId) {
  return {
    type: actionTypes.REQUEST_DETECT_MACRO,
    detectingMacroObjectId
  }
}

export function receiveDetectMacro(detectedMacros) {
  return {
    type: actionTypes.RECEIVE_DETECT_MACRO,
    detectedMacros
  }
}

export function receiveConvertToPdf() {
  return {
    type: actionTypes.RECEIVE_CONVERT_TO_PDF
  }
}

export function setTestFieldResultId(testFieldResultId) {
  return {
    type: actionTypes.SET_TEST_FIELD_RESULT_ID,
    testFieldResultId
  }
}

export function convertToPdf(file, callback) {
  return (dispatch, getState) => {
    dispatch(requestConvertToPdf())

    Endpoints.convertImageToPdf(file)
    .then(response => {
      dispatch(receiveConvertToPdf())
      if (callback) {
        callback(response.data.url)
      }
    }).catch((err) => {
      dispatch(receiveConvertToPdf())
      console.log(err)
      alert("Error converting to PDF")
    });
  }
}

export function detectMacro(id) {
  return (dispatch, getState) => {
    const detectedMacros = getState().dashboard.detectedMacros
    const object         = getState().template.objects.find(obj => obj.id == id)

    if (id == getState().dashboard.detectingMacroObjectId && detectedMacros.length > 0) {
      const currentMacroIndex = detectedMacros.findIndex(macro => macro[0] == object.fieldProperties.expression)
      const nextIndex         = currentMacroIndex == detectedMacros.length - 1 ? 0 : currentMacroIndex + 1
      return dispatch(changeObjectExpression(id, detectedMacros[nextIndex][0]))
    }

    dispatch(requestDetectMacro(id))

    const page            = object.fieldProperties["pageIndex"]
    const rect            = object.fieldProperties["rectangle"] ? object.fieldProperties["rectangle"].join(", ") : undefined
    const templateCulture = getState().template["culture"]
    const ocrlang         = getState().template.options["orcLanguage"]

    uploadAndUseCurrentFile(dispatch, getState, detectMacroFromUrl, receiveDetectMacro)

    function detectMacroFromUrl(url) {
      Endpoints.detectMacro({
        url, page, rect, templateCulture, ocrlang
      })
      .then(response => {
        axios.get(response.data.url).then(response => {
          dispatch(receiveDetectMacro(response.data))
          if (response.data && response.data.length > 0) {
            dispatch(changeObjectExpression(id, response.data[0][0]))
          }
        })
      })
      .catch(err => {
        handleError(dispatch, err, receiveDetectMacro)
      })
    }
  }
}

export function requestDetectFields() {
  return {
    type: actionTypes.REQUEST_DETECT_FIELDS
  }
}

export function receiveDetectFields(fields) {
  return {
    type: actionTypes.RECEIVE_DETECT_FIELDS,
    fields
  }
}

export function detectFields() {
  return (dispatch, getState) => {
    dispatch(requestDetectFields())

    const page            = getState().pdfViewer.page - 1
    const templateCulture = getState().template.culture

    uploadAndUseCurrentFile(dispatch, getState, detectFieldsFromUrl, receiveDetectFields)

    function detectFieldsFromUrl(url) {
      Endpoints.detectFields({url, page, templateCulture})
      .then(response => {
        axios.get(response.data.url).then(response => {
          alert(response.data.length + " fields were detected and added to the template")
          dispatch(receiveDetectFields())
          response.data.forEach((value, index) => {
            value["id"] = Date.now() + index
            dispatch(addTemplateObject(value))
          })
        })
      }).catch(err => {
        handleError(dispatch, err, receiveDetectFields)
      })
    }
  }
}

export function requestDetectGridStructure(detectGridStructureObjectId) {
  return {
    type: actionTypes.REQUEST_DETECT_GRID_STRUCTURE,
    detectGridStructureObjectId
  }
}

export function receiveDetectGridStructure(fields) {
  return {
    type: actionTypes.RECEIVE_DETECT_GRID_STRUCTURE,
    detectGridStructureResult: fields
  }
}

export function detectGridStructure(id) {
  return (dispatch, getState) => {
    dispatch(requestDetectGridStructure(id))

    const page    = getState().pdfViewer.page - 1
    const ocrlang = getState().template.options["orcLanguage"]

    uploadAndUseCurrentFile(dispatch, getState, detectGridStructureFromUrl, receiveDetectGridStructure)

    function detectGridStructureFromUrl(url) {
      Endpoints.detectGridStructure({url, page, ocrlang})
      .then(response => {
        axios.get(response.data.url).then(response => {
          dispatch(receiveDetectGridStructure(response.data))
          dispatch(openSelectGridCellModal())
        })
      }).catch(err => {
        handleError(dispatch, err, receiveDetectGridStructure)
      })
    }
  }
}

function uploadAndUseCurrentFile(dispatch, getState, actionUse, actionReceive) {
  try {
    if (getState().pdfViewer.file) {
      Endpoints.uploadFileBase64(getState().pdfViewer.file)
      .then(response => {
        actionUse(response.data.url)
      }).catch((err) => {
        handleError(dispatch, err, actionReceive)
      });
    } else if (getState().pdfViewer.url) {
      actionUse(getState().pdfViewer.url)
    }
  }
  catch (err) {
    handleError(dispatch, err, actionReceive)
  }
}

function handleError(dispatch, error, actionReceive) {
  dispatch(actionReceive())
  alert("Detecting error")
  console.log(error)
}


export function requestUploadFileFromUrl() {
  return {
    type: actionTypes.REQUEST_UPLOAD_FILE_FROM_URL
  }
}

export function receiveUploadFileFromUrl() {
  return {
    type: actionTypes.RECEIVE_UPLOAD_FILE_FROM_URL
  }
}

export function uploadFileFromUrl(url, callback) {
  return (dispatch, getState) => {
    dispatch(requestUploadFileFromUrl())

    Endpoints.uploadFileFromUrl(url)
    .then(response => {
      dispatch(receiveUploadFileFromUrl())
      if (callback) {
        callback(response.data.url)
      }
    }).catch((err) => {
      dispatch(receiveUploadFileFromUrl())
      console.log(err)
      alert("Error converting to PDF")
    });
  }
}
import actionTypes from '../../constants/actionTypes'
import Endpoints from '../../api/methods'
import axios from 'axios'

import { openRunTemplateResultModal } from '../modals/actions'
import { receiveConvertToPdf, requestConvertToPdf, uploadFileFromUrl } from '../dashboard/actions'

export function setPdfPage(page) {
  return {
    type: actionTypes.SET_PDF_PAGE,
    page
  }
}

export function setPdfScale(scale) {
  return {
    type: actionTypes.SET_PDF_SCALE,
    scale
  }
}

export function setActiveObject(activeObjectId) {
  return {
    type: actionTypes.SET_ACTIVE_OBJECT,
    activeObjectId
  }
}

export function setCanvasMarginLeft(canvasMarginLeft) {
  return {
    type: actionTypes.SET_CANVAS_MARGIN_LEFT,
    canvasMarginLeft
  }
}

export function setCanvasDimensions(canvasHeight, canvasWidth) {
  return {
    type: actionTypes.SET_CANVAS_DIMENSIONS,
    canvasHeight,
    canvasWidth
  }
}

export function setCanvasCurrentPageOriginalDimensions(currentPageOriginalHeight, currentPageOriginalWidth, currentPageOriginalRotationAngle) {
  return {
    type: actionTypes.SET_CANVAS_CURRENT_PAGE_ORIGINAL_DIMENSIONS,
    currentPageOriginalHeight,
    currentPageOriginalWidth,
    currentPageOriginalRotationAngle
  }
}

export function resetPdfFileAndUrl() {
  return {
    type: actionTypes.RESET_PDF_FILE_AND_URL
  }
}

export function requestRunTemplate() {
  return {
    type: actionTypes.REQUEST_RUN_TEMPLATE
  }
}

export function receiveRunTemplate(runTemplateResult) {
  return {
    type: actionTypes.RECEIVE_RUN_TEMPLATE,
    runTemplateResult: runTemplateResult || {}
  }
}

export function setIsCustomFile(isCustomFile) {
  return {
    type: actionTypes.SET_IS_CUSTOM_FILE,
    isCustomFile
  }
}

export function runTemplate(callback) {
  return (dispatch, getState) => {
    dispatch(runCustomTemplate(getState().template, callback))
  }
}

export function runTemplateWithOneObject(id, callback) {
  return (dispatch, getState) => {
    const object = getState().template.objects.find(obj => obj.id == id)
    const template = JSON.parse(JSON.stringify(getState().template))
    template.objects = [object]

    dispatch(runCustomTemplate(template, callback))
  }
}

export function runCustomTemplate(template, callback) {
  return (dispatch, getState) => {
    dispatch(requestRunTemplate())

    try {
      if (getState().pdfViewer.file) {
        Endpoints.uploadFileBase64(getState().pdfViewer.file)
          .then(response => {
            runTemplateFromUrl(response.data.url)
          }).catch((err) => {
            dispatch(receiveRunTemplate())
            alert("Error uploading file via PDF.co API")
            console.log(err)
          });
      } else if (getState().pdfViewer.url) {
        runTemplateFromUrl(getState().pdfViewer.url)
      }
    }
    catch (e) {
      dispatch(receiveRunTemplate())
      alert("Error testing template")
      console.log(e)
    }

    function runTemplateFromUrl(url) {
      Endpoints.testTemplate(template, url)
        .then(response => {
          axios.get(response.data.url).then(response => {
            dispatch(receiveRunTemplate(response.data))

            if (typeof callback === "function") {
              callback(response.data)
            }
          })
        }).catch(err => {
          dispatch(receiveRunTemplate())
          alert("Error running template")
          console.log(err)
        })
    }
  }
}

export function setPdfFileName(pdfFileName) {
  return {
    type: actionTypes.SET_PDF_FILE_NAME,
    pdfFileName
  }
}

export function uploadSampleDocumentFromUrl(url, callback) {
  return (dispatch, getState) => {
    dispatch(requestConvertToPdf())
    dispatch(uploadFileFromUrl(url, callback))
    dispatch(receiveConvertToPdf())
  }
}
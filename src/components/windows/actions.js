import actionTypes from '../../constants/actionTypes'

export function openRunTemplateResultWindow() {
  return {
    type: actionTypes.OPEN_RUN_TEMPLATE_RESULT_WINDOW
  }
}
export function openRunObjectResultWindow() {
  return {
    type: actionTypes.OPEN_RUN_OBJECT_RESULT_WINDOW
  }
}

export function closeAllWindows() {
  return {
    type: actionTypes.CLOSE_ALL_WINDOWS
  }
}

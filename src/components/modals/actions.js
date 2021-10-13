import actionTypes from '../../constants/actionTypes'

export function openTemplateSettingsModal() {
  return {
    type: actionTypes.OPEN_TEMPLATE_SETTINGS_MODAL
  }
}

export function openEditTemplateModal() {
  return {
    type: actionTypes.OPEN_EDIT_TEMPLATE_MODAL
  }
}

export function openMacrosModal() {
  return {
    type: actionTypes.OPEN_MACROS_MODAL
  }
}

export function openRunTemplateResultModal() {
  return {
    type: actionTypes.OPEN_RUN_TEMPLATE_RESULT_MODAL
  }
}

export function openRunTemplateWithOneObjectResultModal() {
  return {
    type: actionTypes.OPEN_RUN_TEMPLATE_WITH_ONE_OBJECT_RESULT_MODAL
  }
}

export function openSelectGridCellModal() {
  return {
    type: actionTypes.OPEN_SELECT_GRID_CELL_MODAL
  }
}

export function closeAllModals() {
  return {
    type: actionTypes.CLOSE_ALL_MODALS
  }
}

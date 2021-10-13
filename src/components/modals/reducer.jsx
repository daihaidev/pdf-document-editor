import actionTypes from '../../constants/actionTypes'

const initialState = {
  templateSettingsModalOpened: false,
  editTemplateModalOpened: false,
  macrosModalOpened: false,
  runTemplateResultModalOpened: false,
  runTemplateWithOneObjectResultModalOpened: false,
  selectGridCellModalOpened: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_TEMPLATE_SETTINGS_MODAL:
      return {
        ...state,
        templateSettingsModalOpened: true
      }
    case actionTypes.OPEN_EDIT_TEMPLATE_MODAL:
      return {
        ...state,
        editTemplateModalOpened: true
      }
    case actionTypes.OPEN_MACROS_MODAL:
      return {
        ...state,
        macrosModalOpened: true
      }
    case actionTypes.OPEN_RUN_TEMPLATE_RESULT_MODAL:
      return {
        ...state,
        runTemplateResultModalOpened: true
      }
    case actionTypes.OPEN_RUN_TEMPLATE_WITH_ONE_OBJECT_RESULT_MODAL:
      return {
        ...state,
        runTemplateWithOneObjectResultModalOpened: true
      }
    case actionTypes.OPEN_SELECT_GRID_CELL_MODAL:
      return {
        ...state,
        selectGridCellModalOpened: true
      }
    case actionTypes.CLOSE_ALL_MODALS:
      return initialState
    default:
      return state
  }
}

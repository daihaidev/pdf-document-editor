import actionTypes from '../../constants/actionTypes'

const initialState = {
  runTemplateWindowOpened: false,
  runObjectWindowOpened: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_RUN_TEMPLATE_RESULT_WINDOW:
      return {
        ...state,
        runTemplateWindowOpened: true,
        runObjectWindowOpened: false
      }
    case actionTypes.OPEN_RUN_OBJECT_RESULT_WINDOW:
      return {
        ...state,
        runObjectWindowOpened: true,
        runTemplateWindowOpened: false
      }
    case actionTypes.CLOSE_ALL_WINDOWS:
      return initialState
    default:
      return state
  }
}

import actionTypes from '../../constants/actionTypes'

export default (state = null, action) => {
  switch (action.type) {
    case actionTypes.SET_TEMPLATE_ID:
      return action.templateId
    default:
      return state
  }
}

import actionTypes from '../../constants/actionTypes'

export function setTemplateId(templateId) {
  return {
    type: actionTypes.SET_TEMPLATE_ID,
    templateId
  }
}

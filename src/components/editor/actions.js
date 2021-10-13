import actionTypes from '../../constants/actionTypes'

export function setIsTemplateModified(isTemplateModified) {
  return {
    type: actionTypes.SET_IS_TEMPLATE_MODIFIED,
    isTemplateModified
  }
}

export function setTemplateFileName(templateFileName) {
  return {
    type: actionTypes.SET_TEMPLATE_FILE_NAME,
    templateFileName
  }
}

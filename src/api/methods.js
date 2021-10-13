import Axios from 'axios';
import pdfCoApi from './config-pdfco'

export default {
  convertImageToPdf: (file) => {
    var formData = new FormData()
    formData.append("file", file);

    return pdfCoApi.post('pdf/convert/from/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  testTemplate: (template, url) => {
    return pdfCoApi.post('/pdf/documentparser/template-editor/template/test', {
      template: JSON.stringify(template),
      url
    })
  },
  convertTemplateToNewerVersion: template => {
    return pdfCoApi.post('/pdf/documentparser/template-editor/template/convert', {
      template,
      outputFormat: "JSON"
    })
  },
  uploadFileBase64: file => pdfCoApi.post('file/upload/base64', { file: file }),
  detectMacro: data => pdfCoApi.post('/pdf/documentparser/template-editor/template/detect-expression', data),
  detectFields: data => pdfCoApi.post('/pdf/documentparser/template-editor/template/detect-standard-fields', data),
  detectGridStructure: data => pdfCoApi.post('/pdf/documentparser/template-editor/get-grid-structure', data),
  getGlobalMacros: () => pdfCoApi.post('/pdf/documentparser/template-editor/get-global-macros'),
  getDocumentParserTemplate: (id) => pdfCoApi.get(`/pdf/documentparser/templates/${id}`, { params: { embedded_editor: 'true' } }),
  updateDocumentParserTemplate: (id, data) => pdfCoApi.post(
    `/pdf/documentparser/templates/${id}/update`,
    data
  ),
  createDocumentParserTemplate: (data) => pdfCoApi.post(
    `/pdf/documentparser/templates`,
    data
  ),
  uploadFileFromUrl: url => pdfCoApi.post('file/upload/url', { url }),
  getSampleTemplate: (templateUrl) => Axios.get(templateUrl, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
}

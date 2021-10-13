import React from 'react'
import ReactDOM from "react-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Modal, Button } from 'react-bootstrap'

import { closeAllModals } from './actions'
import { changeTemplatePriority, changeTemplateCulture, changeTemplateOcrMode, changeTemplateOcrLanguage } from '../template/actions'

import classNames from 'classnames'

class TemplateSettingsModal extends React.Component {
  render() {
    const culturesOptions = cultures.map(el => <option key={el[0]} value={el[0]}>{el[0]} - {el[1]}</option>)

    return (
      <Modal show={this.props.templateSettingsModalOpened} onHide={this.props.closeAllModals} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Template settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group row">
            <label className="col-sm-5 col-form-label">Template version</label>
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control"
                placeholder="Template version"
                value={this.props.templateVersion}
                disabled={true}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-5 col-form-label">Template priority</label>
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control"
                placeholder="Template priority"
                value={this.props.templatePriority}
                onChange={e => this.props.changeTemplatePriority(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-5 col-form-label">Culture</label>
            <div className="col-sm-7">
              <select
                name="templateCulture"
                id="templateCulture"
                className="form-control"
                value={this.props.culture}
                onChange={e => this.props.changeTemplateCulture(e.target.value)}
              >
                {culturesOptions}
              </select>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-5 col-form-label">OCR Mode</label>
            <div className="col-sm-7">
              <select
                name="templateOcrMode"
                id="templateOcrMode"
                className="form-control"
                value={this.props.ocrMode}
                onChange={e => this.props.changeTemplateOcrMode(e.target.value)}
              >
                <option value="auto">Auto</option>
                <option value="forced">Forced</option>
                <option value="repairFonts">Repair Fonts</option>
              </select>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-5 col-form-label">OCR Language</label>
            <div className="col-sm-7">
              <select
                name="templateOcrLanguage"
                id="templateOcrLanguage"
                className="form-control"
                value={this.props.ocrLanguage}
                onChange={e => this.props.changeTemplateOcrLanguage(e.target.value)}
              >
                <option value="deu">German</option>
                <option value="eng">English</option>
                <option value="fra">French</option>
                <option value="nld">Dutch</option>
                <option value="spa">Spanish</option>
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.closeAllModals}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


function mapStateToProps(state) {
  return {
    templateSettingsModalOpened: state.modals.templateSettingsModalOpened,
    templatePriority: state.template.templatePriority,
    templateVersion: state.template.templateVersion,
    ocrMode: state.template.options && state.template.options.ocrMode,
    culture: state.template.culture,
    ocrLanguage: state.template.options && state.template.options.ocrLanguage
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    closeAllModals,
    changeTemplatePriority,
    changeTemplateCulture,
    changeTemplateOcrMode,
    changeTemplateOcrLanguage
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateSettingsModal)

const cultures = [
  [ "bg-BG", "Bulgarian" ],
  [ "zh-CN", "Chinese (China)" ],
  [ "zh-HK", "Chinese (Hong Kong)" ],
  [ "zh-TW", "Chinese (Taiwan)" ],
  [ "cs-CZ", "Czech" ],
  [ "nl-NL", "Dutch (Netherlands)" ],
  [ "en-AU", "English (Australia)" ],
  [ "en-CA", "English (Canada)" ],
  [ "en-IN", "English (India)" ],
  [ "en-SG", "English (Singapore)" ],
  [ "en-GB", "English (UK)" ],
  [ "en-US", "English (United States)" ],
  [ "fi-FI", "Finnish" ],
  [ "fr-CA", "French (Canada)" ],
  [ "fr-FR", "French (France)" ],
  [ "de-DE", "German" ],
  [ "el-GR", "Greek" ],
  [ "hi-IN", "Hindi" ],
  [ "it-IT", "Italian" ],
  [ "ja-JP", "Japanese" ],
  [ "kk-KZ", "Kazakh" ],
  [ "ko-KR", "Korean" ],
  [ "nb-NO", "Norwegian" ],
  [ "pl-PL", "Polish" ],
  [ "pt-BR", "Portuguese (Brazil)" ],
  [ "pt-PT", "Portuguese (Portugal)" ],
  [ "ru-RU", "Russian" ],
  [ "sk-SK", "Slovak" ],
  [ "es-MX", "Spanish (Mexico)" ],
  [ "es-ES", "Spanish (Spain)" ],
  [ "th-TH", "Thai" ],
  [ "tr-TR", "Turkish" ],
  [ "vi-VN", "Vietnamese" ],
]

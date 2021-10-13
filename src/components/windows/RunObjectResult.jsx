import React from 'react'
import ReactDOM from "react-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { closeAllWindows } from './actions'

import RunObjectResultGrid from './elements/RunObjectResultGrid'

class RunObjectResult extends React.Component {
  render() {
    const extractedText = this.props.runTemplateResult.documentText && this.props.runTemplateResult.documentText.replace(/(\r\n|\n|\r)/gm, "<br>")
    const jsonResult    = this.props.runTemplateResult.jsonResult && JSON.parse(this.props.runTemplateResult.jsonResult.replace(/(\r\n|\n|\r)/gm, ""))
    const yamlResult    = this.props.runTemplateResult.yamlResult && this.props.runTemplateResult.yamlResult.replace(/(\r\n|\n|\r)/gm, "<br>")
    const csvResult     = this.props.runTemplateResult.csvResult && this.props.runTemplateResult.csvResult.replace(/(\r\n|\n|\r)/gm, "<br>")

    return (
      <div id="run-object-result-window" className="collapsible-window bg-warning">
        <div className="collapsible-window-header">
          Testing <strong>"{jsonResult && jsonResult["objects"][0] && jsonResult["objects"][0]["name"]}"</strong>
          <button onClick={this.props.closeAllWindows} className="close text-danger">[close]</button>
        </div>
        <div className="collapsible-window-body">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="code mT-20">
                  {jsonResult && <RunObjectResultGrid objects={jsonResult["objects"]} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    runTemplateResult: state.pdfViewer.runTemplateResult,
    template: state.template
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    closeAllWindows
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RunObjectResult)

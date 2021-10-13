import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactCursorPosition from "react-cursor-position";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import classNames from "classnames";

import {
  setPdfPage,
  setPdfScale,
  setCanvasMarginLeft,
  setCanvasDimensions,
  setCanvasCurrentPageOriginalDimensions,
} from "./components/pdfViewer/actions.jsx";
import { getTemplate } from "./components/template/actions";
import PageLoader from "./components/pageLoader/PageLoader.jsx";
import TemplateSettingsModal from "./components/modals/TemplateSettingsModal.jsx";
import EditTemplateModal from "./components/modals/EditTemplateModal.jsx";
import MacrosModal from "./components/modals/MacrosModal.jsx";
import SelectGridCellModal from "./components/modals/SelectGridCellModal.jsx";

import RunTemplateResult from "./components/windows/RunTemplateResult";
import RunObjectResult from "./components/windows/RunObjectResult";
import PdfViewer from "./components/pdfViewer/PdfViewer.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import "./Home.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-widgets/dist/css/react-widgets.css";
import { matchPath } from "react-router-dom";
import { VERSION } from "./version";
import Guide from "./components/guide/guide.js";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      unloadAlert: true,
      sidebarCollapse: true,
    };

    this.handleExpandSidebar = this.handleExpandSidebar.bind(this);
    this.handleCollapseSidebar = this.handleCollapseSidebar.bind(this);
  }

  disableUnloadAlert = () => {
    this.state.unloadAlert = false;
  };

  componentDidMount = () => {
    var self = this;

    window.addEventListener("beforeunload", function (e) {
      if (self.props.isTemplateModified && self.state.unloadAlert) {
        e.preventDefault();
        e.returnValue = "";
      }
    });

    if (
      !!matchPath(
        this.props.location.pathname,
        "/document-parser/templates/:id/editor"
      )
    ) {
      this.props.getTemplate(this.props.match.params.id);
    }
  };

  handleExpandSidebar(event) {
    this.setState({ sidebarCollapse: false });
  }

  handleCollapseSidebar(event) {
    this.setState({ sidebarCollapse: true });
  }

  render() {
    const windowOpened =
      this.props.runTemplateWindowOpened || this.props.runObjectWindowOpened;
    const pdfViewerWrapperClasses = classNames(
      `${
        this.state.sidebarCollapse ? "col-lg-9" : "col-lg-6"
      } pdf-viewer-wrapper`,
      {
        divided: windowOpened,
      }
    );

    return (
      <div className="App">
        <div className="title-bar">
          {this.props.templateFileName}{" "}
          {this.props.templateFileName && this.props.pdfFileName && "-"}{" "}
          {this.props.pdfFileName}
        </div>
        <span className="version">
          v. {VERSION}{" "}
          <a href="https://app.pdf.co">return to pdf.co document parser</a>
        </span>
        <div className="row">
          <div
            className={`${
              this.state.sidebarCollapse ? "col-lg-3" : "col-lg-6"
            } dashboard-wrapper`}
          >
            <Dashboard
              disableUnloadAlert={this.disableUnloadAlert}
              handleEnterExpandArea={this.handleExpandSidebar}
              handleLeaveExpandArea={this.handleCollapseSidebar}
            />
          </div>
          <div className={pdfViewerWrapperClasses}>
            <div className="pdf-viewer">
              <ReactCursorPosition
                ref={(rcp) => (this.reactCursorPositionRef = rcp)}
              >
                <PdfViewer
                  pdfFile={this.props.pdfFile}
                  pdfUrl={this.props.pdfUrl}
                  convertingToPdf={this.props.convertingToPdf}
                  setPdfPage={this.props.setPdfPage}
                  setPdfScale={this.props.setPdfScale}
                  currentEditorPage={this.props.page}
                  currentEditorScale={this.props.scale}
                  setCanvasMarginLeft={this.props.setCanvasMarginLeft}
                  setCanvasDimensions={this.props.setCanvasDimensions}
                  setCanvasCurrentPageOriginalDimensions={
                    this.props.setCanvasCurrentPageOriginalDimensions
                  }
                  canvasMarginLeft={this.props.canvasMarginLeft}
                  canvasWidth={this.props.canvasWidth}
                  canvasHeight={this.props.canvasHeight}
                  currentPageOriginalHeight={
                    this.props.currentPageOriginalHeight
                  }
                  currentPageOriginalWidth={this.props.currentPageOriginalWidth}
                  currentPageOriginalRotationAngle={
                    this.props.currentPageOriginalRotationAngle
                  }
                  reactCursorPositionRef={this.reactCursorPositionRef}
                />
              </ReactCursorPosition>
            </div>
            {this.props.runTemplateWindowOpened && <RunTemplateResult />}
            {this.props.runObjectWindowOpened && <RunObjectResult />}
          </div>
        </div>

        <TemplateSettingsModal />
        <EditTemplateModal />
        <MacrosModal />
        <SelectGridCellModal />

        <PageLoader />
        <div className="guide">
          <Guide />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pdfFile: state.pdfViewer.file,
    pdfUrl: state.pdfViewer.url,
    page: state.pdfViewer.page,
    scale: state.pdfViewer.scale,
    convertingToPdf: state.pdfViewer.convertingToPdf,
    canvasMarginLeft: state.pdfViewer.canvasMarginLeft,
    canvasWidth: state.pdfViewer.canvasWidth,
    canvasHeight: state.pdfViewer.canvasHeight,
    currentPageOriginalHeight: state.pdfViewer.currentPageOriginalHeight,
    currentPageOriginalWidth: state.pdfViewer.currentPageOriginalWidth,
    currentPageOriginalRotationAngle:
      state.pdfViewer.currentPageOriginalRotationAngle,
    runTemplateWindowOpened: state.windows.runTemplateWindowOpened,
    runObjectWindowOpened: state.windows.runObjectWindowOpened,
    isTemplateModified: state.editor.isTemplateModified,
    pdfFileName: state.pdfViewer.pdfFileName,
    templateFileName: state.editor.templateFileName,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setPdfPage,
      setPdfScale,
      setCanvasMarginLeft,
      setCanvasDimensions,
      setCanvasCurrentPageOriginalDimensions,
      getTemplate,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

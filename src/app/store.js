import { configureStore } from '@reduxjs/toolkit';
import pdfViewerReducer from '../components/pdfViewer/reducer.jsx';
import templateReducer from '../components/template/reducer.jsx';
import modalsReducer from '../components/modals/reducer.jsx';
import dashboardReducer from '../components/dashboard/reducer.jsx';
import windowsReducer from '../components/windows/reducer.jsx';
import editorReducer from '../components/editor/reducer.jsx'
import templateIdReducer from '../components/templateId/reducer.jsx';
import thunk from 'redux-thunk';

export default configureStore({
  reducer: {
    pdfViewer: pdfViewerReducer,
    template: templateReducer,
    modals: modalsReducer,
    dashboard: dashboardReducer,
    editor: editorReducer,
    windows: windowsReducer,
    templateId: templateIdReducer
  },
  middleware: [thunk]
});


import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import history from './history';
import HttpsRedirect from 'react-https-redirect';

const App = () => {
  return (
    <HttpsRedirect>
      <Router history={history}>
        <Routes />
      </Router>
    </HttpsRedirect>
  );
};

export default App;

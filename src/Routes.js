
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';

const Routes = () => {
  return (
    <Switch>
      {/* <Route path="/document-parser/templates/:id/edit" component={Home} /> */}
      <Route path="/document-parser/templates/:id/editor" component={Home} />
      <Route path="/document-parser/templates/new" component={Home} />
      <Route exact path="/editor/" component={Home} />
      <Route exact path="/" component={Home} />
    </Switch>
  );
};

export default Routes;

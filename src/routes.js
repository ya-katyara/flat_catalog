import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import App from './App';
import AppAdm from './AppAdm';

export default function Routes() {
    return (
      <Router>
          <Route exact path="/" component={App} />
          <Route exact path="/catalog" component={App} />
          <Route path="/adm" component={AppAdm} />
      </Router>
    );
  }

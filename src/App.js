import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import {
  LinearProgress,
} from '@material-ui/core';

import './App.css';


// Dynamic/Lazy loading
const LoginComponent = React.lazy(
  () => import('src/components')
    .then(module => ({ default: module.LoginComponent }))
)
const ChatComponent = React.lazy(
  () => import('src/components')
    .then( module => ({default: module.ChatComponent}))
)




function App() {



  return (
    <React.Fragment>
      <Suspense fallback={<LinearProgress />}>
        <Router>
          <Switch>
            <Route exact path="/login" component={LoginComponent} />
            <Route exact path="/chat" component={ChatComponent} />
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route path="*" render={() => <Redirect to="/" />} />
          </Switch>
        </Router>
      </Suspense>
    </React.Fragment>
  );
}

export default App;

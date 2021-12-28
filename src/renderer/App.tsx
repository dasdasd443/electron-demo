import { Card, Grid, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import TitleBar from './components/grid/titleBar';
import Home from './components/pages/home';
import Login from './components/pages/login';
import Register from './components/pages/register';
import store from './redux/store';

const App = () => {
  const [authenticated, setAuthenticated] = useState(
    store.getState().auth.value
  );
  store.subscribe(() => {
    setAuthenticated(store.getState().auth.value);
  });
  const CenterGrid = withStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })(Grid);
  return (
    <Router>
      <TitleBar />
      <Switch>
        <CenterGrid container style={{ height: '94vh' }}>
          {authenticated ? (
            <CenterGrid style={{ height: '100%' }} item xs={2}>
              <h1>This is a menu</h1>
            </CenterGrid>
          ) : null}
          <CenterGrid
            style={{ height: '100%' }}
            item
            xs={authenticated ? 10 : 12}
          >
            <Route path="/" exact component={Home} />
            <Route path="/login" key="login" component={Login} />
            <Route path="/register" key="register" component={Register} />
          </CenterGrid>
        </CenterGrid>
      </Switch>
    </Router>
  );
};

export default App;

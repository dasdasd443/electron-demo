import { Card, Grid, withStyles } from '@material-ui/core';
import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import Home from './components/pages/home';
import Login from './components/pages/login';
import Register from './components/pages/register';

const App = () => {
  const CenterGrid = withStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })(Grid);
  return (
    <Router>
      <Switch>
        <CenterGrid
          container
          style={{
            height: '100vh',
          }}
        >
          <CenterGrid style={{ height: '100%' }} item xs={12}>
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

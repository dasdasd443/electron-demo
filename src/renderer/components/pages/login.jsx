import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { AccountCircle, LockOpen } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import React, { useCallback, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import FormButtonBlack from '../buttons/formButtonBlack';

export default function Login() {
  const history = useHistory();
  const LoginTextField = withStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1rem',
      color: 'black',
    },
  })(Typography);
  const CenterGrid = withStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })(Grid);
  const [loading, setLoading] = useState(false);
  const LoginFunction = useCallback(() => {
    let error = 0;
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    error = username === '' ? 1 : 0;
    error = password === '' ? 2 : 0;
    if (error === 0) {
      const userList = JSON.parse(localStorage.getItem('users'));
      if (userList !== null) {
        if (userList.some((user) => user.username === username)) {
          userList.forEach((user) => {
            if (user.username === username) {
              if (user.password === password) {
                localStorage.setItem('cur-user', JSON.stringify(user));
              } else if (user.password !== password) {
                error = 4;
              }
            }
          });
        } else {
          error = 3;
        }
      }
    }
    const login = new Promise((resolve, reject) => {
      setLoading(true);
      if (error === 0) {
        setTimeout(() => {
          return resolve(true);
        }, 2000);
      } else {
        setTimeout(() => {
          // eslint-disable-next-line prefer-promise-reject-errors
          return reject(error);
        }, 2000);
      }
    });
    login
      .then((res) => {
        setLoading(false);
        history.push('/');
        return res;
      })
      .catch((rej) => {
        setLoading(false);
        return rej;
      });
  });
  return (
    <>
      {!loading ? (
        <CenterGrid container>
          <CenterGrid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent style={{ padding: '1.5rem' }}>
                <CenterGrid container spacing={2}>
                  <CenterGrid item xs={12}>
                    <LoginTextField>
                      <AccountCircle />
                    </LoginTextField>
                  </CenterGrid>
                  <CenterGrid item xs={12}>
                    <LoginTextField style={{ width: '100%' }}>
                      <AccountCircle
                        style={{ position: 'relative', bottom: '-10px' }}
                      />
                      <TextField
                        id="username"
                        style={{ width: '100%' }}
                        label="Username"
                      />
                    </LoginTextField>
                  </CenterGrid>
                  <CenterGrid item xs={12}>
                    <LoginTextField style={{ width: '100%' }}>
                      <LockOpen
                        style={{ position: 'relative', bottom: '-10px' }}
                      />
                      <TextField
                        id="password"
                        style={{ width: '100%' }}
                        type="password"
                        label="Password"
                      />
                    </LoginTextField>
                  </CenterGrid>
                  <CenterGrid item xs={12}>
                    <LoginTextField style={{ width: '100%' }}>
                      <FormButtonBlack text="Login" action={LoginFunction} />
                    </LoginTextField>
                  </CenterGrid>
                </CenterGrid>
              </CardContent>
              <CardContent style={{ padding: '1.5rem' }}>
                <CenterGrid>
                  <Typography align="center">
                    Don`t have an account? Click{' '}
                    <Link to="/register">here</Link> to to sign up
                  </Typography>
                </CenterGrid>
              </CardContent>
            </Card>
          </CenterGrid>
        </CenterGrid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}

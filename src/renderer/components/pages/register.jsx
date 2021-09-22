import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  createTheme,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { AccountCircle, Info, LockOpen } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import FormButtonBlack from '../buttons/formButtonBlack';

export default function Register() {
  const RegisterTextField = withStyles({
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
  const RegisterFunction = useCallback(() => {
    let userList = JSON.parse(localStorage.getItem('users'));
    userList = userList === null ? [] : userList;
    const user = {
      id: uuidv4(),
      username: document.querySelector('#username').value,
      password: document.querySelector('#password').value,
      firstName: document.querySelector('#firstname').value,
      lastName: document.querySelector('#lastname').value,
    };
    if (
      user.username !== '' &&
      user.password !== '' &&
      user.firstName !== '' &&
      user.lastName !== ''
    ) {
      setLoading(true);
      userList.push(user);
      localStorage.setItem('users', JSON.stringify(userList));
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
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
                    <RegisterTextField>
                      <AccountCircle />
                    </RegisterTextField>
                  </CenterGrid>
                  <CenterGrid item xs={12}>
                    <RegisterTextField style={{ width: '100%' }}>
                      <TextField
                        id="firstname"
                        style={{ width: '100%' }}
                        label="First Name"
                      />
                    </RegisterTextField>
                  </CenterGrid>
                  <CenterGrid item xs={12}>
                    <RegisterTextField style={{ width: '100%' }}>
                      <TextField
                        id="lastname"
                        style={{ width: '100%' }}
                        label="Last Name"
                      />
                    </RegisterTextField>
                  </CenterGrid>
                  <CenterGrid item xs={12}>
                    <RegisterTextField style={{ width: '100%' }}>
                      <TextField
                        id="username"
                        style={{ width: '100%' }}
                        label="Username"
                      />
                    </RegisterTextField>
                  </CenterGrid>
                  <CenterGrid item xs={12}>
                    <RegisterTextField style={{ width: '100%' }}>
                      <TextField
                        id="password"
                        type="password"
                        style={{ width: '100%' }}
                        label="Password"
                      />
                    </RegisterTextField>
                  </CenterGrid>
                  <CenterGrid item xs={12}>
                    <RegisterTextField style={{ width: '100%' }}>
                      <FormButtonBlack
                        text="Register"
                        action={RegisterFunction}
                      />
                    </RegisterTextField>
                  </CenterGrid>
                </CenterGrid>
              </CardContent>
              <CardContent style={{ padding: '1.5rem' }}>
                <CenterGrid>
                  <Typography align="center">
                    Already have an account? Click <Link to="/login">here</Link>{' '}
                    to to log in
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

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Fade,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { AccountCircle, LockOpen } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import store from 'renderer/redux/store';
import FormButtonBlack from '../buttons/formButtonBlack';
import CenterGrid from '../grid/centerGrid';
import TitleBar from '../grid/titleBar';
import RegisterTextField from '../input/registerTextField';
import StyledInput from '../input/StyledInput';
import {
  bgColor,
  bgColor2,
  color,
  color2,
} from '../variables/backgroundVariables';
import { setTrue, setFalse } from '../../redux/counter/counter';
import LoginFunction from '../functions/login-function';

export default function Login() {
  const [loading, setLoading] = useState(store.getState().loading.value);
  const dispatch = useDispatch();
  const history = useHistory();
  store.subscribe(() => {
    setLoading(store.getState().loading.value);
  });
  return (
    <>
      {!loading ? (
        <CenterGrid container>
          <CenterGrid item xs={12} sm={6} md={4}>
            <Fade in>
              <Card style={{ backgroundColor: bgColor2 }}>
                <CardContent style={{ padding: '1.5rem' }}>
                  <CenterGrid container spacing={2}>
                    {[
                      {
                        id: 1,
                        content: (
                          <RegisterTextField>
                            <AccountCircle style={{ color: color2 }} />
                          </RegisterTextField>
                        ),
                      },
                      {
                        id: 2,
                        content: (
                          <RegisterTextField style={{ width: '100%' }}>
                            <AccountCircle
                              style={{
                                position: 'relative',
                                bottom: '-10px',
                                color: color2,
                              }}
                            />
                            <StyledInput
                              id="username"
                              style={{ width: '100%' }}
                              label="Username"
                            />
                          </RegisterTextField>
                        ),
                      },
                      {
                        id: 3,
                        content: (
                          <RegisterTextField style={{ width: '100%' }}>
                            <LockOpen
                              style={{
                                position: 'relative',
                                bottom: '-10px',
                                color: color2,
                              }}
                            />
                            <StyledInput
                              id="password"
                              style={{ width: '100%' }}
                              type="password"
                              label="Password"
                            />
                          </RegisterTextField>
                        ),
                      },
                      {
                        id: 4,
                        content: (
                          <RegisterTextField style={{ width: '100%' }}>
                            <FormButtonBlack
                              text="Login"
                              action={() => LoginFunction(dispatch, history)}
                            />
                          </RegisterTextField>
                        ),
                      },
                    ].map((item) => {
                      return (
                        <CenterGrid key={item.id} item xs={12}>
                          {item.content}
                        </CenterGrid>
                      );
                    })}
                  </CenterGrid>
                </CardContent>
                <CardContent style={{ padding: '1.5rem' }}>
                  <CenterGrid>
                    <Typography align="center" style={{ color: color2 }}>
                      Don`t have an account? Click{' '}
                      <Link
                        to="/register"
                        style={{ textDecoration: 'none', color }}
                      >
                        here
                      </Link>{' '}
                      to to sign up
                    </Typography>
                  </CenterGrid>
                </CardContent>
              </Card>
            </Fade>
          </CenterGrid>
        </CenterGrid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  createTheme,
  Fade,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { AccountCircle, Info, LockOpen } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import store from 'renderer/redux/store';
import FormButtonBlack from '../buttons/formButtonBlack';
import StyledInput from '../input/StyledInput';
import {
  bgColor,
  bgColor2,
  color,
  color2,
} from '../variables/backgroundVariables';
import CenterGrid from '../grid/centerGrid';
import RegisterTextField from '../input/registerTextField';
import RegisterFunction from '../functions/register-function';

export default function Register() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(store.getState().loading.value);
  store.subscribe(() => {
    setLoading(store.getState().loading.value);
  });
  return (
    <>
      {!loading ? (
        <CenterGrid container>
          <CenterGrid item xs={12} sm={6} md={4}>
            <Fade in>
              <Card style={{ borderRadius: 0 }}>
                <CardContent
                  style={{
                    borderRadius: 0,
                    padding: '1.5rem',
                    backgroundColor: bgColor2,
                  }}
                >
                  <CenterGrid container spacing={2}>
                    <CenterGrid item xs={12}>
                      <RegisterTextField>
                        <AccountCircle style={{ color: color2 }} />
                      </RegisterTextField>
                    </CenterGrid>
                    {[
                      { id: 'firstname', label: 'First Name', type: 'text' },
                      { id: 'lastname', label: 'Last Name', type: 'text' },
                      { id: 'username', label: 'Username', type: 'text' },
                      { id: 'password', label: 'Password', type: 'password' },
                    ].map((item) => {
                      return (
                        <CenterGrid key={item.id} item xs={12}>
                          <RegisterTextField style={{ width: '100%' }}>
                            <StyledInput
                              id={item.id}
                              style={{ width: '100%' }}
                              label={item.label}
                              type={item.type}
                            />
                          </RegisterTextField>
                        </CenterGrid>
                      );
                    })}
                    <CenterGrid item xs={12}>
                      <RegisterTextField style={{ width: '100%' }}>
                        <FormButtonBlack
                          text="Register"
                          action={() =>
                            RegisterFunction(
                              dispatch,
                              history,
                              document.querySelector('#username').value,
                              document.querySelector('#password').value,
                              document.querySelector('#firstname').value,
                              document.querySelector('#lastname').value
                            )
                          }
                        />
                      </RegisterTextField>
                    </CenterGrid>
                  </CenterGrid>
                </CardContent>
                <CardContent
                  style={{ padding: '1.5rem', backgroundColor: bgColor2 }}
                >
                  <CenterGrid>
                    <Typography align="center" style={{ color: color2 }}>
                      Already have an account? Click{' '}
                      <Link
                        to="/login"
                        style={{ textDecoration: 'none', color: color2 }}
                      >
                        here
                      </Link>{' '}
                      to to log in
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

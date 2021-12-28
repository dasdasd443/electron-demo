import {
  Avatar,
  CardContent,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Close, CropSquare, Minimize } from '@material-ui/icons';
import React from 'react';
import { bgColor2, color2 } from '../variables/backgroundVariables';
import IMG from '../images/qweqwe.jpg';

const TitleBar = () => {
  const bgColor = '#1B1D23';
  const bgText = '#949AA7';
  const MenuIcon = makeStyles((theme) => ({
    iconContainer: {
      '&:hover $icon': {
        backgroundColor: 'blue',
      },
    },
  }));
  const useStyles = makeStyles((theme) => ({
    customHoverFocus: {
      '&:hover, &.Mui-focusVisible': {
        backgroundColor: 'rgba(0,0,0,0.8)',
        color: 'black',
      },
    },
  }));
  const styles = useStyles();

  return (
    <CardContent
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: bgColor,
        color: bgText,
        margin: 0,
        padding: '0px',
      }}
    >
      <Typography
        style={{
          padding: '0 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '.5rem',
        }}
      >
        <Avatar src={IMG} style={{ margin: '5px', width: 30, height: 30 }} />
        VTFaded
      </Typography>
      <Typography>
        <IconButton
          style={{
            padding: '5px',
            margin: '0',
            color: bgText,
            borderRadius: 0,
          }}
          className={styles.customHoverFocus}
          onClick={() => {
            window.electron.ipcRenderer.minimize();
          }}
        >
          <Minimize />
        </IconButton>
        <IconButton
          style={{
            padding: '5px',
            margin: '2px',
            color: bgText,
            borderRadius: 0,
          }}
          className={styles.customHoverFocus}
          onClick={() => {
            window.electron.ipcRenderer.maximize();
          }}
        >
          <CropSquare className={MenuIcon.icon} />
        </IconButton>
        <IconButton
          style={{
            padding: '5px',
            margin: '2px',
            color: bgText,
            borderRadius: 0,
          }}
          className={styles.customHoverFocus}
          onClick={() => {
            window.electron.ipcRenderer.close();
          }}
        >
          <Close />
        </IconButton>
      </Typography>
    </CardContent>
  );
};

export default TitleBar;

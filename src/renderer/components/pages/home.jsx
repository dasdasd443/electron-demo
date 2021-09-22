/* eslint-disable @typescript-eslint/naming-convention */
import {
  Backdrop,
  Button,
  Card,
  CardContent,
  CircularProgress,
  createTheme,
  Grid,
  Grow,
  IconButton,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  AccountCircle,
  Add,
  CheckCircle,
  ExitToApp,
  Search,
} from '@material-ui/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { styled } from '@material-ui/styles';
import FormButtonBlack from '../buttons/formButtonBlack';
import CollectionItem from '../card/collectionItem';

export default function Home() {
  const theme = createTheme();
  const bgColor = '#0F4C75';
  const color = theme.palette.getContrastText(bgColor);
  const bgColor2 = '#BBE1FA';
  const color2 = theme.palette.getContrastText(bgColor2);
  const user = JSON.parse(localStorage.getItem('cur-user'));
  const [randomKey, setRandomKey] = useState(Math.random());
  const CenterGrid = withStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })(Grid);
  const DisplayTextField = withStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1rem',
      position: 'relative',
    },
  })(Typography);
  const [collection, setCollection] = useState(
    JSON.parse(localStorage.getItem('collection'))
  );
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const Logout = useCallback(() => {
    const logout = new Promise((resolve, reject) => {
      localStorage.removeItem('cur-user');
      setLoading(true);
      setTimeout(() => {
        return resolve(true);
      }, 2000);
    });
    // eslint-disable-next-line promise/catch-or-return
    logout.then((res) => {
      setLoading(false);
      history.push('/login');
      return res;
    });
  });
  const AddToCollection = useCallback(() => {
    const image = ['jpg', 'jpeg', 'png', 'gif'];
    const video = ['youtube', 'yt'];
    const url = document.querySelector('#urlField').value;

    const image_test = image.some((img) => url.includes(img));
    const video_test = video.some((vid) => url.includes(vid));

    // eslint-disable-next-line no-nested-ternary
    const type = image_test ? 'image' : video_test ? 'video' : 'website';
    const item = {
      user: user.id,
      link: document.querySelector('#urlField').value,
      date: new Date(),
      itemId: uuidv4(),
      type,
    };
    if (collection === null) {
      const collectionarray = [];
      collectionarray.push(item);
      localStorage.setItem('collection', JSON.stringify(collectionarray));
    } else {
      collection.push(item);
      localStorage.setItem('collection', JSON.stringify(collection));
      setCollection(collection);
    }
    setRandomKey(Math.random());
  });
  useEffect(() => {}, [collection]);
  const StyledInput = styled(TextField)({
    '& label.Mui-focused': {
      color: color2,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: color2,
    },
    '& .MuiInputBase-input': {
      position: 'relative',
      fontSize: 16,
      color: color2,
    },
  });
  const [search, setSearch] = useState('');
  const [searchCollection, setSearchCollection] = useState(0);
  const SearchFunction = useCallback(() => {
    console.log(5);
  });

  const [deleteBackdrop, setDeleteBackdrop] = useState(false);
  const DeleteFunction = useCallback((itemId) => {
    const newCollection = collection.filter(
      (colItem) => colItem.itemId !== itemId
    );
    setCollection(newCollection);
    localStorage.setItem('collection', JSON.stringify(newCollection));
    setDeleteBackdrop(!deleteBackdrop);
    setTimeout(() => {
      setDeleteBackdrop(false);
    }, 1000);
  });
  return (
    <>
      {user !== null ? (
        <>
          {!loading ? (
            <Grid style={{ height: '100%', overflowX: 'hidden' }} container>
              <Grid item xs={12} key={randomKey}>
                <Scrollbars>
                  <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={12} sm={10}>
                      <Card
                        style={{
                          position: 'relative',
                          overflow: 'visible',
                          borderRadius: 0,
                          zIndex: 1,
                        }}
                      >
                        <p
                          style={{
                            width: 0,
                            height: 0,
                            borderTop: `50px solid transparent`,
                            borderBottom: `50px solid transparent`,
                            transform: 'rotateZ(-45deg)',
                            borderLeft: `50px solid ${bgColor}`,
                            position: 'absolute',
                            right: '-7px',
                            top: '-35px',
                          }}
                        />
                        <Backdrop
                          style={{ zIndex: 9999999 }}
                          open={deleteBackdrop}
                        >
                          <Grow in={deleteBackdrop}>
                            <Typography
                              style={{
                                color: 'green',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <CheckCircle />
                              Deleted!
                            </Typography>
                          </Grow>
                        </Backdrop>
                        <CardContent
                          style={{
                            backgroundColor: bgColor2,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            color: color2,
                          }}
                        >
                          <DisplayTextField
                            style={{ justifyContent: 'space-between' }}
                          >
                            <DisplayTextField variant="h6">
                              <>
                                <AccountCircle
                                  style={{
                                    color: color2,
                                  }}
                                />
                                {`${user.firstName} ${user.lastName}`}
                              </>
                            </DisplayTextField>
                            <DisplayTextField>
                              <IconButton onClick={Logout}>
                                <ExitToApp
                                  style={{
                                    color: color2,
                                  }}
                                />
                              </IconButton>
                            </DisplayTextField>
                          </DisplayTextField>
                          <hr style={{ borderTop: 'none' }} />
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Typography
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                              >
                                <StyledInput
                                  id="urlField"
                                  style={{
                                    width: '100%',
                                  }}
                                  variant="standard"
                                  placeholder="Link to a image, video, or any websites"
                                  label="URL"
                                  required
                                />
                                <IconButton
                                  style={{
                                    right: 0,
                                    color: color2,
                                  }}
                                  onClick={AddToCollection}
                                >
                                  <Add />
                                </IconButton>
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                              >
                                <StyledInput
                                  id="titleField"
                                  style={{
                                    width: '100%',
                                  }}
                                  variant="standard"
                                  placeholder="Search with title"
                                  label="Search"
                                  // value={search}
                                  // onChange={(event) =>
                                  //   setSearch(event.target.value)
                                  // }
                                />
                                <IconButton
                                  style={{
                                    right: 0,
                                    color: color2,
                                  }}
                                  onClick={SearchFunction}
                                >
                                  <Search />
                                </IconButton>
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                        <CardContent
                          style={{
                            backgroundColor: bgColor,
                            height: '150px',
                            width: '100%',
                            position: 'absolute',
                            bottom: '-5px',
                            left: '-5px',
                            zIndex: '-1',
                          }}
                        />
                      </Card>
                    </Grid>
                    <Grid item xs={10} sm={10} style={{ padding: '1rem' }}>
                      <Grid container spacing={2}>
                        {collection !== null
                          ? collection.map((item) => {
                              return item.type === 'video' &&
                                item.user === user.id ? (
                                <CollectionItem
                                  key={item.itemId}
                                  DeleteFunction={() =>
                                    DeleteFunction(item.itemId)
                                  }
                                  item={item}
                                  size={6}
                                />
                              ) : null;
                            })
                          : null}
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} style={{ padding: '1rem' }}>
                      <Grid container spacing={2}>
                        {collection !== null
                          ? collection.map((item) => {
                              return item.type === 'image' &&
                                item.user === user.id ? (
                                <CollectionItem
                                  key={item.id}
                                  item={item}
                                  size={4}
                                />
                              ) : null;
                            })
                          : null}
                      </Grid>
                    </Grid>
                  </Grid>
                </Scrollbars>
              </Grid>
            </Grid>
          ) : (
            <CircularProgress />
          )}
          ;
        </>
      ) : (
        <>{!loading ? <Redirect to="/login" /> : <CircularProgress />}</>
      )}
    </>
  );
}

/* eslint-disable promise/no-nesting */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable promise/catch-or-return */
/* eslint-disable react/prop-types */
import {
  CheckCircle,
  Close,
  Delete,
  DeleteForever,
  Edit,
  Visibility,
} from '@material-ui/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import $ from 'jquery';
import ReactPlayer from 'react-player';

const {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Modal,
  Fade,
  Box,
  CircularProgress,
  IconButton,
  CardHeader,
  Avatar,
  createTheme,
  Backdrop,
  Grow,
  TextField,
} = require('@material-ui/core');

// eslint-disable-next-line react/prop-types
const CollectionItem = ({ item, size, DeleteFunction }) => {
  const [collectionItem, setCollectionItem] = useState(item);
  const theme = createTheme();
  const bgColor = '#0F4C75';
  const bgColorText = theme.palette.getContrastText('#0F4C75');
  const bgColor2 = '#BBE1FA';
  const bgColor2Text = theme.palette.getContrastText('#BBE1FA');
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const yt_api = 'AIzaSyCSOCGM4TD2vkwNXBeKFD9YYYSm7p8GPS0';
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const vid_id = item.link.split('=')[1];
  const SetDetails = useCallback(async () => {
    if (item.details === undefined && item.type === 'image') {
      const newitem = {
        ...item,
        details: {
          description: 'No description',
          title: 'No title',
          localized: '',
          thumbnails: {
            high: item.link,
          },
          channelTitle: '',
          channel: {
            thumbnails: {
              high: item.link,
            },
          },
          // eslint-disable-next-line promise/no-nesting
          published: '',
        },
      };
      setCollectionItem(newitem);
      let collection = JSON.parse(localStorage.getItem('collection'));
      collection = collection.map((colItem) => {
        return colItem.itemId === item.itemId ? newitem : colItem;
      });
      localStorage.setItem('collection', JSON.stringify(collection));
    }
    if (item.details === undefined && item.type === 'video') {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${vid_id}&key=${yt_api}`
      )
        .then((res) => res.json())
        .then((res) => {
          const newitem = {
            ...item,
            details: {
              description: res.items[0].snippet.description,
              title: res.items[0].snippet.title,
              localized: res.items[0].snippet.localized,
              thumbnails: res.items[0].snippet.thumbnails,
              channelTitle: res.items[0].snippet.channelTitle,
              channel: res.items[0].snippet.channelId,
              // eslint-disable-next-line promise/no-nesting
              published: res.items[0].snippet.publishedAt,
            },
          };
          return newitem;
        })
        .then(async (newitem) => {
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${newitem.details.channel}&key=${yt_api}`
          )
            .then((json) => json.json())
            .then((json) => json.items[0].snippet);
          newitem.details.channel = response;
          setCollectionItem(newitem);
          return newitem;
        })
        .then((newitem) => {
          let collection = JSON.parse(localStorage.getItem('collection'));
          collection = collection.map((colItem) => {
            return colItem.itemId === item.itemId ? newitem : colItem;
          });
          localStorage.setItem('collection', JSON.stringify(collection));
          console.log(collectionItem);
          return newitem;
        });
    }
  });
  useEffect(() => {
    SetDetails();
  }, [item]);
  const [modalOpen, setModalOpen] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [editBackdrop, setEditBackdrop] = useState(false);
  const [titleEdit, setTitleEdit] = useState(false);
  const [title, setTitle] = useState(
    collectionItem.details !== undefined ? collectionItem.details.title : ''
  );
  const [descriptionEdit, setDescriptionEdit] = useState(false);
  const [description, setDescription] = useState(
    collectionItem.details !== undefined
      ? collectionItem.details.description
      : ''
  );
  const EditFunction = useCallback(() => {
    const collection = JSON.parse(localStorage.getItem('collection'));
    let index = 0;
    collection.forEach((colItem, idx) => {
      if (colItem.itemId === item.itemId) {
        index = idx;
      }
    });
    collectionItem.details.title = title;
    collectionItem.details.description = description;
    if (collectionItem.type === 'video') {
      collectionItem.details.localized.description = description;
      collectionItem.details.localized.title = title;
    }
    collection[index] = collectionItem;
    localStorage.setItem('collection', JSON.stringify(collection));
    setEditBackdrop(!editBackdrop);
    setTimeout(() => {
      setEditBackdrop(false);
    }, 1000);
  });
  const [imageHover, setImageHover] = useState(false);
  return (
    <Grid item xs={12} md={size} style={{ overflow: 'hidden' }}>
      <Card
        style={{
          borderRadius: '25px',
          position: 'relative',
          overflow: 'visible',
          zIndex: 1,
        }}
      >
        <Backdrop
          sx={{ color: '#fff', zIndex: 9999, position: 'absolute' }}
          open={backdrop}
        />
        <p
          style={{
            width: 0,
            height: 0,
            borderTop: `20px solid transparent`,
            borderBottom: `20px solid transparent`,
            transform: 'rotateZ(-45deg)',
            borderLeft: `20px solid ${bgColor}`,
            position: 'absolute',
            right: '-3px',
            top: '-13px',
          }}
        />
        <CardContent
          style={{
            overflow: 'hidden',
            borderRadius: item.type === 'video' ? '23px 0 0 0' : '0 0 0 0',
            backgroundColor: bgColor2,
            padding: '5px',
            position: 'relative',
          }}
        >
          <Fade
            in={imageHover}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: 'flex',
              zIndex: 99,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onMouseLeave={() => setImageHover(false)}
          >
            <Typography style={{ display: 'flex', gap: '1rem' }}>
              <IconButton
                onClick={() => {
                  setModalOpen(true);
                  setBackdrop(!backdrop);
                }}
              >
                <Visibility style={{ fontSize: '36px', color: '#42a5f5' }} />
              </IconButton>
              <IconButton onClick={DeleteFunction}>
                <DeleteForever style={{ fontSize: '36px', color: '#ef5350' }} />
              </IconButton>
            </Typography>
          </Fade>
          <Fade in={imageHover} onMouseLeave={() => setImageHover(false)}>
            <CardMedia
              component="img"
              style={{
                width: '98%',
                height: '97.5%',
                borderRadius: item.type === 'video' ? '23px 0 0 0' : '0',
                backgroundColor: 'rgba(0,0,0,0.5)',
                position: 'absolute',
                zIndex: 9,
              }}
            />
          </Fade>
          {collectionItem.type === 'video' &&
          collectionItem.details !== undefined ? (
            <>
              <CardMedia
                style={{
                  borderRadius: '23px 0 0 0',
                  '&:hover': { opacity: '0.5' },
                }}
                component="img"
                onMouseEnter={() => setImageHover(true)}
                image={collectionItem.details.thumbnails.high.url}
              />
            </>
          ) : (
            <CardMedia
              component="img"
              onMouseEnter={() => setImageHover(true)}
              image={collectionItem.link}
            />
          )}
        </CardContent>
        {collectionItem.details !== undefined ? (
          <CardContent
            style={{
              backgroundColor: bgColor2,
              color: bgColor2Text,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              borderRadius: '0 0 23px 23px',
            }}
          >
            {item.type === 'video' ? (
              <Typography
                style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
              >
                <Avatar
                  src={collectionItem.details.channel.thumbnails.high.url}
                />
                {collectionItem.details.channelTitle}
              </Typography>
            ) : null}
            <hr style={{ borderBottom: `1px solid ${bgColor2Text}` }} />
            <Typography variant="h6" style={{ lineHeight: 1.3 }}>
              {collectionItem.details.title}
            </Typography>
          </CardContent>
        ) : null}
      </Card>
      <Modal
        style={{ outline: `none` }}
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={modalOpen}
        onClose={() => setModalOpen(!modalOpen)}
        closeAfterTransition
      >
        <Grid
          container
          style={{ outline: `none`, height: '100vh' }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={11} sm={8} lg={6}>
            <Fade in={modalOpen}>
              <Scrollbars style={{ height: '90vh', width: '100%', zIndex: 1 }}>
                <Card>
                  <CardHeader
                    title={
                      <Typography
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                          }}
                        >
                          {collectionItem.details !== undefined &&
                          collectionItem.type === 'video' ? (
                            <>
                              <Avatar
                                src={
                                  collectionItem.details.channel.thumbnails.high
                                    .url
                                }
                              />
                              <Typography variant="h6">
                                {collectionItem.details.channelTitle}
                              </Typography>
                            </>
                          ) : (
                            <Typography variant="h6">
                              {collectionItem.title}
                            </Typography>
                          )}
                        </Typography>
                        <IconButton
                          onClick={() => {
                            setModalOpen(!modalOpen);
                            setBackdrop(!backdrop);
                          }}
                        >
                          <Close style={{ color: '#0F4C75' }} />
                        </IconButton>
                      </Typography>
                    }
                  />
                  <CardContent
                    style={{ padding: item.type === 'video' ? 0 : '15px' }}
                  >
                    {item.type === 'video' ? (
                      <ReactPlayer
                        width="100%"
                        style={{ zIndex: 5 }}
                        controls
                        url={collectionItem.link}
                      />
                    ) : (
                      <CardMedia component="img" image={collectionItem.link} />
                    )}
                  </CardContent>
                  {collectionItem.details !== undefined &&
                  collectionItem.type === 'image' ? (
                    <hr style={{ index: 0 }} />
                  ) : null}
                  {collectionItem.details !== undefined ? (
                    <CardContent
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                      }}
                    >
                      <Typography
                        variant="h6"
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        {!titleEdit ? (
                          <Typography
                            onClick={() => {
                              setTitleEdit(true);
                            }}
                          >
                            {title}{' '}
                          </Typography>
                        ) : (
                          <TextField
                            style={{ width: '100%' }}
                            autoFocus
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            onBlur={(event) => {
                              setTitleEdit(false);
                              EditFunction();
                            }}
                          />
                        )}
                        <Edit style={{ color: '#0F4C75' }} />
                        <Backdrop style={{ zIndex: 9999 }} open={editBackdrop}>
                          <Grow in={editBackdrop}>
                            <Typography
                              style={{
                                color: 'green',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <CheckCircle />
                              Edited!
                            </Typography>
                          </Grow>
                        </Backdrop>
                      </Typography>
                      <hr />
                      {!descriptionEdit ? (
                        <Typography
                          id="description"
                          dangerouslySetInnerHTML={{
                            __html: description.replace(/\n/g, '<br />'),
                          }}
                          onClick={() => setDescriptionEdit(true)}
                        />
                      ) : (
                        <TextField
                          style={{ width: '100%' }}
                          autoFocus
                          value={description}
                          multiline
                          onChange={(event) =>
                            setDescription(event.target.value)
                          }
                          onBlur={() => {
                            EditFunction();
                            setDescriptionEdit(false);
                          }}
                        />
                      )}
                    </CardContent>
                  ) : (
                    <CircularProgress />
                  )}
                </Card>
              </Scrollbars>
            </Fade>
          </Grid>
        </Grid>
      </Modal>
    </Grid>
  );
};

export default CollectionItem;

/* eslint-disable react/prop-types */
import {
  Avatar,
  Backdrop,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Fade,
  Grid,
  Grow,
  IconButton,
  Modal,
  Typography,
} from '@material-ui/core';
import { CheckCircle, Close, Edit } from '@material-ui/icons';
import React, { useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import ReactPlayer from 'react-player';
import store from 'renderer/redux/store';
import StyledInput from '../input/StyledInput';
import {
  bgColor,
  bgColor2,
  color,
  color2,
} from '../variables/backgroundVariables';

// eslint-disable-next-line react/prop-types
const ItemModal = ({ collectionItem }) => {
  const [modalOpen, setModalOpen] = useState(store.getState().modal.value);
  const [backdrop, setBackdrop] = useState(store.getState().modal.value);
  store.subscribe(() => {
    setModalOpen(store.getState().modal.value);
    setBackdrop(store.getState().modal.value);
  });
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
  return (
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
                  style={{ backgroundColor: bgColor2 }}
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
                            <Typography variant="h6" style={{ color: color2 }}>
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
                        <Close style={{ color: color2 }} />
                      </IconButton>
                    </Typography>
                  }
                />
                <CardContent
                  style={{
                    padding: collectionItem.type === 'video' ? 0 : '15px',
                  }}
                >
                  {collectionItem.type === 'video' ? (
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
                  <hr
                    style={{ index: 0, borderBottom: `1px solid ${bgColor}` }}
                  />
                ) : null}
                {collectionItem.details !== undefined ? (
                  <CardContent
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                      backgroundColor: bgColor2,
                      color: color2,
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
                        <StyledInput
                          style={{ width: '100%' }}
                          autoFocus
                          value={title}
                          onChange={(event) => setTitle(event.target.value)}
                          onBlur={(event) => {
                            setTitleEdit(false);
                            // EditFunction();
                          }}
                        />
                      )}
                      <Edit style={{ color: color2 }} />
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
                    <hr
                      style={{
                        index: 0,
                        borderBottom: `1px solid ${bgColor}`,
                      }}
                    />
                    {!descriptionEdit ? (
                      <Typography
                        id="description"
                        dangerouslySetInnerHTML={{
                          __html: description.replace(/\n/g, '<br />'),
                        }}
                        onClick={() => setDescriptionEdit(true)}
                      />
                    ) : (
                      <StyledInput
                        style={{ width: '100%' }}
                        autoFocus
                        value={description}
                        multiline
                        onChange={(event) => setDescription(event.target.value)}
                        onBlur={() => {
                          // EditFunction();
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
  );
};

export default ItemModal;

import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';

import { CardActionArea } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ClapImg from '../../common/icons/clap.png';
import SmileImg from '../../common/icons/emoji.png';
import SadImg from '../../common/icons/sad.png';

import styles from './Post.module.css';

import DeletePostModal from './DeletePost/DeletePostModal';
import withDeletePostService from './DeletePost/withDeletePostService';
import EditPostModal from './EditPost/EditPostModal';
import withUpdatePostService from './EditPost/withUpdatePostService';
import { getUsername } from '../../services/postDetailService';

const UpdatePostModalServiced = withUpdatePostService(EditPostModal);
const DeletePostModalServiced = withDeletePostService(DeletePostModal);

const Post = ({
  id,
  title,
  content,
  authorId,
  upvotes,
  downvotes,
  claps,
  handleVote,
  frontpage,
  loadPost,
}) => {
  const [upvoteClap, highlightClap] = useState(false);
  const [upvoteLaugh, highlightLaugh] = useState(false);
  const [upvoteSad, highlightSad] = useState(false);
  const [clapCountUpdated, setClapCountUpdated] = useState(false);
  const [updatedClapCount, setUpdatedClapCount] = useState(0);
  const [smileCountUpdated, setSmileCountUpdated] = useState(false);
  const [updatedSmileCount, setUpdatedSmileCount] = useState(0);
  const [sadCountUpdated, setSadCountUpdated] = useState(false);
  const [updatedSadCount, setUpdatedSadCount] = useState(0);
  const clapCount = clapCountUpdated ? updatedClapCount : claps;
  const smileCount = smileCountUpdated ? updatedSmileCount : upvotes;
  const sadCount = sadCountUpdated ? updatedSadCount : downvotes;
  const [votingErrorOpen, changeVotingError] = useState(false);
  const [showModal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [username, setUsername] = useState([]);

  const getUsernameForComment = async () => {
    if (authorId !== undefined) {
      const user = await getUsername(authorId);
      if (user !== null) {
        if (user.name === '') {
          setUsername(user.email);
        } else {
          setUsername(user.name);
        }
      }
    }
  };
  useEffect(() => {
    getUsernameForComment();
  });

  const internalHandleVote = async (upvoteType, upvote) => {
    const updatedValue = await handleVote(id, upvoteType, upvote);

    if (updatedValue !== 'error') {
      if (upvoteType === 'clap') {
        highlightClap(!upvoteClap);
      } else if (upvoteType === 'laugh') {
        highlightLaugh(!upvoteLaugh);
      } else if (upvoteType === 'sad') {
        highlightSad(!upvoteSad);
      }

      if (updatedValue !== 'already upvoted') {
        if (upvoteType === 'clap') {
          setClapCountUpdated(true);
          setUpdatedClapCount(updatedValue);
        } else if (upvoteType === 'laugh') {
          setSmileCountUpdated(true);
          setUpdatedSmileCount(updatedValue);
        } else if (upvoteType === 'sad') {
          setSadCountUpdated(true);
          setUpdatedSadCount(updatedValue);
        }
      }
    } else {
      changeVotingError(true);
    }
  };
  // Call this method onClick of the delete button
  // const handleDelete = () => {
  //   deletePostService(id);
  //   window.location.reload();
  // };

  const handleButtonsShow = () => {
    if (!document.cookie) return null;
    const storedPostTypes = JSON.parse(localStorage.getItem('firebaseui::rememberedAccounts'));
    if (!storedPostTypes) return null;

    return (
      <>
        <div className={styles['post-edit-button']}>
          <Button
            variant="contained"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => {
              setModal(true);
            }}
          >
            Edit
          </Button>
        </div>
        <div className={styles['post-delete-button']}>
          <Button
            variant="contained"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => {
              setDeleteModal(true);
            }}
          >
            Delete
          </Button>
        </div>
      </>
    );
  };

  return (
    <Card className={styles.root}>
      <div className={styles['post-box']}>
        <div className={styles['post-leftbar']}>
          <div className={styles.buttonGroup}>
            <Button
              className={styles['post-button']}
              onClick={() => {
                internalHandleVote('clap', !upvoteClap);
              }}
            >
              <img src={ClapImg} alt="clap-img" className={styles['post-icon']} />
            </Button>
            {upvoteClap ? (
              <div className={`${styles.counter} ${styles.clicked}`}>{clapCount}</div>
            ) : (
              <div className={styles.counter}>{clapCount}</div>
            )}
            <Button
              className={styles['post-button']}
              onClick={() => {
                internalHandleVote('laugh', !upvoteLaugh);
              }}
            >
              <img src={SmileImg} alt="smile-img" className={styles['post-icon']} />{' '}
            </Button>
            {upvoteLaugh ? (
              <div className={`${styles.counter} ${styles.clicked}`}>{smileCount}</div>
            ) : (
              <div className={styles.counter}>{smileCount}</div>
            )}
            <Button
              className={styles['post-button']}
              onClick={() => {
                internalHandleVote('sad', !upvoteSad);
              }}
            >
              <img src={SadImg} alt="sad-img" className={styles['post-icon']} />{' '}
            </Button>
            {upvoteSad ? (
              <div className={`${styles.counter} ${styles.clicked}`}>{sadCount}</div>
            ) : (
              <div className={styles.counter}>{sadCount}</div>
            )}
          </div>
        </div>
        <CardContent>
          <div className={styles['post-content']}>
            {frontpage ? (
              <Link to={`/post/${id}`}>
                <CardActionArea>
                  <Typography variant="h2">{title}</Typography>
                </CardActionArea>
              </Link>
            ) : (
              <Typography variant="h2">{title}</Typography>
            )}
            <Typography variant="body1" color="textSecondary">
              {`by ${username}`}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {content}
            </Typography>
          </div>
          {handleButtonsShow()}
        </CardContent>
      </div>
      {title && (
        <UpdatePostModalServiced
          showModal={showModal}
          setModal={setModal}
          id={id}
          oldTitle={title}
          oldBody={content}
          loadPost={loadPost}
        />
      )}
      {title && (
        <DeletePostModalServiced
          showModal={deleteModal}
          setModal={setDeleteModal}
          id={id}
          loadPost={loadPost}
        />
      )}
      <Snackbar
        open={votingErrorOpen}
        onClose={() => {
          changeVotingError(false);
        }}
        message="Please log in to vote on posts."
        autoHideDuration={3000}
      />
    </Card>
  );
};
export default Post;

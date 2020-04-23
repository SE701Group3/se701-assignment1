import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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
  const [upvoteClap, setUpvoteClap] = useState(false);
  const [upvoteLaugh, setUpvoteLaugh] = useState(false);
  const [upvoteSad, setUpvoteSad] = useState(false);
  const clapCount = claps + (upvoteClap ? 1 : 0);
  const smileCount = upvotes + (upvoteLaugh ? 1 : 0);
  const sadCount = downvotes + (upvoteSad ? 1 : 0);
  const [showModal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [username, setUsername] = useState([]);

  const getUsernameForComment = async () => {
    if (authorId !== undefined) {
      const user = await getUsername(authorId);
      if (!(user == null)) {
        setUsername(user.name);
      } else {
        setUsername('');
      }
    } else {
      setUsername('');
    }
  };
  useEffect(() => {
    getUsernameForComment();
  }, []);
  // Call this method onClick of the delete button
  // const handleDelete = () => {
  //   deletePostService(id);
  //   window.location.reload();
  // };

  return (
    <Card className={styles.root}>
      <div className={styles['post-box']}>
        <div className={styles['post-leftbar']}>
          <div className={styles.buttonGroup}>
            <Button
              className={styles['post-button']}
              onClick={() => {
                handleVote({ id, upvote_type: 'clap', upvote: !upvoteClap });
                setUpvoteClap(!upvoteClap);
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
                handleVote({ id, upvote_type: 'laugh', upvote: !upvoteLaugh });
                setUpvoteLaugh(!upvoteLaugh);
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
                handleVote({ id, upvote_type: 'sad', upvote: !upvoteSad });
                setUpvoteSad(!upvoteSad);
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
    </Card>
  );
};
export default Post;

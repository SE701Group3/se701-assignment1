import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

import { CardActionArea } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ClapImg from '../../common/icons/clap.png';
import SmileImg from '../../common/icons/emoji.png';
import SadImg from '../../common/icons/sad.png';

import styles from './Post.module.css';

// Import for testing post updates
import updatePostService from '../../services/updatePostService';

const Post = ({ id, title, content, upvotes, downvotes, claps, handleVote, frontpage }) => {
  const [upvoteClap, setUpvoteClap] = useState(false);
  const [upvoteLaugh, setUpvoteLaugh] = useState(false);
  const [upvoteSad, setUpvoteSad] = useState(false);
  const clapCount = claps + (upvoteClap ? 1 : 0);
  const smileCount = upvotes + (upvoteLaugh ? 1 : 0);
  const sadCount = downvotes + (upvoteSad ? 1 : 0);

  // Method used for testing post updates
  const handleUpdate = () => {
    updatePostService(id, 'testTitle', 'testBody');
  };

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
                handleUpdate();
              }}
            >
              Edit
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
export default Post;

import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ClapImg from '../../common/icons/clap.png';
import SmileImg from '../../common/icons/emoji.png';
import SadImg from '../../common/icons/sad.png';

import styles from './Post.module.css';

const Post = ({ id, title, content, upvotes, downvotes, claps, handleVote }) => {
  const [upvoteClap, setUpvoteClap] = useState(false);
  const [upvoteLaugh, setUpvoteLaugh] = useState(false);
  const [upvoteSad, setUpvoteSad] = useState(false);
  const [clapCount, setClapCount] = useState(claps);
  const [smileCount, setSmileCount] = useState(upvotes);
  const [sadCount, setSadCount] = useState(downvotes);

  return (
    <Card className={styles.root}>
      <div className={styles['post-box']}>
        <div className={styles['post-leftbar']}>
          <div className={styles.buttonGroup}>
            <Button
              className={styles['post-button']}
              onClick={() => {
                handleVote({ id, upvote_type: 'clap', upvote: !upvoteClap });
                if (upvoteClap) {
                  setClapCount(clapCount - 1);
                } else {
                  setClapCount(clapCount + 1);
                }
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
                if (upvoteLaugh) {
                  setSmileCount(smileCount - 1);
                } else {
                  setSmileCount(smileCount + 1);
                }
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
                if (upvoteSad) {
                  setSadCount(sadCount - 1);
                } else {
                  setSadCount(sadCount + 1);
                }
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
            <Typography variant="h2">{title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {content}
            </Typography>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
export default Post;

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
            <div className={styles.counter}>{claps}</div>
            <Button
              className={styles['post-button']}
              onClick={() => {
                handleVote({ id, upvote_type: 'laugh', upvote: !upvoteLaugh });
                setUpvoteLaugh(!upvoteLaugh);
              }}
            >
              <img src={SmileImg} alt="smile-img" className={styles['post-icon']} />{' '}
            </Button>
            <div className={styles.counter}>{upvotes}</div>
            <Button
              className={styles['post-button']}
              onClick={() => {
                handleVote({ id, upvote_type: 'sad', upvote: !upvoteSad });
                setUpvoteSad(!upvoteSad);
              }}
            >
              <img src={SadImg} alt="sad-img" className={styles['post-icon']} />{' '}
            </Button>
            <div className={styles.counter}>{downvotes}</div>
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

import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import styles from './Comment.module.css';

const Comment = () => {
  return (
    <Card className={styles.root}>
      <div className={styles['comment-box']}>
        <CardContent>
          <div className={styles['comment-content']}>
            <Typography style={{ display: 'inline-block', marginRight: '1em' }} variant="body1">
              AnonUser
            </Typography>
            <Typography style={{ display: 'inline-block' }} variant="body2" color="textSecondary">
              8 Days Ago
            </Typography>
            <Typography variant="body2" color="textSecondary">
              commentBodycommentBodycommentBodycommentBodycommentBodycommentBody
            </Typography>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
export default Comment;

import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import styles from './Comment.module.css';
// {this.props.post.text.split("\n").map((i, key) => {
//   return <p key={key}>{i}</p>;
// })}
const Comment = () => {
  return (
    <Card className={styles.root}>
      <div className={styles['comment-box']}>
        <CardContent>
          <div className={styles['comment-content']}>
            <Typography variant="body1">AnonUser</Typography>
            <Typography variant="body1" color="textSecondary">
              8 Days Ago
            </Typography>
            <Typography component="p" variant="body2" color="textSecondary">
              commentBodycommentBodycommentBodycommentBodycommentBodycommentBody
            </Typography>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
export default Comment;

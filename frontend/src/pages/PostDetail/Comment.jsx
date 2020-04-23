import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ReplyImage from '../../common/icons/reply.png';

import styles from './Comment.module.css';

const splitTextToParagraph = text => {
  return text.split('\n').map(i => <p key={`${Math.floor(Math.random() * 100)}`}>{i}</p>);
};

const Comment = ({ body, dateCreated, setModal, author }) => {
  console.log('hi');
  return (
    <Card className={styles.root}>
      <div className={styles['comment-box']}>
        <Button onClick={setModal}>
          <img src={ReplyImage} alt="reply-img" className={styles.reply} />
        </Button>
        <CardContent>
          <div className={styles['comment-content']}>
            <Typography variant="body1">{author}</Typography>
            <Typography variant="caption" color="textSecondary">
              {dateCreated}
            </Typography>
            <Typography component="span" variant="body2" color="textSecondary">
              {splitTextToParagraph(body)}
            </Typography>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
export default Comment;

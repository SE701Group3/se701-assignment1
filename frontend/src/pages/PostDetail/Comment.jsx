import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ReplyImage from '../../common/icons/reply.png';
import styles from './Comment.module.css';
import { getUsername } from '../../services/postDetailService';

const splitTextToParagraph = text => {
  return text.split('\n').map(i => <p key={`${Math.floor(Math.random() * 100)}`}>{i}</p>);
};

const Comment = ({ body, dateCreated, setModal, authorId }) => {
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
  return (
    <Card className={styles.root}>
      <div className={styles['comment-box']}>
        <Button onClick={setModal}>
          <img src={ReplyImage} alt="reply-img" className={styles.reply} />
        </Button>
        <CardContent>
          <div className={styles['comment-content']}>
            <Typography variant="body1">{username}</Typography>
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

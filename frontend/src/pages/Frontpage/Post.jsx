import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';

import styles from "./Post.module.css";

const Post = props => {
  return (
    <Card className={styles.root}>
      <CardActionArea>
        <div className={styles["post-box"]}>
          <div className={styles["post-leftbar"]}>
            <SentimentSatisfiedAltIcon fontSize="large" className={styles["post-icon"]}/>
            <SentimentSatisfiedAltIcon fontSize="large" className={styles["post-icon"]}/>
            <SentimentSatisfiedAltIcon fontSize="large" className={styles["post-icon"]}/>
          </div>
          <CardContent>
            <div className={styles["post-content"]}>
              <Typography variant="h2">
                {props.title}
            </Typography>
              <Typography variant="body2" color="textSecondary">
                {props.content}
            </Typography>
            </div>
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
};
export default Post;
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Comment from '@material-ui/icons/Comment';
import DeleteTwoTone from '@material-ui/icons/DeleteTwoTone';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import Comments from './Comments';

function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

const Post = (props) => {
  const classes = useStyles();
  const {
    auth,
    post,
    isDeletingPost,
    handleDeletePost,
    handleToggleLike,
    handleAddComment,
  } = props;

  const prevPostLikes = usePrevious(post.likes.length);
  const prevComments = usePrevious(post.comments.length);

  const [isLiked, setIsLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (prevPostLikes !== post.likes.length) {
      setIsLiked(checkLiked(post.likes));
      setNumLikes(post.likes.length);
      return;
    }
    if (prevComments !== post.comments.length) {
      setComments(post.comments);
      return;
    }
    setIsLiked(checkLiked(post.likes));
    setNumLikes(post.likes.length);
    setComments(post.comments);
  }, [prevPostLikes, post.likes.length, prevComments, post.comments.length]);

  const checkLiked = (likes) => likes.includes(auth.user._id);

  const isPostedCreator = post.postedBy._id === auth.user._id;
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar src={post.postedBy.avatar} />}
        action={
          isPostedCreator && (
            <IconButton
              disabled={isDeletingPost}
              onClick={() => handleDeletePost(post)}
            >
              <DeleteTwoTone color="secondary" />
            </IconButton>
          )
        }
        title={
          <Link href={`/profile/${post.postedBy._id}`}>
            <a>{post.postedBy.name}</a>
          </Link>
        }
        subheader={post.createdAt}
        className={classes.cardHeader}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="body1" className={classes.text}>
          {post.text}
        </Typography>

        {post.image && (
          <div className={classes.imageContainer}>
            <img className={classes.image} src={post.image} />
          </div>
        )}
      </CardContent>
      <CardActions>
        <IconButton
          className={classes.button}
          onClick={() => handleToggleLike(post)}
        >
          <Badge badgeContent={numLikes} color="secondary">
            {isLiked ? (
              <Favorite className={classes.favoriteIcon} />
            ) : (
              <FavoriteBorder className={classes.favoriteIcon} />
            )}
          </Badge>
        </IconButton>
        <IconButton className={classes.button}>
          <Badge badgeContent={0} color="primary">
            <Comment className={classes.commentIcon} />
          </Badge>
        </IconButton>
      </CardActions>
      <Divider />
      {/* Comment Area */}
      <Comments
        auth={auth}
        postId={post._id}
        comments={comments}
        handleAddComment={handleAddComment}
      />
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2 * 3),
  },
  cardContent: {
    backgroundColor: 'white',
  },
  cardHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    backgroundColor: 'rgba(11, 61, 130, 0.06)',
  },
  imageContainer: {
    textAlign: 'center',
    padding: theme.spacing(2),
  },
  image: {
    height: 200,
  },
  favoriteIcon: {
    color: theme.palette.favoriteIcon,
  },
  commentIcon: {
    color: theme.palette.commentIcon,
  },
}));

export default Post;

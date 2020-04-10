import { useState } from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Avatar from '@material-ui/core/Avatar';
import Delete from '@material-ui/icons/Delete';

const Comments = (props) => {
  const classes = useStyles();
  const { auth, postId, comments, handleAddComment } = props;

  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddComment(postId, text);
    setText('');
  };

  const showComment = (comment) => {
    const isCommentCreator = comment.postedBy._id === auth.user._id;
    return (
      <div>
        <Link href={`/profile/${comment.postedBy._id}`}>
          <a>{comment.postedBy.name}</a>
        </Link>
        <br />
        {comment.text}
        <span className={classes.commentDate}>
          {comment.createdAt}
          {isCommentCreator && (
            <Delete color="secondary" className={classes.commentDelete} />
          )}
        </span>
      </div>
    );
  };

  return (
    <div className={classes.comments}>
      {/* Comment Input */}
      <CardHeader
        avatar={
          <Avatar className={classes.smallAvatar} src={auth.user.avatar} />
        }
        title={
          <form onSubmit={handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="add-comment">Add Comments</InputLabel>
              <Input
                id="add-comment"
                name="text"
                placeholder="Reply to this post"
                onChange={handleChange}
                value={text}
              />
            </FormControl>
          </form>
        }
        className={classes.cardHeader}
      />

      {/* Comments */}
      {comments.map((comment) => (
        <CardHeader
          key={comment._id}
          avatar={
            <Avatar
              className={classes.smallAvatar}
              src={comment.postedBy.avatar}
            />
          }
          title={showComment(comment)}
          className={classes.cardHeader}
        />
      ))}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  comments: {
    backgroundColor: 'rgba(11, 61, 130, 0.06)',
  },
  cardHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  smallAvatar: {
    margin: 10,
  },
  commentDate: {
    display: 'block',
    color: 'gray',
    fontSize: '0.8em',
  },
  commentDelete: {
    fontSize: '1.6em',
    verticalAlign: 'middle',
    cursor: 'pointer',
  },
}));

export default Comments;

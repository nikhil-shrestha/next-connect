import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import NewPost from './NewPost';
import Post from './Post';

const PostFeed = (props) => {
  const classes = useStyles();

  const { auth } = props;

  const [posts, setPosts] = useState([]);
  const [text, setText] = useState('');
  const [image, setImage] = useState('');

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    let inputValue;

    if (name === 'image') {
      inputValue = files[0];
      setImage(inputValue);
    } else {
      inputValue = value;
      setText(inputValue);
    }
  };

  return (
    <div className={classes.root}>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        color="primary"
        className={classes.title}
      >
        Post Feed
      </Typography>
      <NewPost
        auth={auth}
        text={text}
        image={image}
        handleChange={handleChange}
      />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(2) * 2,
  },
  title: {
    padding: theme.spacing(2) * 2,
  },
}));

export default PostFeed;

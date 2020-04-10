import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import NewPost from './NewPost';
import Post from './Post';

import {
  addPost,
  getPostFeed,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  deleteComment,
} from '../../lib/api';

const PostFeed = (props) => {
  const classes = useStyles();

  const { auth } = props;

  const [posts, setPosts] = useState([]);
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [isDeletingPost, setIsDeletingPost] = useState(false);

  useEffect(() => {
    async function getPost() {
      try {
        const postsData = await getPostFeed(auth.user._id);
        setPosts(postsData);
      } catch (err) {
        console.log(err);
      }
    }
    getPost();
  }, []);

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

  const handleAddPost = () => {
    setIsAddingPost(true);
    const postData = new FormData();
    postData.append('text', text);
    if (image) {
      postData.append('image', image);
    }

    addPost(auth.user._id, postData)
      .then((postData) => {
        console.log({ postData });
        const updatedPost = [postData, ...posts];
        setPosts(updatedPost);
        setIsAddingPost(false);
        setText('');
        setImage('');
      })
      .catch((err) => {
        console.log(err);
        setIsAddingPost(false);
      });
  };

  const handleDeletePost = (deletedPost) => {
    setIsDeletingPost(true);
    deletePost(deletedPost._id)
      .then((postData) => {
        const postIndex = posts.findIndex((post) => post._id === postData._id);

        const updatedPosts = [
          ...posts.slice(0, postIndex),
          ...posts.slice(postIndex + 1),
        ];
        setPosts(updatedPosts);
        setIsDeletingPost(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleToggleLike = (post) => {
    const isPostLiked = post.likes.includes(auth.user._id);
    const sendRequest = isPostLiked ? unlikePost : likePost;

    sendRequest(post._id)
      .then((postData) => {
        const postIndex = posts.findIndex((post) => post._id === postData._id);
        const updatedPosts = [
          ...posts.slice(0, postIndex),
          postData,
          ...posts.slice(postIndex + 1),
        ];
        setPosts(updatedPosts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddComment = (postId, text) => {
    const comment = { text };
    addComment(postId, comment)
      .then((postData) => {
        const postIndex = posts.findIndex((post) => post._id === postData._id);

        const updatedPosts = [
          ...posts.slice(0, postIndex),
          postData,
          ...posts.slice(postIndex + 1),
        ];
        setPosts(updatedPosts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteComment = (postId, comment) => {
    deleteComment(postId, comment)
      .then((postData) => {
        const postIndex = posts.findIndex((post) => post._id === postData._id);

        const updatedPosts = [
          ...posts.slice(0, postIndex),
          postData,
          ...posts.slice(postIndex + 1),
        ];
        setPosts(updatedPosts);
      })
      .catch((err) => {
        console.log(err);
      });
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
        isAddingPost={isAddingPost}
        isDeletingPost={isDeletingPost}
        handleChange={handleChange}
        handleAddPost={handleAddPost}
      />

      {posts.map((post) => (
        <Post
          key={post._id}
          auth={auth}
          post={post}
          handleDeletePost={handleDeletePost}
          handleToggleLike={handleToggleLike}
          handleAddComment={handleAddComment}
          handleDeleteComment={handleDeleteComment}
        />
      ))}
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

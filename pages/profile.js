import { useEffect, useState } from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Edit from '@material-ui/icons/Edit';

import FollowUser from '../components/profile/FollowUser';
import DeleteUser from '../components/profile/DeleteUser';
import ProfileTabs from '../components/profile/ProfileTabs';

import { authInitialProps } from '../lib/auth';
import {
  getUser,
  getPostByUser,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  deleteComment,
} from '../lib/api';

const Profile = (props) => {
  const classes = useStyles();
  const { userId, auth } = props;

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await getUser(userId);
        const followCheck = checkFollow(auth, userData);
        setUser(userData);
        setIsAuth(auth.user._id === userId);
        setIsLoading(false);
        setIsFollowing(followCheck);

        const userPostsData = await getPostByUser(userId);
        setPosts(userPostsData);
      } catch (err) {
        console.log(err);
      }
    }
    loadUser();
  }, [userId]);

  const checkFollow = (auth, user) => {
    return (
      user.followers.findIndex((follower) => follower._id === auth.user._id) >
      -1
    );
  };

  const toggleFollow = (sendRequest) => {
    sendRequest(userId).then(() => {
      setIsFollowing(!isFollowing);
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
    <Paper className={classes.root} elevation={4}>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        className={classes.title}
        gutterBottom
      >
        Profile
      </Typography>
      {isLoading ? (
        <div className={classes.progressContainer}>
          <CircularProgress
            variant="determinate"
            className={classes.progress}
            size={55}
            thickness={55}
          />
        </div>
      ) : (
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={user.vatar} className={classes.bigAvatar} />
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.email} />

            {/* Auth - Edit Button / UnAuth - Follow Button */}
            {isAuth ? (
              <ListItemSecondaryAction>
                <Link href="/edit-profile">
                  <a>
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                  </a>
                </Link>
                <DeleteUser user={user} />
              </ListItemSecondaryAction>
            ) : (
              <FollowUser
                isFollowing={isFollowing}
                toggleFollow={toggleFollow}
              />
            )}
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={user.about}
              secondary={`Joined: ${user.createdAt}`}
            />
          </ListItem>

          {/* Display user's posts,  following and Followers */}
          <ProfileTabs
            auth={auth}
            user={user}
            posts={posts}
            handleDeletePost={handleDeletePost}
            handleToggleLike={handleToggleLike}
            handleAddComment={handleAddComment}
            handleDeleteComment={handleDeleteComment}
          />
        </List>
      )}
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2 * 3),
    marginTop: theme.spacing(2 * 5),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      width: 600,
    },
  },
  title: {
    color: theme.palette.primary.main,
  },
  progress: {
    margin: theme.spacing(2 * 2),
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 10,
  },
}));

Profile.getInitialProps = authInitialProps(true);

export default Profile;

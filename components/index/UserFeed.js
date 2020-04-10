import { useState, useEffect } from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import AccountBox from '@material-ui/icons/AccountBox';

import { getUserFeed, followUser } from '../../lib/api';

const UserFeed = (props) => {
  const classes = useStyles();
  const { auth } = props;

  const [users, setUsers] = useState([]);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [followingMsg, setFollowingMsg] = React.useState('');

  useEffect(() => {
    async function loadUser() {
      try {
        const usersData = await getUserFeed(auth.user._id);
        setUsers(usersData);
      } catch (err) {
        console.log(err);
      }
    }
    loadUser();
  }, [auth.user._id]);

  const handleClose = () => setOpenSuccess(false);

  const handleFollow = async (user, userIndex) => {
    try {
      const fUser = await followUser(user._id);
      const updatedUsers = [
        ...users.slice(0, userIndex),
        ...users.slice(userIndex + 1),
      ];
      setUsers(updatedUsers);
      setOpenSuccess(true);
      setFollowingMsg(`Following ${fUser.name}`);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(users);

  return (
    <div>
      <Typography type="title" variant="h6" component="h2" align="center">
        Browse Users
      </Typography>
      <Divider />
      <List>
        {users.length > 0 &&
          users.map((user, i) => (
            <span key={user._id}>
              <ListItem>
                <ListItemAvatar className={classes.avatar}>
                  <Avatar src={user.avatar} />
                </ListItemAvatar>
                <ListItemText primary={user.name} />
                <ListItemSecondaryAction className={classes.follow}>
                  <Link href={`/profile/${user._id}`}>
                    <IconButton
                      variant="contained"
                      color="secondary"
                      className={classes.viewButton}
                    >
                      <AccountBox />
                    </IconButton>
                  </Link>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleFollow(user, i)}
                  >
                    Follow
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            </span>
          ))}
      </List>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={openSuccess}
        onClose={handleClose}
        autoHideDuration={5000}
        message={<span className={classes.snack}>{followingMsg}</span>}
      />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  follow: {
    right: theme.spacing(2) * 2,
  },
  snack: {
    color: theme.palette.primary.light,
  },
  viewButton: {
    verticalAlign: 'middle',
  },
}));

export default UserFeed;

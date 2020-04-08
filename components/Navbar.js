import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ShareOutlined from '@material-ui/icons/ShareOutlined';

import ActiveLink from './ActiveLink';
import { signoutUser } from '../lib/auth';

const Navbar = ({ router, pageProps: { auth } }) => {
  const classes = useStyles();

  const { user = {} } = auth || {};

  return (
    <AppBar
      className={classes.appBar}
      position={router.pathname === '/' ? 'fixed' : 'static'}
    >
      <Toolbar>
        <ActiveLink href="/">
          <ShareOutlined className={classes.icon} />
        </ActiveLink>

        <Typography
          variant="h5"
          component="h1"
          className={classes.toolbarTitle}
        >
          <ActiveLink href="/">NEXTConnect</ActiveLink>
        </Typography>

        {user?._id ? (
          <div>
            <Button>
              <ActiveLink href="/profile">Profile</ActiveLink>
            </Button>
            <Button variant="outlined" onClick={signoutUser}>
              SignOut
            </Button>
          </div>
        ) : (
          <div>
            <Button>
              <ActiveLink href="/signin">SignIn</ActiveLink>
            </Button>
            <Button>
              <ActiveLink href="/signup">SignUp</ActiveLink>
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles(theme => ({
  appBar: {
    // z-index 1 higher than the fixed drawer in home page to clip it under the navigation
    zIndex: theme.zIndex.drawer + 1
  },
  toolbarTitle: {
    flex: 1
  },
  icon: {
    marginRight: theme.spacing(2)
  }
}));

export default Navbar;

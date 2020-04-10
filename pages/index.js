import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Router from 'next/router';

import UserFeed from '../components/index/UserFeed';
import PostFeed from '../components/index/PostFeed';
import { authInitialProps } from '../lib/auth';

export default function Index({ auth }) {
  const classes = useStyles();
  return (
    <main className={classes.root}>
      {auth.user && auth.user._id ? (
        <Grid container>
          <Grid item xs={12} sm={12} md={7}>
            <PostFeed auth={auth} />
          </Grid>
          <Grid item className={classes.drawerContainer}>
            <Drawer
              className={classes.drawer}
              variant="permanent"
              anchor="right"
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <UserFeed auth={auth} />
            </Drawer>
          </Grid>
        </Grid>
      ) : (
        <Grid
          justify="center"
          alignItems="center"
          container
          className={classes.heroContent}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            gutterBottom
            color="textPrimary"
          >
            A Better Social Network
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textPrimary"
            component="p"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Typography>
          <Button
            className={classes.fabButton}
            variant="contained"
            color="primary"
            onClick={() => Router.pus('/signup')}
          >
            Get Started
          </Button>
        </Grid>
      )}
    </main>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(10),
    paddingLeft: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(5),
    },
  },
  progressContainer: {
    height: '80vh',
  },
  progress: {
    margin: theme.spacing(2),
    color: theme.palette.secondary.light,
  },
  drawerContainer: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  drawer: {
    width: 350,
  },
  drawerPaper: {
    marginTop: 70,
    width: 350,
  },
  fabButton: {
    borderRadius: 25,
    margin: theme.spacing(3),
  },
  heroContent: {
    maxWidth: 600,
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(6),
    margin: '0 auto',
  },
}));

Index.getInitialProps = authInitialProps();

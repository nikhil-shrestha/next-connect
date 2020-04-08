import { makeStyles } from '@material-ui/core/styles';
// import Paper from "@material-ui/core/Paper";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
// import ListItemText from "@material-ui/core/ListItemText";
// import Avatar from "@material-ui/core/Avatar";
// import IconButton from "@material-ui/core/IconButton";
// import Typography from "@material-ui/core/Typography";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import Divider from "@material-ui/core/Divider";
// import Edit from "@material-ui/icons/Edit";

import { authInitialProps } from '../lib/auth';

const Profile = () => {
  return <div>Profile</div>;
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2) * 3,
    marginTop: theme.spacing(2) * 5,
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      width: 600
    }
  },
  title: {
    color: theme.palette.primary.main
  },
  progress: {
    margin: theme.spacing(2) * 2
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 10
  }
}));

Profile.getInitialProps = authInitialProps(true);

export default Profile;

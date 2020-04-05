// import CircularProgress from "@material-ui/core/CircularProgress";
// import Drawer from "@material-ui/core/Drawer";
// import Typography from "@material-ui/core/Typography";
// import Grid from "@material-ui/core/Grid";
// import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';

class Index extends React.Component {
  state = {};

  render() {
    return <div>Index</div>;
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2) * 10,
    paddingLeft: theme.spacing(2) * 5,
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(2) * 5
    }
  },
  progressContainer: {
    height: '80vh'
  },
  progress: {
    margin: theme.spacing(2) * 2,
    color: theme.palette.secondary.light
  },
  drawerContainer: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  drawer: {
    width: 350
  },
  drawerPaper: {
    marginTop: 70,
    width: 350
  },
  fabButton: {
    margin: theme.spacing(2) * 3
  },
  heroContent: {
    maxWidth: 600,
    paddingTop: theme.spacing(2) * 8,
    paddingBottom: theme.spacing(2) * 6,
    margin: '0 auto'
  }
}));

export default Index;

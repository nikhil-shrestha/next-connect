import { makeStyles } from '@material-ui/core/styles';

const FollowTab = () => {
  const classes = useStyles();

  return <div>FollowTab</div>;
};

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2) * 2,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  gridList: {
    width: 300,
    [theme.breakpoints.up('sm')]: {
      width: 400
    }
  },
  tileText: {
    textAlign: 'center',
    marginTop: 10
  }
}));

export default FollowTab;

import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const FollowTab = (props) => {
  const classes = useStyles();

  const { users } = props;

  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={4}>
        {users.map((user) => (
          <GridListTile style={{ height: 120 }} key={user._id}>
            <Link href={`/profile/${user._id}`}>
              <a>
                <Avatar src={user.avatar} className={classes.bigAvatar} />
                <Typography
                  component="h3"
                  variant="subtitle1"
                  className={classes.tileText}
                >
                  {user.name}
                </Typography>
              </a>
            </Link>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2) * 2,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto',
  },
  gridList: {
    width: 300,
    [theme.breakpoints.up('sm')]: {
      width: 400,
    },
  },
  tileText: {
    textAlign: 'center',
    marginTop: 10,
  },
}));

export default FollowTab;

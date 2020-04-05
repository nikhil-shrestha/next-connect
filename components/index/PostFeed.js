import { makeStyles } from '@material-ui/core/styles';

const PostFeed = () => {
  return <div>PostFeed</div>;
};

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: theme.spacing(2) * 2
  },
  title: {
    padding: theme.spacing(2) * 2
  }
}));

export default PostFeed;

import { makeStyles } from '@material-ui/core/styles';

const Post = () => {
  return <div>Post</div>;
};

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.spacing(2 * 3)
  },
  cardContent: {
    backgroundColor: 'white'
  },
  cardHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    backgroundColor: 'rgba(11, 61, 130, 0.06)'
  },
  imageContainer: {
    textAlign: 'center',
    padding: theme.spacing(2)
  },
  image: {
    height: 200
  },
  favoriteIcon: {
    color: theme.palette.favoriteIcon
  },
  commentIcon: {
    color: theme.palette.commentIcon
  }
}));

export default Post;

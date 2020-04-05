import { makeStyles } from '@material-ui/core/styles';

const NewPost = () => {
  return <div>NewPost</div>;
};

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.spacing(2 * 3),
    backgroundColor: theme.palette.primary.light
  },
  cardContent: {
    backgroundColor: 'white'
  },
  input: {
    display: 'none'
  },
  cardActions: {
    display: 'flex',
    flexDirection: 'row-reverse'
  }
}));

export default NewPost;

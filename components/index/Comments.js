import { makeStyles } from '@material-ui/core/styles';
i;

const Comments = () => {
  return <div>Comments</div>;
};

const useStyles = makeStyles(theme => ({
  comments: {
    backgroundColor: 'rgba(11, 61, 130, 0.06)'
  },
  cardHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  smallAvatar: {
    margin: 10
  },
  commentDate: {
    display: 'block',
    color: 'gray',
    fontSize: '0.8em'
  },
  commentDelete: {
    fontSize: '1.6em',
    verticalAlign: 'middle',
    cursor: 'pointer'
  }
}));

export default Comments;

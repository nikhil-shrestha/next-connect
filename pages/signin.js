// import Typography from "@material-ui/core/Typography";
// import Avatar from "@material-ui/core/Avatar";
// import FormControl from "@material-ui/core/FormControl";
// import Paper from "@material-ui/core/Paper";
// import Input from "@material-ui/core/Input";
// import InputLabel from "@material-ui/core/InputLabel";
// import Button from "@material-ui/core/Button";
// import Snackbar from "@material-ui/core/Snackbar";
// import Lock from "@material-ui/icons/Lock";
import { makeStyles } from '@material-ui/core/styles';

class Signin extends React.Component {
  state = {};

  render() {
    return <div>Signin</div>;
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing(2) * 3,
    marginRight: theme.spacing(2) * 3,
    [theme.breakpoints.up('md')]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(2) * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2) * 2
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2)
  },
  submit: {
    marginTop: theme.spacing(2) * 2
  },
  snack: {
    color: theme.palette.protectedTitle
  }
}));

export default Signin;

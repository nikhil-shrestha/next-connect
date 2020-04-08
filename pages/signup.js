import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Gavel from '@material-ui/icons/Gavel';
import VerifiedUserTwoTone from '@material-ui/icons/VerifiedUserTwoTone';

import { signupUser } from '../lib/auth';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Signup = () => {
  const classes = useStyles();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [createdUser, setCreatedUser] = React.useState('');

  const { name, email, password } = formData;

  const handleClose = () => setOpenError(false);

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    const user = {
      name,
      email,
      password
    };

    console.log(user);

    signupUser(user)
      .then(createdNewUser => {
        setCreatedUser(createdNewUser);
        setError('');
        setOpenSuccess(true);
        setIsLoading(false);
      })
      .catch(showError);
  };

  const showError = err => {
    const errorMsg = (err.response && err.response.data) || err.message;
    setError(errorMsg);
    setOpenError(true);
    setIsLoading(false);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Gavel />
        </Avatar>
        <Typography variant="h5" component="h1">
          Sign Up
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              name="name"
              type="text"
              onChange={handleChange}
              value={name}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              name="email"
              type="email"
              onChange={handleChange}
              value={email}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              onChange={handleChange}
              value={password}
            />
          </FormControl>
          <Button
            disabled={isLoading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isLoading ? 'Signing up...' : 'Sign up'}
          </Button>
        </form>

        {error && (
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            open={openError}
            onClose={handleClose}
            autoHideDuration={5000}
            message={<span className={classes.snack}>{error}</span>}
          />
        )}
      </Paper>

      <Dialog
        open={openSuccess}
        disableBackdropClick={true}
        TransitionComponent={Transition}
      >
        <DialogTitle>
          <VerifiedUserTwoTone className={classes.icon} />
          New Account
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            User {createdUser} successfully created!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained">
            <Link href="/signin">
              <a className={classes.signinLink}>Signin</a>
            </Link>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

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
  signinLink: {
    textDecoration: 'none',
    color: 'white'
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
    color: theme.palette.secondary.light
  },
  icon: {
    padding: '0px 2px 2px 0px',
    verticalAlign: 'middle',
    color: 'green'
  }
}));

export default Signup;

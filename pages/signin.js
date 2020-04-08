import { useState } from 'react';
import Router from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Lock from '@material-ui/icons/Lock';

import { signinUser } from '../lib/auth';

const Signin = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [openError, setOpenError] = useState(false);

  const { email, password } = formData;

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
      email,
      password
    };

    console.log(user);

    signinUser(user)
      .then(() => {
        Router.push('/');
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
          <Lock />
        </Avatar>
        <Typography variant="h5" component="h1">
          Sign In
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
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
            {isLoading ? 'Signing in...' : 'Sign in'}
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

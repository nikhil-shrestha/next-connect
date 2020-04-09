import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Snackbar from '@material-ui/core/Snackbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import VerifiedUserTwoTone from '@material-ui/icons/VerifiedUserTwoTone';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloudUpload from '@material-ui/icons/CloudUpload';
import FaceTwoTone from '@material-ui/icons/FaceTwoTone';
import EditSharp from '@material-ui/icons/EditSharp';

import { authInitialProps } from '../lib/auth';
import { getAuthUser } from '../lib/api';

export default function EditProfile(props) {
  const classes = useStyles();
  const { auth } = props;

  const [user, setUser] = useState({
    _id: '',
    name: '',
    email: '',
    about: '',
    avatar: '',
  });
  const userFormData = new FormData();
  const [isLoading, setIsLoading] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState('');

  const { name, email, about, avatar } = user;

  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await getAuthUser(auth.user._id);
        setUser({
          ...user,
          ...userData,
        });
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }
    loadUser();
  }, []);

  const handleChange = (event) => {
    const { name } = event.target;
    let inputValue;

    if (name === 'avatar') {
      inputValue = event.target.files[0];
      setAvatarPreview(createPreviewImage(inputValue));
    } else {
      inputValue = event.target.value;
    }

    userFormData.set(name, inputValue);
    setUser({
      ...user,
      [name]: inputValue,
    });
  };

  const createPreviewImage = (file) => URL.createObjectURL(file);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EditSharp />
        </Avatar>
        <Typography variant="h5" component="h1">
          EDit Profile
        </Typography>

        <form className={classes.form}>
          {isLoading ? (
            <Avatar className={classes.bigAvatar}>
              <FaceTwoTone />{' '}
            </Avatar>
          ) : (
            <Avatar
              src={avatarPreview || avatar}
              className={classes.bigAvatar}
            />
          )}
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
            className={classes.input}
          />
          <label htmlFor="avatar" className={classes.uploadButton}>
            <Button variant="contained" color="secondary" component="span">
              Upload Image <CloudUpload />
            </Button>
          </label>
          <span className={classes.filename}>{avatar && avatar.name}</span>

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
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="about">About</InputLabel>
            <Input
              name="about"
              type="text"
              onChange={handleChange}
              value={about}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </form>
      </Paper>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing(2) * 3,
    marginRight: theme.spacing(2) * 3,
    [theme.breakpoints.up('md')]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto',
  },
  uploadButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0.25em',
  },
  paper: {
    marginTop: theme.spacing(2) * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2) * 2,
  },
  signinLink: {
    textDecoration: 'none',
    color: 'white',
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  submit: {
    marginTop: theme.spacing(2) * 2,
  },
  snack: {
    color: theme.palette.secondary.light,
  },
  icon: {
    padding: '0px 2px 2px 0px',
    verticalAlign: 'middle',
    color: 'green',
  },
  input: {
    display: 'none',
  },
}));

EditProfile.getInitialProps = authInitialProps(true);

import { useEffect, useState } from 'react';
import Router from 'next/router';
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
import Slide from '@material-ui/core/Slide';
import CloudUpload from '@material-ui/icons/CloudUpload';
import FaceTwoTone from '@material-ui/icons/FaceTwoTone';
import EditSharp from '@material-ui/icons/EditSharp';

import { authInitialProps } from '../lib/auth';
import { getAuthUser, updateUser } from '../lib/api';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditProfile(props) {
  const classes = useStyles();
  const { auth } = props;

  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    email: '',
    about: '',
    avatar: '',
  });
  const [image, setImage] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [error, setError] = React.useState('');
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const { name, email, about, avatar } = formData;

  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await getAuthUser(auth.user._id);
        setFormData({
          ...formData,
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

  const handleClose = () => setOpenError(false);

  const onChangePicture = (e) => {
    console.log('picture: ', image);
    const inputValue = e.target.files[0];
    setImage(inputValue);
    setAvatarPreview(createPreviewImage(inputValue));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const createPreviewImage = (file) => URL.createObjectURL(file);

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsSaving(true);
    const userData = new FormData();
    userData.append('name', name);
    userData.append('email', email);
    userData.append('about', about);
    if (image) {
      userData.append('avatar', image);
    }

    updateUser(formData._id, userData)
      .then((updated) => {
        console.log(updated);
        setIsSaving(false);
        setUpdatedUser(updated);
        setOpenSuccess(true);
        setTimeout(() => Router.push(`/profile/${formData._id}`), 6000);
      })
      .catch(showError);
  };

  const showError = (err) => {
    const errorMsg = (err.response && err.response.data) || err.message;
    setError(errorMsg);
    setOpenError(true);
    setIsSaving(false);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EditSharp />
        </Avatar>
        <Typography variant="h5" component="h1">
          EDit Profile
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
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
            onChange={onChangePicture}
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
            disabled={isSaving || isLoading}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </form>
      </Paper>

      {error && (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={openError}
          onClose={handleClose}
          autoHideDuration={5000}
          message={<span className={classes.snack}>{error}</span>}
        />
      )}

      <Dialog
        open={openSuccess}
        disableBackdropClick={true}
        TransitionComponent={Transition}
      >
        <DialogTitle>
          <VerifiedUserTwoTone className={classes.icon} />
          Profile Updated
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            User {updatedUser && updateUser.name} was successfully updated!
          </DialogContentText>
        </DialogContent>
      </Dialog>
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

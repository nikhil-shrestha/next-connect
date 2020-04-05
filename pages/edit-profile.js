import { makeStyles } from '@material-ui/core/styles';
// import Avatar from "@material-ui/core/Avatar";
// import FormControl from "@material-ui/core/FormControl";
// import Paper from "@material-ui/core/Paper";
// import Input from "@material-ui/core/Input";
// import InputLabel from "@material-ui/core/InputLabel";
// import Snackbar from "@material-ui/core/Snackbar";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import VerifiedUserTwoTone from "@material-ui/icons/VerifiedUserTwoTone";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import CloudUpload from "@material-ui/icons/CloudUpload";
// import FaceTwoTone from "@material-ui/icons/FaceTwoTone";
// import EditSharp from "@material-ui/icons/EditSharp";

export default function EditProfile() {
  const classes = useStyles();

  return <div>EditProfile</div>;
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
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  uploadButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0.25em'
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
  },
  input: {
    display: 'none'
  }
}));

export default EditProfile;

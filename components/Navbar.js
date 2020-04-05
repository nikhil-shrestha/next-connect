import { makeStyles } from '@material-ui/core/styles';
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import ShareOutlined from "@material-ui/icons/ShareOutlined";

const Navbar = () => {
  const classes = useStyles();

  return <div>Navbar</div>;
};

const useStyles = makeStyles(theme => ({
  appBar: {
    // z-index 1 higher than the fixed drawer in home page to clip it under the navigation
    zIndex: theme.zIndex.drawer + 1
  },
  toolbarTitle: {
    flex: 1
  },
  icon: {
    marginRight: theme.spacing(2)
  }
}));

export default Navbar;

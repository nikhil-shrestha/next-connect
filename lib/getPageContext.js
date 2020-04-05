import { createMuiTheme } from '@material-ui/core/styles';

// import teal from "@material-ui/core/colors/teal";
// import blue from "@material-ui/core/colors/blue";
// import pink from "@material-ui/core/colors/pink";
// import red from "@material-ui/core/colors/red";

/* Create your app color theme here */
export const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  },
  palette: {
    // primary: teal,
    // secondary: red,
    // favoriteIcon: pink[200],
    // commentIcon: blue[300],
    // type: "light"
  }
});

function createPageContext() {
  return {
    theme
  };
}

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
}

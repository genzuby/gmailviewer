import React from "react";
import GoogleAuth from "./GoogleAuth";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  image: {
    backgroundImage: "url('./images/mail-bg.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    height: "75vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundBlendMode: "multiply"
  }
}));

const SignInPage = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Container
        container
        component="main"
        maxWidth="xl"
        className={classes.image}
      >
        <CssBaseline />
        <GoogleAuth />
      </Container>
    </React.Fragment>
  );
};

export default SignInPage;

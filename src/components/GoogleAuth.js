import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../action";
import Button from "@material-ui/core/Button";
import "../css/style.css";

const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"
];
const CLIENT_ID =
  "348510111486-nl2k2ph5htsjejlp9548epgep5odb5nu.apps.googleusercontent.com";
const SCOPE = "https://www.googleapis.com/auth/gmail.readonly"; //"https://mail.google.com/",

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: CLIENT_ID,
          scope: SCOPE,
          discoveryDocs: DISCOVERY_DOCS
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  listMessages = () => {
    var getPageOfMessages = function(request, result) {
      request.execute(function(resp) {
        result = result.concat(resp.messages);
        var nextPageToken = resp.nextPageToken;
        if (nextPageToken) {
          request = window.gapi.client.gmail.users.messages.list({
            userId: "me",
            pageToken: nextPageToken
          });
          getPageOfMessages(request, result);
        } else {
          // callback(result);
        }
        console.log(resp.messages);
      });
    };
    var initialRequest = window.gapi.client.gmail.users.messages.list({
      userId: "me"
    });
    getPageOfMessages(initialRequest, []);
  };

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      let profile = this.auth.currentUser.get().getBasicProfile();
      let userInfo = {
        userId: this.auth.currentUser.get().getId(),
        username: profile.getName(),
        imgUrl: profile.getImageUrl(),
        email: profile.getEmail()
      };
      this.props.signIn({ userInfo });
      this.listMessages();
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  rederAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <React.Fragment>
          <h1 className="username">{this.props.userInfo.username}</h1>
          <h3 className="email">{this.props.userInfo.email}</h3>
          <div
            className="profileImg"
            style={{
              background: `url(${this.props.userInfo.imgUrl}) no-repeat`
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
            onClick={this.onSignOutClick}
          >
            Sign Out
          </Button>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <h1 className="username">GMAIL</h1>
          <h3 className="email">Log In</h3>
          <div className="profileImg">
            <i className="usericon far fa-user" />
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={this.onSignInClick}
          >
            Sign In
          </Button>
        </React.Fragment>
      );
    }
  }

  render() {
    return <div>{this.rederAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userInfo: state.auth.userInfo
  };
};

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);

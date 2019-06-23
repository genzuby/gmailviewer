import React from "react";
import { connect } from "react-redux";
import { fetchList } from "../action";

class MailList extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "348510111486-nl2k2ph5htsjejlp9548epgep5odb5nu.apps.googleusercontent.com",
          scope: "https://mail.google.com/",
          immediate: true
        })
        .then(authResult => {
          this.auth = window.gapi.auth2.getAuthInstance();
          // this.getDataFromGap(this.auth.isSignedIn.get());
          if (authResult && !authResult.error)
            this.props.fetchList(this.auth.isSignedIn.get());
        });
    });
  }

  render() {
    return <div>Mail List</div>;
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    isSignedIn: state.auth.isSignedIn,
    userInfo: state.auth.userInfo
  };
};

export default connect(
  mapStateToProps,
  fetchList
)(MailList);

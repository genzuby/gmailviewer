import React from "react";
import SignInPage from "./SignInPage";
// import MailList from "./MailList";

class App extends React.Component {
  state = {};
  render() {
    return (
      <div>
        <SignInPage />
        {/* <MailList /> */}
      </div>
    );
  }
}

export default App;

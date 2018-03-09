import React from "react";
import { connect } from "react-redux";

import { DashBoard } from "./DashBoard";
import { userActions } from "../_actions";

class HomePage extends React.Component {
  render() {
    return (
      <div>
        {userActions.loggedIn() ? (
          <DashBoard />
        ) : (
          <p>
            Haaga-Helian lukujärjestykset - <a href="/login">Kirjaudu sisään</a>
          </p>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };

import React, { Component } from "react";
import { connect } from "react-redux";

// import { userActions } from "../_actions/user.actions";

class ProfilePage extends Component {
  render() {
    return (
      <div>
        <p>Oma profiili</p>
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

const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage };

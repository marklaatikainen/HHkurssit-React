import React, { Component } from "react";
import { connect } from "react-redux";

// import { userActions } from "../_actions/user.actions";

class TimetablesPage extends Component {
  render() {
    return (
      <div>
        <p>Aikataulut</p>
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

const connectedTimetablesPage = connect(mapStateToProps)(TimetablesPage);
export { connectedTimetablesPage as TimetablesPage };

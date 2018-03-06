import React, { Component } from "react";
import { logout } from "../Functions";

export default class Logout extends Component {
  componentDidMount() {
    logout();
  }

  render() {
    return (
      <div>
        <p>Olet kirjautunut ulos.</p>
      </div>
    );
  }
}

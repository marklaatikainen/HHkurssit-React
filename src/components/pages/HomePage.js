import React, { Component } from "react";
import DashBoard from "../DashBoard";
import { loggedIn } from "../Functions";

export default class Home extends Component {
  state = {
    loggedIn: false
  };

  componentDidMount() {
    this.setState({ loggedIn: this.checkIfLoggedIn() });
  }

  componentWillReceiveProps() {
    this.setState({ loggedIn: this.checkIfLoggedIn() }, () => {
      if (this.state.loggedIn === false) {
        window.location.replace("/login");
      }
    });
  }

  checkIfLoggedIn() {
    return loggedIn();
  }

  render() {
    return (
      <div>
        {this.state.loggedIn ? (
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

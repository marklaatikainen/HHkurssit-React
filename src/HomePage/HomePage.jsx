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
          <div className="center">
            <p>
              Haaga-Helian lukujärjestykset.<br /><br /> Sovelluksella löydät helposti
              oikeat kurssit tarjonnasta, sekä kurssien oleellisimmat tiedot.
              Kursseja voit lisätä omiin ja nähdä oman lukujärjestyksen.
            </p>
            <p>Sovellus on suunniteltu etupäässä mobiililaitteille.</p>
            <p>
              Aloita <a href="/login">kirjautumalla sisään</a>.
            </p>
          </div>
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

import React, { Component } from "react";
import { connect } from "react-redux";
import { userActions, settingsActions } from "../_actions";

class DashBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: ""
    };
  }

  componentDidMount() {
    this.props.dispatch(settingsActions.getSettings());
    this.setState({
      user: userActions.getProfile().sub
    });
  }

  render() {
    const { user } = this.state;
    const { settings } = this.props.settings;
    return (
      <div className="center">
        <h5>Tervetuloa, {user}</h5>
        <br />
        <i className="center">
          Sovelluksesta löytyy tällä hetkellä lukujärjestys: {settings !== undefined ? settings.nimi : null}
        </i>
        <i>
          <br />
          Kurssitarjonta on viimeksi päivitetty{" "}
          {new Date(
            settings !== undefined ? settings.updated : null
          ).toLocaleDateString("fi-FI", {
            timeZone: "UTC"
          })}
        </i>
        <br />
        <br />
        <i className="center">
          Voit aloittaa etsimällä suodattimien avulla{" "}
          <a href="/courses">
             haluamasi kurssit
          </a>
        </i>
        <br />
        <br />
        <i className="center">
          Voit katsoa myös kurssien ja ryhmien{" "}
          <a href="/timetables">aikatauluja</a>, sekä omaa lukujärjestystä.
        </i>
        <br />
        <br />
        <i className="center">
          Omat kurssit löytyvät {" "}
          <a href="/own">täältä</a>.
        </i>        
        <br />
        <br />
        <i className="center">
          Voi muokata myös {" "}
          <a href="/profile">omia tietojasi</a>.
        </i>        
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { settings } = state;
  return {
    settings
  };
}

const connectedDashBoard = connect(mapStateToProps)(DashBoard);
export { connectedDashBoard as DashBoard };

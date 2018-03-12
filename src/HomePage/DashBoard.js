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
      <div>
        <h5>Tervetuloa, {user}</h5>
        <br />
        <i className="center">
          Ohjelmassa {settings !== undefined ? settings.nimi : null}
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
          Voit aloittaa selaamalla{" "}
          <a href="/courses">
            kaikkia kursseja tai suodattamalla haluamasi kurssit
          </a>
        </i>
        <br />
        <br />
        <i className="center">
          Voit katsoa myös kurssien ja ryhmien{" "}
          <a href="/timetables">aikatauluja</a>, sekä omaa lukujärjestystä.
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

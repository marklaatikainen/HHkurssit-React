import React, { Component } from "react";
import { connect } from "react-redux";
import { userActions, courseActions } from "../_actions";

class DashBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: ""
    };
  }

  componentDidMount() {
    this.props.dispatch(courseActions.getSettings());
    this.setState({
      user: userActions.getProfile().sub
    });
  }

  render() {
    const { user } = this.state;
    const { settings } = this.props.course;
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
          {new Date(settings !== undefined ? settings.updated : null).toLocaleDateString("fi-FI", {
            timeZone: "UTC"
          })}
        </i>
        <br />
        <br />
        <i className="center">
          Voit aloittaa selaamalla <a href="/courses">kaikkia kursseja</a> tai{" "}
          <a href="/search">suodattamalla kursseja hakuehdoilla.</a>
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
  const { settings, course } = state;
  return {
    settings,
    course
  };
}

const connectedDashBoard = connect(mapStateToProps)(DashBoard);
export { connectedDashBoard as DashBoard };

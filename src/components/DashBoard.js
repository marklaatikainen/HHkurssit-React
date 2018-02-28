import React, { Component } from "react";
import { getProfile } from "./Functions";
import { getSettings } from "../services/WebService";

export default class DashBoard extends Component {
  constructor() {
    super();

    this.state = {
      userName: null,
      settings: []
    };
  }

  componentDidMount() {
    this.fetchSettings();
  }

  fetchSettings = async () => {
    const res = await getSettings();

    this.setState({
      userName: getProfile().sub,
      settings: res[0]
    });
  };

  render() {
    return (
      <div>
        <h5>Tervetuloa, {this.state.userName}</h5>
        <br />
        <i className="center">Ohjelmassa {this.state.settings.nimi}.</i>
        <i><br />
          Kurssitarjonta on viimeksi päivitetty{" "}
          {new Date(this.state.settings.updated).toLocaleDateString("fi-FI", {
            timeZone: "UTC"
          })}
        </i>
        <br />
        <br />
        <i className="center">
          Voit aloittaa selaamalla <a href="/all">kaikkia kursseja</a> tai <a href="/search">suodattamalla kursseja
          hakuehdoilla.</a>
        </i>
        <br />
        <br />
        <i className="center">
          Voit katsoa myös kurssien ja ryhmien <a href="/timetables">aikatauluja</a>, sekä omaa
          lukujärjestystä.
        </i>
      </div>
    );
  }
}

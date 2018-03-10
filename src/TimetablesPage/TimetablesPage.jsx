import React, { Component } from "react";
import { connect } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

import { TimeModal } from "../_components";
import { timeActions, courseActions } from "../_actions";

class TimetablesPage extends Component {
  constructor() {
    super();

    this.state = {
      period: 1,
      group: "",
      course: ""
    };
  }

  componentDidMount() {
    this.props.dispatch(courseActions.getSettings());
  }

  handleChange = (event, index, period) => this.setState({ period });

  render() {
    const { dispatch } = this.props;
    const { settings } = this.props.course;

    return (
      <div className="center">
        <h5>Aikataulut</h5>
        <br />
        <br />
        <br />
        <br />
        <b>Valitse näytettävä periodi</b>
        <br />
        <MuiThemeProvider>
          {settings && (
            <SelectField
              id="selectPeriod"
              floatingLabelText="Periodi"
              value={this.state.period}
              onChange={this.handleChange}
              style={{ width: 300 }}
            >
          { settings.periodi1 && <MenuItem value={1} primaryText={settings.periodi1} /> }
          { settings.periodi2 && <MenuItem value={2} primaryText={settings.periodi2} /> }
          { settings.intensiiviviikko1 && <MenuItem value={3} primaryText={settings.intensiiviviikko1} /> }
          { settings.intensiiviviikko2 && <MenuItem value={4} primaryText={settings.intensiiviviikko2} /> }
          { settings.intensiiviviikko3 && <MenuItem value={5} primaryText={settings.intensiiviviikko3} /> }
          { settings.intensiiviviikko4 && <MenuItem value={6} primaryText={settings.intensiiviviikko4} /> }
            </SelectField>
          )}
          <br />
          <br />
          <br />
          <br />
          <b>Hae oma aikataulu</b>
          <br />
          <br />
          <RaisedButton
            onClick={() => dispatch(timeActions.getOwnTime(this.state.period))}
            disabled={!this.state.period}
            label="Hae"
            primary={true}
          />
          <br />
          <br />
          <b>Hae kurssin aikataulu</b>
          <br />
          <TextField
            id="course"
            onChange={(event, newValue) => this.setState({ course: newValue })}
            placeholder="Kurssin tunnus"
          />
          <br />
          <br />
          <RaisedButton
            onClick={() =>
              dispatch(
                timeActions.getCourseTime(this.state.course, this.state.period)
              )
            }
            disabled={!this.state.course || !this.state.period}
            label="Hae"
            primary={true}
          />
          <br />
          <br />
          <b>Hae ryhmän aikataulu</b>
          <br />
          <TextField
            id="group"
            onChange={(event, newValue) => this.setState({ group: newValue })}
            placeholder="Ryhmätunnus"
          />
          <br />
          <br />
          <RaisedButton
            onClick={() =>
              dispatch(
                timeActions.getGroupTime(this.state.group, this.state.period)
              )
            }
            disabled={!this.state.group || !this.state.period}
            label="Hae"
            primary={true}
          />
          <br />
          <br />
          <TimeModal />
        </MuiThemeProvider>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { modal, course } = state;
  return {
    modal,
    course
  };
}

const connectedTimetablesPage = connect(mapStateToProps)(TimetablesPage);
export { connectedTimetablesPage as TimetablesPage };

import React, { Component } from "react";
import { Checkbox, CheckboxGroup } from "react-checkbox-group";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";

export class CampusFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // campuses: ["pasila", "malmi", "haaga"],
      campuses: []
    };
  }

  componentDidMount() {
    if (this.props.toCampuses.length !== 0) {
      this.setState({
        campuses: this.props.toCampuses
      });
    } else {
      this.props.selectedCampuses({ selected: this.state.campuses });
    }
  }

  campusesChanged = newCampuses => {
    this.setState(
      {
        campuses: newCampuses
      },
      () => {
        this.props.selectedCampuses({ selected: this.state.campuses });
      }
    );
  };

  selectAll() {
    this.setState(
      {
        campuses: ["pasila", "malmi", "haaga"]
      },
      () => {
        this.props.selectedCampuses({ selected: this.state.campuses });
      }
    );
  }

  deSelectAll() {
    this.setState(
      {
        campuses: []
      },
      () => {
        this.props.selectedCampuses({ selected: this.state.campuses });
      }
    );
  }

  render() {
    return (
      <div>
        <div className="form-group clearfix">
          <p className="centerwbg">Toimipisteet:</p>
          <MuiThemeProvider>
            <RaisedButton
              label="Valitse kaikki"
              onClick={() => this.selectAll()}
              type="submit"
              style={buttonStyle}
            />
            <RaisedButton
              label="Poista valinnat"
              onClick={() => this.deSelectAll()}
              type="submit"
              style={buttonStyle}
            />
          </MuiThemeProvider>
          <br />
          <CheckboxGroup
            name="campuses"
            value={this.state.campuses}
            onChange={this.campusesChanged}
          >
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="pasila" /> Pasila
              </label>
            </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="malmi" /> Malmi
              </label>
            </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="haaga" /> Haaga
              </label>
            </div>
          </CheckboxGroup>
        </div>
        <hr />
      </div>
    );
  }
}

const buttonStyle = {
  marginTop: 10,
  marginLeft: '6%',
  marginBottom: 25,
};

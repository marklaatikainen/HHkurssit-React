import React, { Component } from "react";
import { Checkbox, CheckboxGroup } from "react-checkbox-group";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";

export class ProgramFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // programs: [
      //   "ASSI",
      //   "BITE",
      //   "FINA",
      //   "GLOBBA",
      //   "HELI",
      //   "HETI",
      //   "HH",
      //   "HOSBA",
      //   "HOTEM",
      //   "HOTRA",
      //   "JOURA",
      //   "MATKA",
      //   "MUBBA",
      //   "MYYNTI",
      //   "RUOKAT"
      // ],
      programs: []
    };
  }

  programsChanged = newPrograms => {
    this.setState(
      {
        programs: newPrograms
      },
      () => {
        this.props.selectedPrograms({ selected: this.state.programs });
      }
    );
  };

  selectAll() {
    this.setState(
      {
        programs: [
          "ASSI",
          "BITE",
          "FINA",
          "GLOBBA",
          "HELI",
          "HETI",
          "HH",
          "HOSBA",
          "HOTEM",
          "HOTRA",
          "JOURA",
          "MATKA",
          "MUBBA",
          "MYYNTI",
          "RUOKAT"
        ]
      },
      () => {
        this.props.selectedPrograms({ selected: this.state.programs });
      }
    );
  }

  deSelectAll() {
    this.setState(
      {
        programs: []
      },
      () => {
        this.props.selectedPrograms({ selected: this.state.programs });
      }
    );
  }

  componentDidMount() {
    if (this.props.toPrograms.length !== 0) {
      this.setState({
        programs: this.props.toPrograms
      });
    } else {
      this.props.selectedPrograms({ selected: this.state.programs });
    }
  }

  render() {
    return (
      <div>
        <div className="form-group clearfix">
          <p className="centerwbg">Koulutusohjelmat:</p>
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
            name="programs"
            value={this.state.programs}
            onChange={this.programsChanged}
          >
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="ASSI" /> ASSI
              </label>
            </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="BITE" /> BITE
              </label>
            </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="FINA" /> FINA
              </label>
            </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="GLOBBA" /> GLOBBA
              </label>
            </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="HELI" /> HELI
              </label>
            </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="HETI" /> HETI
              </label>
            </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="HH" /> HH
              </label>
            </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="HOSBA" /> HOSBA
              </label>
            </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="HOTEM" /> HOTEM
              </label>
            </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="HOTRA" /> HOTRA
              </label>
            </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="JOURA" /> JOURA
              </label>
            </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="MATKA" /> MATKA
              </label>
            </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="MUBBA" /> MUBBA
              </label>
            </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="MYYNTI" /> MYYNTI
              </label>
            </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="RUOKAT" /> RUOKAT
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

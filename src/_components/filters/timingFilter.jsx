import React, { Component } from "react";
import { Checkbox, CheckboxGroup } from "react-checkbox-group";
import { connect } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";

class TimingFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // timings: [1, 2, 3]
      timings: []
    };
  }

  timingsChanged = newTimings => {
    this.setState(
      {
        timings: newTimings
      },
      () => {
        this.props.selectedTimings({ selected: this.state.timings });
      }
    );
  };

  selectAll() {
    this.setState(
      {
        timings: [1, 2, 3]
      },
      () => {
        this.props.selectedTimings({ selected: this.state.timings });
      }
    );
  }

  deSelectAll() {
    this.setState(
      {
        timings: []
      },
      () => {
        this.props.selectedTimings({ selected: this.state.timings });
      }
    );
  }

  componentDidMount() {
    if (this.props.toTimings.length !== 0) {
      this.setState({
        timings: this.props.toTimings
      });
    } else {
      this.props.selectedTimings({ selected: this.state.timings });
    }
  }

  render() {
    const { settings } = this.props.settings;
    return (
      <div>
        <div className="form-group clearfix">
          <p className="centerwbg">Ajoitus:</p>
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
            name="timings"
            value={this.state.timings}
            onChange={this.timingsChanged}
          >
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value={1} />{" "}
                {settings ? settings.periodi1 : "Periodi 1"}
              </label>
            </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value={2} />{" "}
                {settings ? settings.periodi2 : "Periodi 2"}
              </label>
            </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value={3} /> Intensiivi
              </label>
              {/* </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value={4} /> {settings.intensiiviviikko2}
              </label>
            </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value={5} /> {settings.intensiiviviikko3}
              </label>
            </div>
            {this.state.settings.intensiiviviikko4 != null ? (
              <div className="checkbox-inline">
                <label className="filter-checkbox">
                  <Checkbox value={6} /> {settings.intensiiviviikko4}
            </label> */}
            </div>
            {/* ) : null} */}
          </CheckboxGroup>
        </div>
      </div>
    );
  }
}

const buttonStyle = {
  marginTop: 10,
  marginLeft: '6%',
  marginBottom: 25,
};


function mapStateToProps(state) {
  const { settings } = state;
  return {
    settings
  };
}

const connectedTimingFilter = connect(mapStateToProps)(TimingFilter);
export { connectedTimingFilter as TimingFilter };

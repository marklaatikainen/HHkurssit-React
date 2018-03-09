import React, { Component } from "react";
import { Checkbox, CheckboxGroup } from "react-checkbox-group";
import { connect } from "react-redux";

import { courseActions } from "../../_actions";

class TimingFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: [],
      timings: [1, 2, 3]
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

  componentDidMount() {
    this.props.dispatch(courseActions.getSettings());
  }

  componentWillReceiveProps() {
    const { settings } = this.props.course;

    this.setState(
      {
        settings: settings
      },
      () => {
        if (this.props.toTimings.length !== 0) {
          this.setState({
            timings: this.props.toTimings
          });
        } else {
          this.props.selectedTimings({ selected: this.state.timings });
        }
      }
    );
  }

  selectAll() {
    this.setState(
      {
        timings: [1, 2, 3, 4, 5, 6]
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

  render() {
    const { settings } = this.state;
    return (
      <div>
        {settings ? (
          <div className="form-group clearfix">
            <p className="centerwbg">Ajoitus:</p>
            <hr />
            <button
              className="btn__bs filtermodal__button--select grid-2"
              onClick={() => this.selectAll()}
            >
              Valitse kaikki
            </button>
            <button
              className="btn__bs filtermodal__button--deselect grid-2"
              onClick={() => this.deSelectAll()}
            >
              Poista valinnat
            </button>
            <br />
            <br />
            <br />
            <CheckboxGroup
              name="timings"
              value={this.state.timings}
              onChange={this.timingsChanged}
            >
              <div className="checkbox-inline">
                <label className="filter-checkbox">
                  <Checkbox value={1} /> {this.state.settings.periodi1}
                </label>
              </div>
              <div className="checkbox-inline">
                <label className="filter-checkbox">
                  <Checkbox value={2} /> {this.state.settings.periodi2}
                </label>
              </div>
              <div className="checkbox-inline">
                <label className="filter-checkbox">
                  <Checkbox value={3} /> Intensiivi
                </label>
                {/* </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value={4} /> {this.state.settings.intensiiviviikko2}
              </label>
            </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value={5} /> {this.state.settings.intensiiviviikko3}
              </label>
            </div>
            {this.state.settings.intensiiviviikko4 != null ? (
              <div className="checkbox-inline">
                <label className="filter-checkbox">
                  <Checkbox value={6} /> {this.state.settings.intensiiviviikko4}
            </label> */}
              </div>
              {/* ) : null} */}
            </CheckboxGroup>
          </div>
        ) : null}
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

const connectedTimingFilter = connect(mapStateToProps)(TimingFilter);
export { connectedTimingFilter as TimingFilter };

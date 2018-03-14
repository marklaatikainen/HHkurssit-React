import React, { Component } from "react";
import { Checkbox, CheckboxGroup } from "react-checkbox-group";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";

export class MethodFilter extends Component {
  constructor() {
    super();

    this.state = {
      // methods: ["lahi", "eta", "int", "mmt", "nstop", "vir", "viros"]
      methods: []
    };
  }

  methodsChanged = newMethods => {
    this.setState(
      {
        methods: newMethods
      },
      () => {
        this.props.selectedMethods({ selected: this.state.methods });
      }
    );
  };

  selectAll() {
    this.setState(
      {
        methods: ["lahi", "eta", "int", "mmt", "nstop", "vir", "viros"]
      },
      () => {
        this.props.selectedMethods({ selected: this.state.methods });
      }
    );
  }

  deSelectAll() {
    this.setState(
      {
        methods: []
      },
      () => {
        this.props.selectedMethods({ selected: this.state.methods });
      }
    );
  }

  componentDidMount() {
    if (this.props.toMethods.length !== 0) {
      this.setState({
        methods: this.props.toMethods
      });
    } else {
      this.props.selectedMethods({ selected: this.state.methods });
    }
  }

  render() {
    return (
      <div>
        <div className="form-group clearfix">
          <p className="centerwbg">Suoritustapa:</p>
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
            name="methods"
            value={this.state.methods}
            onChange={this.methodsChanged}
          >
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="lahi" /> lähi
              </label>
            </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="eta" /> etä
              </label>
            </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="int" /> int
              </label>
            </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="mmt" /> mmt
              </label>
            </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="nstop" /> nstop
              </label>
            </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="vir" /> vir
              </label>
            </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="viros" /> viros
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

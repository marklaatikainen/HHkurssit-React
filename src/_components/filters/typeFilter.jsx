import React, { Component } from "react";
import { Checkbox, CheckboxGroup } from "react-checkbox-group";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";

export class TypeFilter extends Component {
  constructor() {
    super();

    this.state = {
      // types: ["ilta", "paiva"]
      types: []
    };
  }

  typesChanged = newTypes => {
    this.setState(
      {
        types: newTypes
      },
      () => {
        this.props.selectedTypes({ selected: this.state.types });
      }
    );
  };

  componentDidMount() {
    if (this.props.toTypes.length !== 0) {
      this.setState({
        types: this.props.toTypes
      });
    } else {
      this.props.selectedTypes({ selected: this.state.types });
    }
  }

  selectAll() {
    this.setState(
      {
        types: ["ilta", "paiva"]
      },
      () => {
        this.props.selectedTypes({ selected: this.state.types });
      }
    );
  }

  deSelectAll() {
    this.setState(
      {
        types: []
      },
      () => {
        this.props.selectedTypes({ selected: this.state.types });
      }
    );
  }

  render() {
    return (
      <div>
        <div className="form-group clearfix">
          <p className="centerwbg">Tyypit:</p>
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
            name="types"
            value={this.state.types}
            onChange={this.typesChanged}
          >
            {/* <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="exchange" /> Exchange
              </label>
            </div> */}
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="ilta" /> Ilta
              </label>
            </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="paiva" /> Päivä
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
  marginLeft: "6%",
  marginBottom: 25
};

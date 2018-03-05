import React, { Component } from "react";
import { Checkbox, CheckboxGroup } from "react-checkbox-group";

export default class TypeFilter extends Component {
  constructor() {
    super();

    this.state = {
      types: ["ilta", "paiva"]
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

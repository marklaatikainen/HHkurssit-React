import React, { Component } from "react";
import { Checkbox, CheckboxGroup } from "react-checkbox-group";

export default class LanguageFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: ["fin", "eng", "swe"]
    };
  }

  componentDidMount() {
    if (this.props.toLanguages.length !== 0) {
      this.setState({
        languages: this.props.toLanguages
      });
    } else {
      this.props.selectedLanguages({ selected: this.state.languages });
    }
  }

  languagesChanged = newLanguages => {
    this.setState(
      {
        languages: newLanguages
      },
      () => {
        this.props.selectedLanguages({ selected: this.state.languages });
      }
    );
  };

  selectAll() {
    this.setState(
      {
        languages: ["fin", "eng", "swe"]
      },
      () => {
        this.props.selectedLanguages({ selected: this.state.languages });
      }
    );
  }

  deSelectAll() {
    this.setState(
      {
        languages: []
      },
      () => {
        this.props.selectedLanguages({ selected: this.state.languages });
      }
    );
  }

  render() {
    return (
      <div>
        <div className="form-group clearfix">
          <p className="centerwbg">Opetuskielet:</p>
          <hr />
          <button
            className="filtermodal__button--select grid-2"
            onClick={() => this.selectAll()}
          >
            Valitse kaikki
          </button>
          <button
            className="filtermodal__button--deselect grid-2"
            onClick={() => this.deSelectAll()}
          >
            Poista valinnat
          </button>
          <br />
          <br />
          <br />
          <CheckboxGroup
            name="languages"
            value={this.state.languages}
            onChange={this.languagesChanged}
          >
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="fin" /> Suomi
              </label>
            </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="eng" /> English
              </label>
            </div>
            <div className="checkbox-inline">
              <label className="filter-checkbox">
                <Checkbox value="swe" /> Svenska
              </label>
            </div>
          </CheckboxGroup>
        </div>
        <hr />
      </div>
    );
  }
}

import React, { Component } from "react";
import { Checkbox, CheckboxGroup } from "react-checkbox-group";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";

export class LanguageFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // languages: ["fin", "eng", "swe"]
      languages: []
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

const buttonStyle = {
  marginTop: 10,
  marginLeft: '6%',
  marginBottom: 25,
};

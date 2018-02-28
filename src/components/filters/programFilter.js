import React, { Component } from "react";
import { getProgramList } from "../../services/WebService";
import { Checkbox, CheckboxGroup } from "react-checkbox-group";

export default class ProgramFilter extends Component {
  constructor() {
    super();

    this.state = {
      allPrograms: [],
      programs: [],
      extra: []
    };
  }

  componentDidMount() {
    this.getPrograms();
  }

  programsChanged = newPrograms => {
    this.setState(
      {
        extra: newPrograms
      },
      () => {
        this.props.selectedPrograms({ selected: this.state.extra });
      }
    );
  };

  getPrograms = async () => {
    const progs = await getProgramList();
    this.setState(
      {
        allPrograms: progs.vaihtoehdot,
        programs: progs.vaihtoehdot,
        extra: progs.vaihtoehdot
      },
      () => {
        if (this.props.toPrograms.length !== 0) {
          this.setState({
            extra: this.props.toPrograms
          });
        } else {
          this.props.selectedPrograms({ selected: this.state.extra });
        }
      }
    );
  };

  selectAll() {
    this.setState(
      {
        extra: this.state.allPrograms
      },
      () => {
        this.props.selectedPrograms({ selected: this.state.extra });
      }
    );
  }

  deSelectAll() {
    this.setState(
      {
        extra: []
      },
      () => {
        this.props.selectedPrograms({ selected: this.state.extra });
      }
    );
  }

  render() {
    return (
      <div>
        {this.state.programs.length > 0 ? (
          <div className="form-group clearfix">
            <p className="centerwbg">Koulutusohjelmat:</p>
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
              name="programs"
              value={this.state.extra}
              onChange={this.programsChanged}
            >
              {this.state.allPrograms.length > 0
                ? this.state.allPrograms.map((program, i) => {
                    return (
                      <div key={i} className="checkbox-inline">
                        <label className="filter-checkbox">
                          <Checkbox value={program} /> {program}
                        </label>
                      </div>
                    );
                  })
                : null}
            </CheckboxGroup>
          </div>
        ) : null}
        <hr />
      </div>
    );
  }
}

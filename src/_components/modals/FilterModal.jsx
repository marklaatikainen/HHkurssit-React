import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";

import { modalActions } from "../../_actions";
// Filters
import {
  LanguageFilter,
  CampusFilter,
  TypeFilter,
  MethodFilter,
  ProgramFilter,
  TimingFilter
} from "../../_components";

Modal.setAppElement("#root");

class FilterModal extends Component {
  constructor() {
    super();

    this.state = {
      selectedLanguages: [],
      selectedCampuses: [],
      selectedTypes: [],
      selectedMethods: [],
      selectedPrograms: [],
      selectedTimings: []
    };
  }

  render() {
    const { filter_open } = this.props.modal;
    const { dispatch } = this.props;
    return (
      <Modal
        isOpen={filter_open}
        onRequestClose={() => dispatch(modalActions.cancelFilterModal())}
        contentLabel="Kurssifiltteri"
        className="modal FilterModal"
        overlayClassName="modal--overlay"
      >
        <br />
        <h4>Valitse näytettävät kurssit</h4>
        <br />
        <LanguageFilter
          toLanguages={this.state.selectedLanguages}
          selectedLanguages={val =>
            this.setState({ selectedLanguages: val.selected })
          }
        />
        <CampusFilter
          toCampuses={this.state.selectedCampuses}
          selectedCampuses={val =>
            this.setState({ selectedCampuses: val.selected })
          }
        />
        <TypeFilter
          toTypes={this.state.selectedTypes}
          selectedTypes={val => this.setState({ selectedTypes: val.selected })}
        />
        <MethodFilter
          toMethods={this.state.selectedMethods}
          selectedMethods={val =>
            this.setState({ selectedMethods: val.selected })
          }
        />
        <ProgramFilter
          toPrograms={this.state.selectedPrograms}
          selectedPrograms={val =>
            this.setState({ selectedPrograms: val.selected })
          }
        />
        <TimingFilter
          toTimings={this.state.selectedTimings}
          selectedTimings={val =>
            this.setState({ selectedTimings: val.selected })
          }
        />
        <br />
        <div className="modal-footer">
          <MuiThemeProvider>
            <RaisedButton
              label="Näytä kurssit"
              onClick={() =>
                dispatch(modalActions.closeFilterModal(this.state))
              }
              type="submit"
              primary={true}
              buttonStyle={{ backgroundColor: "#A4C639" }}
              style={buttonStyle}
            />
          </MuiThemeProvider>
        </div>
        <br />
      </Modal>
    );
  }
}

const buttonStyle = {
  marginLeft: "5%",
  marginTop: 20,
  marginBottom: 25,
  width: "90%"
};

function mapStateToProps(state) {
  const { modal } = state;
  return {
    modal
  };
}

const connectedFilterModal = connect(mapStateToProps)(FilterModal);
export { connectedFilterModal as FilterModal };

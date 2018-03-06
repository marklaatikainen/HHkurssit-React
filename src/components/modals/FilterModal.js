import React, { Component } from "react";
import Modal from "react-modal";
// Filters
import LanguageFilter from "../filters/languageFilter";
import CampusFilter from "../filters/campusFilter";
import TypeFilter from "../filters/typeFilter";
import MethodFilter from "../filters/methodFilter";
import ProgramFilter from "../filters/programFilter";
import TimingFilter from "../filters/timingFilter";

export default class FilterModal extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      FilterModalIsOpen: false,
      selectedLanguages: [],
      selectedCampuses: [],
      selectedTypes: [],
      selectedMethods: [],
      selectedPrograms: [],
      selectedTimings: []
    };
  }

  componentWillReceiveProps() {
    this.setState(
      {
        FilterModalIsOpen: this.props.modalIsOpen,
        data: this.props.data
      },
      () => {
        if (this.state.FilterModalIsOpen) {
          document.body.classList.add("no-overflow");
        }
      }
    );
  }

  closeFilterModal() {
    this.setState(
      {
        FilterModalIsOpen: false
      },
      () => {
        this.props.filter(this.state);
      }
    );
  }

  render() {
    return (
      <Modal
        isOpen={this.state.FilterModalIsOpen}
        ariaHideApp={false}
        onRequestClose={this.closeFilterModal}
        contentLabel="Suodata kurssit"
        className="modal FilterModal"
        overlayClassName="modal--overlay"
      >
        <h6>Suodatushaku</h6>
        <br />
        <LanguageFilter
          toLanguages={this.props.selectedLanguages}
          selectedLanguages={val =>
            this.setState({ selectedLanguages: val.selected })
          }
        />
        <CampusFilter
          toCampuses={this.props.selectedCampuses}
          selectedCampuses={val =>
            this.setState({ selectedCampuses: val.selected })
          }
        />
        <TypeFilter
          toTypes={this.props.selectedTypes}
          selectedTypes={val => this.setState({ selectedTypes: val.selected })}
        />
        <MethodFilter
          toMethods={this.props.selectedMethods}
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
        <br />
        <br />
        <div className="modal-footer">
          <button
            className="btn__bs filtermodal__button--filter"
            onClick={() => this.closeFilterModal()}
          >
            Hae
          </button>
        </div>
      </Modal>
    );
  }
}

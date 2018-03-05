import React, { Component } from "react";
// Modal
import Modal from "react-modal";
// Functions
import { filterCourses } from "./Functions";
// Loader spinner
import { ScaleLoader } from "react-spinners";

// Filters
import LanguageFilter from "./filters/languageFilter";
import CampusFilter from "./filters/campusFilter";
import TypeFilter from "./filters/typeFilter";
import MethodFilter from "./filters/methodFilter";
import ProgramFilter from "./filters/programFilter";
import TimingFilter from "./filters/timingFilter";

export default class FilterModal extends Component {
  constructor() {
    super();

    this.state = {
      filteredData: [],
      FilterModalIsOpen: false,
      // Checkbox states from components
      selectedLanguages: [],
      selectedCampuses: [],
      selectedTypes: [],
      selectedMethods: [],
      selectedPrograms: [],
      selectedTimings: []
    };
  }

  getStatesOfCheckBoxes() {
    let filtered = filterCourses(this.props);
    this.setState(
      {
        filteredData: filtered,
        loading: false
      },
      () => {
        this.props.filtered = this.state.filtered;
      }
    );
  }

  openFilterModal() {
    this.setState({ FilterModalIsOpen: true }, () => {
      document.body.classList.add("no-overflow");
    });
  }

  closeFilterModal() {
    this.setState(
      {
        FilterModalIsOpen: false,
        loading: true,
        filteredData: []
      },
      () => {
        document.body.classList.remove("no-overflow");
        this.filterData();
      }
    );
  }

  filterData() {
    this.getStatesOfCheckBoxes();
  }

  render() {
    return (
      <Modal
        isOpen={this.state.FilterModalIsOpen}
        style={customStyles}
        onRequestClose={this.closeFilterModal}
        contentLabel="Suodata kurssit"
      >
        <h6>Suodatushaku</h6>
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
        <br />
        <br />

        <div className="modal-footer">
          <button className="btn__bs filtermodal__button--filter" onClick={() => this.closeFilterModal()}>Hae</button>
        </div>
      </Modal>
    );
  }
}

const customStyles = {
  overlay: {
    position: "fixed",
    maxWidth: "970px",
    height: "100vh",
    top: 0,
    margin: "0 auto",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 60,
    backgroundColor: "rgba(255, 255, 255, 0.75)"
  },
  content: {
    position: "absolute",
    backgroundColor: "#eee",
    margin: 0,
    top: "5px",
    left: "5px",
    right: "5px",
    bottom: "5px",
    border: "1px solid #ccc",
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "15px"
  }
};

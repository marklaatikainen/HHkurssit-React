import React, { Component } from "react";
// import { loggedIn } from "../components/Functions";
import { ScaleLoader } from "react-spinners";
import Select from "react-select";
import TimeModal from "./TimeModal";
// webservice
import {
  getCourseTimetable,
  getGroupTimetable,
  getOwnTimetable
} from "../services/WebService";

export default class Timetables extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      loggedIn: false,
      data: [],
      selectedOption: "",
      modalIsOpen: false,
      modalData: [],
      group: "",
      course: ""
    };

    this.handleValue = this.handleValue.bind(this);
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  handleValue(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  openModal(e) {
    this.setState({
      modalIsOpen: true,
      modalData: e.target
    });
  }

  groupTime() {
    console.log(this.state.group);
  }

  courseTime() {
    console.log(this.state.course);
  }

  ownTime() {
    console.log(this.state.selectedOption);
  }

  render() {
    return (
      <div>
        <h5>Aikataulut</h5>
        <b>Hae oma aikataulu</b>
        <div className="section">
          <Select
            id="period_select"
            ref={ref => {
              this.select = ref;
            }}
            onBlurResetsInput={false}
            onSelectResetsInput={false}
            options={[
              { value: "1", label: "Ensimmäinen periodi" },
              { value: "2", label: "Toinen periodi" },
              { value: "3", label: "Intensiiviviikko 1" },
              { value: "4", label: "Intensiiviviikko 2" },
              { value: "5", label: "Intensiiviviikko 12" }
            ]}
            simpleValue
            clearable={false}
            name="selectedOption"
            disabled={false}
            value={this.state.selectValue}
            onChange={this.handleChange}
            searchable={false}
          />
          <br />
          <button onClick={() => this.ownTime()}>Hae</button>
        </div>
        <br />
        <b>Hae kurssin aikataulu</b>
        <input
          id="CourseSearch"
          name="course"
          onChange={this.handleValue}
          className="input__search--timetable"
          placeholder="Kurssin tunnus"
          type="text"
        />
        <br />
        <br />
        <button onClick={() => this.courseTime()}>Hae</button>
        <br />
        <br />
        <b>Hae ryhmän aikataulu</b>
        <input
          id="GroupSearch"
          name="group"
          onChange={this.handleValue}
          className="input__search--timetable"
          placeholder="Ryhmätunnus.."
          type="text"
        />
        <br />
        <br />
        <button onClick={() => this.groupTime()}>Hae</button>
        <ScaleLoader
          color={"#0056b3"}
          size={100}
          loading={this.state.loading}
        />
        <br />
        <br />
        <TimeModal
          data={this.state.modalData}
          openModal={this.state.modalIsOpen}
        />
      </div>
    );
  }
}

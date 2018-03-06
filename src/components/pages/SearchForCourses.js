import React, { Component } from "react";
// Modals
import CourseModal from "../modals/CourseModal";
import FilterModal from "../modals/FilterModal";
// Functions
import { getProfile, loggedIn, filterCourses } from "../Functions";
// API calls
import { findAllCourses } from "../../services/WebService";
// Loader spinner
import { ScaleLoader } from "react-spinners";
// Table
import DataTable from "../DataTable";
import FilterInputWithAddon from "../FilterInputWithAddon";

export default class SearchForCourses extends Component {
  constructor() {
    super();

    this.state = {
      userName: null,
      loading: true,
      loggedIn: false,
      data: [],
      filteredData: [],
      selectedCourse: [],
      CourseModalIsOpen: false,
      filterModalIsOpen: false,
      inputText: "",
      counter: 0,
      // Checkbox states from components
      selectedLanguages: [],
      selectedCampuses: [],
      selectedTypes: [],
      selectedMethods: [],
      selectedPrograms: [],
      selectedTimings: []
    };
  }

  componentWillMount() {
    this.setState({ loggedIn: this.checkIfLoggedIn() }, () => {
      if (!this.state.loggedIn) {
        window.location.replace("/login");
      } else {
        this.fetchData();
      }
    });
  }

  componentWillReceiveProps() {
    this.setState({ loggedIn: this.checkIfLoggedIn() }, () => {
      if (this.state.loggedIn === false) {
        window.location.replace("/login");
      }
    });
  }

  checkIfLoggedIn() {
    return loggedIn();
  }

  componentDidMount() {
    this.setState({
      userName: getProfile().sub
    });
  }

  openCourseModal() {
    this.setState({ CourseModalIsOpen: true }, () => {
      document.body.classList.add("no-overflow");
    });
  }

  closeCourseModal() {
    this.setState({ CourseModalIsOpen: false, selectedCourse: [] }, () => {
      document.body.classList.remove("no-overflow");
    });
  }

  //
  // Haetaan kurssit backendista
  //
  fetchData = async () => {
    const data = await findAllCourses();
    this.setState({
      data: data,
      filteredData: data,
      loading: false,
      counter: data.length
    });
  };

  //
  // Päivitetään löytyneiden kurssien määrä suodatuksen yhteydessä
  //
  setCounter(num) {
    this.setState({
      counter: num
    });
  }

  //
  // Asetetaan valittu kurssi stateen ja avataan modal.
  // Modal käyttää sisällössään tätä dataa.
  //
  selectCourse(kurssi) {
    this.setState(
      {
        selectedCourse: kurssi
      },
      () => {
        this.openCourseModal();
      }
    );
  }

  //
  // Filter modalilta tuleva state data.
  // Tarvitaan tässä komponentissa, jotta seuraavan kerran, kun modal avataan,
  // niin checkboksien tila on sama edellisen haun jäljiltä.
  // Funktio suoritetaan, kun filtteri modal suljetaan.
  //
  filter(data) {
    document.body.classList.remove("no-overflow");

    this.setState(
      {
        loading: true,
        filterModalIsOpen: false,
        selectedLanguages: data.selectedLanguages,
        selectedCampuses: data.selectedCampuses,
        selectedTypes: data.selectedTypes,
        selectedMethods: data.selectedMethods,
        selectedPrograms: data.selectedPrograms,
        selectedTimings: data.selectedTimings
      },
      () => {
        let res = filterCourses(this.state);
        this.setState({
          filteredData: res,
          counter: res.length,
          loading: false
        });
      }
    );
  }

  render() {
    return (
      <div>
        <small>
          <i>
            hakuehdoilla löytyi{" "}
            {this.state.filteredData !== undefined ? this.state.counter : 0}{" "}
            kurssia
          </i>
        </small>
        <br />
        <FilterInputWithAddon
          filterText={text => this.setState({ inputText: text })}
          openFilterModal={() =>
            this.setState({
              filterModalIsOpen:
                this.state.filterModalIsOpen === true ? false : true
            })
          }
        />
        <FilterModal
          modalIsOpen={this.state.filterModalIsOpen}
          data={this.state.data}
          filter={f => this.filter(f)}
          selectedLanguages={this.state.selectedLanguages}
          selectedCampuses={this.state.selectedCampuses}
          selectedTypes={this.state.selectedTypes}
          selectedMethods={this.state.selectedMethods}
          selectedPrograms={this.state.selectedPrograms}
          selectedTimings={this.state.selectedTimings}
        />
        {!this.state.loading && this.state.filteredData !== [] ? (
          <DataTable
            filterText={this.state.inputText}
            data={this.state.filteredData}
            selectCourse={course => this.selectCourse(course)}
            counter={counter => this.setCounter(counter)}
          />
        ) : (
          <div className="sweet-loading">
            <ScaleLoader
              color={"#0056b3"}
              size={100}
              loading={this.state.loading}
            />
          </div>
        )}
        <CourseModal
          CourseModalIsOpen={() => this.state.CourseModalIsOpen}
          closeCourseModal={() => this.closeCourseModal()}
          data={this.state.selectedCourse}
        />
      </div>
    );
  }
}

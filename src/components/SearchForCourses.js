import React, { Component } from "react";
// Modals
import Modal from "react-modal";
import CourseModal from "./CourseModal";
// Functions
import { getProfile, loggedIn, filterCourses } from "./Functions";
// API calls
import { findAllCourses } from "../services/WebService";
// Loader spinner
import { ScaleLoader } from "react-spinners";

// Filters
import LanguageFilter from "./filters/languageFilter";
import CampusFilter from "./filters/campusFilter";
import TypeFilter from "./filters/typeFilter";
import MethodFilter from "./filters/methodFilter";
import ProgramFilter from "./filters/programFilter";
import TimingFilter from "./filters/timingFilter";

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
      FilterModalIsOpen: false,
      CourseModalIsOpen: false,
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
    let filtered = filterCourses(this.state);
    this.setState(
      {
        filteredData: filtered,
        loading: false
      },
      () => {}
    );
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

  openFilterModal() {
    this.setState({ FilterModalIsOpen: true }, () => {
      document.body.classList.add("no-overflow");
    });
  }

  closeCourseModal() {
    this.setState({ CourseModalIsOpen: false, selectedCourse: [] }, () => {
      document.body.classList.remove("no-overflow");
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

  fetchData = async () => {
    const data = await findAllCourses();
    this.setState({
      data: data,
      filteredData: data,
      loading: false
    });
  };

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

  courseFilter() {
    // Declare variables
    var input, filter, table, tr, td, i;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("filterCoursesTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  render() {
    return (
      <div>
        <small>
          <i>
            hakuehdoilla löytyi{" "}
            {this.state.filteredData !== undefined
              ? this.state.filteredData.length
              : 0}{" "}
            kurssia
          </i>
        </small>
        <br />
        <div className="search_container--filter">
          <div className="search_container--filter--group">
            <input
              id="search"
              name="search"
              className="search_container--filter--input"
              onKeyUp={() => this.courseFilter()}
              placeholder="Hae kurssia.."
              type="text"
            />
            <span className="search_container--filter--input-addon">
              <a
                className="filter-open"
                href="#modal"
                onClick={() => this.openFilterModal()}
              >
                <i className="fa fa-ellipsis-v" />
              </a>
            </span>
          </div>
          <br />
        </div>
        <Modal
          isOpen={this.state.FilterModalIsOpen}
          style={customStyles}
          ariaHideApp={false}
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
            selectedTypes={val =>
              this.setState({ selectedTypes: val.selected })
            }
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
            <button
              className="filtermodal__button--filter"
              onClick={() => this.closeFilterModal()}
            >
              Hae
            </button>
          </div>
        </Modal>
        {!this.state.loading && this.state.filteredData !== undefined ? (
          <div>
            <table
              id="filterCoursesTable"
              className="table table__data--allcourses"
            >
              <thead>
                <tr>
                  <th>Kurssitunnus</th>
                  <th>Kurssinimi:</th>
                  {/* <th className="hideInMobile">Op</th>
                  <th className="hideInMobile">Ohjelma</th>
                  <th className="hideInMobile">Toimipiste</th>
                  <th className="hideInMobile">Alkaa</th> */}
                </tr>
              </thead>
              <tbody>
                {this.state.filteredData.map((kurssi, i) => (
                  <tr key={i}>
                    <td className="nowrap">
                      <a
                        href="#moreinfo"
                        onClick={() => this.selectCourse(kurssi)}
                      >
                        {kurssi.opintotunnus}
                      </a>
                    </td>
                    <td>{kurssi.kurssinimi}</td>
                    {/* <td className="hideInMobile">{kurssi.opintopisteet}</td>
                    <td className="hideInMobile">{kurssi.ohjelma}</td>
                    <td className="hideInMobile">{kurssi.toimipiste}</td>
                    <td className="hideInMobile">
                      {new Date(kurssi.alkaa).toLocaleDateString("fi-FI", {
                        timeZone: "UTC"
                      })}
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
            <CourseModal
              CourseModalIsOpen={() => this.state.CourseModalIsOpen}
              closeCourseModal={() => this.closeCourseModal()}
              data={this.state.selectedCourse}
            />
          </div>
        ) : (
          <div className="sweet-loading">
            <ScaleLoader
              color={"#0056b3"}
              size={100}
              loading={this.state.loading}
            />
          </div>
        )}
      </div>
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

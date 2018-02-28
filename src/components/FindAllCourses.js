import React, { Component } from "react";
import { findAllCourses } from "../services/WebService";
import CourseModal from "./CourseModal";
import { loggedIn } from "../components/Functions";
import { ScaleLoader } from "react-spinners";

export default class FindAllCourses extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      loggedIn: false,
      data: [],
      selectedCourse: [],
      modalIsOpen: false
    };
  }

  closeModal() {
    this.setState({ modalIsOpen: false, selectedCourse: [] }, () => {
      document.body.classList.remove("no-overflow");
    });
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
      loading: false
    });
  };

  selectCourse(kurssi) {
    this.setState({ selectedCourse: kurssi, modalIsOpen: true });
    document.body.classList.add("no-overflow");
  }

  courseFilter() {
    // Declare variables
    var input, filter, table, tr, td, i;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("allCoursesTable");
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
        {this.state.data.length > 0 ? (
          <div>
            <div className="search__container--all">
              <input
                type="text"
                className="search_container--all--input"
                name="search"
                id="search"
                onKeyUp={() => this.courseFilter()}
                placeholder="Hae kurssia.."
              />
              <br />
            </div>
            <table id="allCoursesTable" className="table__data--allcourses">
              <thead>
                <tr>
                  <th>Kurssitunnus</th>
                  <th>Kurssinimi</th>
                  {/* <th className="hideInMobile">Op</th>
                  <th className="hideInMobile">Ohjelma</th>
                  <th className="hideInMobile">Toimipiste</th>
                  <th className="hideInMobile">Alkaa</th> */}
                </tr>
              </thead>
              <tbody id="tbody">
                {this.state.data.map((kurssi, i) => (
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
              CourseModalIsOpen={() => this.state.modalIsOpen}
              closeCourseModal={() => this.closeModal()}
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

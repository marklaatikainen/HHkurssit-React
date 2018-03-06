import React, { Component } from "react";
import {
  getOwnCourses,
  updateCourse,
  restoreDefaults
} from "../../services/WebService";
import CourseModal from "../modals/CourseModal";
import { loggedIn } from "../../components/Functions";
import { ScaleLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";

// TODO: poisto ja lisäysanimaatiot

export default class OwnCourses extends Component {
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

  handleCourseUpdate(e) {
    updateCourse(e.target.id, kurssi => {
      document.location.reload();
    });
  }

  openModal() {
    this.setState({ modalIsOpen: true }, () => {
      document.body.classList.add("no-overflow");
    });
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

  checkIfLoggedIn() {
    return loggedIn();
  }

  fetchData = async () => {
    const data = await getOwnCourses().catch(error => {
      toast(error);
      this.setState({
        loading: false
      });
    });
    this.setState({
      data: data,
      loading: false
    });
  };

  selectCourse(kurssi) {
    this.setState(
      {
        selectedCourse: kurssi
      },
      () => {
        this.openModal();
      }
    );
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
        <h5>Omat kurssit</h5>
        {this.state.data.length > 0 ? (
          <div>
            <div className="form-content">
              <table id="allCoursesTable" className="table table-sm col-md-12">
                <thead>
                  <tr>
                    <th>Kurssitunnus</th>
                    <th>Kurssinimi:</th>
                    <th>Poista</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((kurssi, i) => (
                    <tr key={i}>
                      <td>
                        <a
                          href="#moreinfo"
                          onClick={() => this.selectCourse(kurssi)}
                        >
                          {kurssi.opintotunnus}
                        </a>
                      </td>
                      <td>{kurssi.kurssinimi}</td>
                      <td>
                        <button
                          className="btn__delete"
                          id={kurssi.opintotunnus}
                          onClick={event => this.handleCourseUpdate(event)}
                        >
                          <i className="fa fa-trash-o" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="content-footer">
              <button className="btn__restore" onClick={() => restoreDefaults()}>
                Palauta alkuperäiset
              </button>
            </div>
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
        <ToastContainer />
      </div>
    );
  }
}

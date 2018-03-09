import React, { Component } from "react";
import { connect } from "react-redux";
import { ScaleLoader } from "react-spinners";

import { courseActions, modalActions } from "../_actions";

class DataTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: null,
      filter: ""
    };
  }
  componentDidMount() {
    this.props.dispatch(courseActions.getAllCourses(), () => {
      this.setState(
        {
          filter: this.props.fltr
        },
        () => this.setProps()
      );
    });
  }

  componentWillReceiveProps() {
    this.setProps();
  }

  setProps() {
    this.setState(
      {
        filter: this.props.fltr
      },
      () => {
        const table = document.getElementById("CoursesTable");
        const { data } = this.props.course;
        if (table && data) {
          if (this.state.counter !== data.length) {
            this.setState(
              {
                counter: data.length
              },
              () => {
                this.props.count(this.state.counter);
              }
            );
          }
          this.courseFilter();
        }
      }
    );
  }

  courseFilter() {
    const { filter } = this.state;
    // Declare variables
    let table, tr, td, i, counter;
    table = document.getElementById("CoursesTable");
    tr = table.getElementsByTagName("tr");
    counter = 0;
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
          tr[i].style.display = "";
          counter++;
        } else {
          tr[i].style.display = "none";
        }
      }
    }

    if (this.state.counter !== counter) {
      this.setState(
        {
          counter: counter
        },
        () => {
          this.props.count(this.state.counter);
        }
      );
    }
  }

  render() {
    const { dispatch, loading } = this.props;
    const { data } = this.props.course;

    return (
      <div>
        {data ? (
          <table id="CoursesTable" className="table__data">
            <thead>
              <tr>
                <th>Kurssitunnus</th>
                <th>Kurssinimi</th>
                <th className="hideInMobile">Op</th>
                <th className="hideInMobile">Ohjelma</th>
                <th className="hideInMobile">Toimipiste</th>
                <th className="hideInMobile">Alkaa</th>
              </tr>
            </thead>
            <tbody id="tbody">
              {data.map((kurssi, i) => (
                <tr key={i}>
                  <td className="nowrap">
                    <a
                      href="#moreinfo"
                      onClick={() =>
                        dispatch(modalActions.openCourseModal(kurssi))
                      }
                    >
                      {kurssi.opintotunnus}
                    </a>
                  </td>
                  <td>{kurssi.kurssinimi}</td>
                  <td className="hideInMobile">{kurssi.opintopisteet}</td>
                  <td className="hideInMobile">{kurssi.ohjelma}</td>
                  <td className="hideInMobile">{kurssi.toimipiste}</td>
                  <td className="hideInMobile">
                    {new Date(kurssi.alkaa).toLocaleDateString("fi-FI", {
                      timeZone: "UTC"
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="sweet-loading">
            <ScaleLoader color={"#0056b3"} size={100} loading={loading} />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { course } = state;
  return {
    course
  };
}

const connectedDataTable = connect(mapStateToProps)(DataTable);
export { connectedDataTable as DataTable };

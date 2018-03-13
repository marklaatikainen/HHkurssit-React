import React, { Component } from "react";
import { connect } from "react-redux";
import { ScaleLoader } from "react-spinners";

import { FilterModal } from "../_components";
import { modalActions, optionActions } from "../_actions";
import { CourseModal } from "../_components";

class ShowAllPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: null
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;

    dispatch(optionActions.getList());
    dispatch(modalActions.openFilterModal());
  }

  courseFilter() {
    // Declare variables
    let filter, table, tr, td, i;
    filter = document.getElementById("search");
    table = document.getElementById("CoursesTable");
    tr = table.getElementsByTagName("tr");
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        if (
          td.innerHTML.toUpperCase().indexOf(filter.value.toUpperCase()) > -1
        ) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  render() {
    const { dispatch } = this.props;
    const { data, loading } = this.props.course;

    return (
      <div>
        <div>
          <div className="search_container--filter">
            <div className="search_container--filter--group">
              <input
                id="search"
                name="search"
                className="search_container--filter--input"
                onKeyUp={e => this.courseFilter()}
                placeholder="Hae kurssia.."
                type="text"
              />
              <span className="search_container--filter--input-addon">
                <a
                  className="filter-open"
                  href="#modal"
                  onClick={() => dispatch(modalActions.openFilterModal())}
                >
                  <i className="fa fa-ellipsis-v" />
                </a>
              </span>
            </div>
            <FilterModal />
          </div>
          <small>
            <i>hakuehdoilla löytyi {this.state.count} kurssia</i>
          </small>
          <br />
          <div>
            {data ? (
              <table id="CoursesTable" className="table__data">
                {this.state.count !== data.length &&
                  this.setState({ count: data.length })}
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
          <CourseModal />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { modal, course, option } = state;
  return {
    modal,
    course,
    option
  };
}

const connectedShowAllPage = connect(mapStateToProps)(ShowAllPage);
export { connectedShowAllPage as ShowAllPage };

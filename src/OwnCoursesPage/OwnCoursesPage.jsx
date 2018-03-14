import React, { Component } from "react";
import { connect } from "react-redux";
import { ScaleLoader } from "react-spinners";
import { CourseModal } from "../_components";

import { ownActions, modalActions } from "../_actions";

class OwnCoursesPage extends Component {
  componentDidMount() {
    this.props.dispatch(ownActions.getOwnCourses());
  }

  render() {
    const { data, loading } = this.props.own;
    const { dispatch } = this.props;
    return (
      <div>
        <h5>Omat kurssit</h5>
        {data ? (
          <div>
            <div className="form-content">
              <table id="CoursesTable" className="table table-sm col-md-12">
                <thead>
                  <tr>
                    <th className="nowrap">Kurssitunnus</th>
                    <th>Kurssinimi:</th>
                    <th>Poista</th>
                  </tr>
                </thead>
                <tbody>
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
                      <td>
                        <button
                          className="btn__delete"
                          id={kurssi.opintotunnus}
                          onClick={event =>
                            dispatch(
                              ownActions.deleteCourse(event.target.id)
                            )
                          }
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
              <button
                className="btn__restore"
                onClick={() => dispatch(ownActions.restoreDefaults())}
              >
                Palauta alkuperäiset
              </button>
            </div>
            <CourseModal />
          </div>
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
  const { own } = state;
  return {
    own
  };
}

const connectedOwnCoursesPage = connect(mapStateToProps)(OwnCoursesPage);
export { connectedOwnCoursesPage as OwnCoursesPage };

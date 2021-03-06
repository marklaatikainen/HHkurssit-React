import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";

import { modalActions, ownActions } from "../../_actions";

Modal.setAppElement("#root");

class CourseModal extends Component {
  render() {
    const { course_open, course } = this.props.modal;
    const { dispatch } = this.props;
    return (
      <Modal
        isOpen={course_open}
        onRequestClose={() => dispatch(modalActions.closeCourseModal())}
        contentLabel="Kurssin tiedot"
        className="modal CourseModal"
        overlayClassName="modal--overlay"
      >
        {course !== undefined && (
          <div className="modal-content">
            <div className="modal-body">
              <table className="coursemodal__table" id="showTable">
                <tbody>
                  <tr>
                    <th>Kurssi:</th>
                    <td className="table-control">
                      <b>{course.kurssinimi}</b>
                    </td>
                  </tr>
                  <tr>
                    <th>Opintotunnus:</th>
                    <td className="table-control">{course.opintotunnus}</td>
                  </tr>
                  <tr>
                    <th>Ala:</th>
                    <td className="table-control">
                      {course.ala_fin}/{course.ala_en}
                    </td>
                  </tr>
                  <tr>
                    <th>Opettajat:</th>
                    <td className="table-control">
                      <ul className="ope-list">
                        {course.opettaja != null ? (
                          course.opettaja.map((ope, i) => {
                            return (
                              <li key={i}>
                                {ope.ope_etunimi + " " + ope.ope_sukunimi}
                              </li>
                            );
                          })
                        ) : (
                          <li>Opettaja puuttuu</li>
                        )}
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <th>Ohjelma:</th>
                    <td className="table-control">{course.ohjelma}</td>
                  </tr>
                  <tr>
                    <th>Opetuskieli:</th>
                    <td className="table-control">{course.opetuskieli}</td>
                  </tr>
                  <tr>
                    <th>Opintopisteet:</th>
                    <td className="table-control">{course.opintopisteet}</td>
                  </tr>
                  <tr>
                    <th>Toimipiste:</th>
                    <td className="table-control">{course.toimipiste}</td>
                  </tr>
                  <tr>
                    <th>Alkaa:</th>
                    <td className="table-control">
                      {new Date(course.alkaa).toLocaleDateString("fi-FI", {
                        timeZone: "UTC"
                      })}
                    </td>
                  </tr>
                  <tr>
                    <th>Päättyy:</th>
                    <td className="table-control">
                      {new Date(course.paattyy).toLocaleDateString("fi-FI", {
                        timeZone: "UTC"
                      })}
                    </td>
                  </tr>
                  <tr>
                    <th>Kurssi-info:</th>
                    <td className="table-control">
                      <a target="_BLANK" href={course.linkki}>
                        Opinto-opas
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <MuiThemeProvider>
                <RaisedButton
                  label="Lisää omiin"
                  id={course.opintotunnus}
                  onClick={e => dispatch(ownActions.addCourse(e.target.id))}
                  type="submit"
                  primary={true}
                  buttonStyle={{ backgroundColor: "#A4C639" }}
                  style={buttonStyle}
                />
                <RaisedButton
                  label="Takaisin listaan"
                  onClick={() => dispatch(modalActions.closeCourseModal())}
                  type="submit"
                  primary={true}
                  style={buttonStyle}
                />
              </MuiThemeProvider>
            </div>
          </div>
        )}
      </Modal>
    );
  }
}

const buttonStyle = {
  marginLeft: 10,
  marginTop: 20,
  marginBottom: 25,
  width: "45%"
};

function mapStateToProps(state) {
  const { modal } = state;
  return {
    modal
  };
}

const connectedCourseModal = connect(mapStateToProps)(CourseModal);
export { connectedCourseModal as CourseModal };

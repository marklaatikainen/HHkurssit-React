import React, { Component } from "react";
import { updateCourse } from "../services/WebService";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default class CourseModal extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({ modalIsOpen: false }, () => {
      this.props.closeCourseModal();
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ modalIsOpen: nextProps.CourseModalIsOpen() });
  }

  handleCourseUpdate(e) {
    updateCourse(e.target.id, kurssi => {
      alert("Kurssi lisätty!");
    });
  }

  render() {
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        contentLabel="Kurssin tiedot"
        className="modal CourseModal"
        overlayClassName="modal--overlay"
      >
        <div className="modal-content">
          {/* <div id="icons" className="modal-header">
            <h4 className="modal-title">{this.props.data.kurssinimi}</h4>
          </div> */}
          <div className="modal-body">
            <table className="coursemodal__table" id="showTable">
              <tbody>
                <tr>
                  <th>Kurssi:</th>
                  <td className="table-control">
                    <b>{this.props.data.kurssinimi}</b>
                  </td>
                </tr>
                <tr>
                  <th>Opintotunnus:</th>
                  <td className="table-control">
                    {this.props.data.opintotunnus}
                  </td>
                </tr>
                <tr>
                  <th>Ala:</th>
                  <td className="table-control">
                    {this.props.data.ala_fin}/{this.props.data.ala_en}
                  </td>
                </tr>
                <tr>
                  <th>Opettajat:</th>
                  <td className="table-control">
                    <ul className="ope-list">
                      {this.props.data.opettaja != null ? (
                        this.props.data.opettaja.map((ope, i) => {
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
                  <td className="table-control">{this.props.data.ohjelma}</td>
                </tr>
                <tr>
                  <th>Opetuskieli:</th>
                  <td className="table-control">
                    {this.props.data.opetuskieli}
                  </td>
                </tr>

                <tr>
                  <th>Opintopisteet:</th>
                  <td className="table-control">
                    {this.props.data.opintopisteet}
                  </td>
                </tr>
                <tr>
                  <th>Toimipiste:</th>
                  <td className="table-control">
                    {this.props.data.toimipiste}
                  </td>
                </tr>
                <tr>
                  <th>Alkaa:</th>
                  <td className="table-control">
                    {new Date(this.props.data.alkaa).toLocaleDateString(
                      "fi-FI",
                      {
                        timeZone: "UTC"
                      }
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Päättyy:</th>
                  <td className="table-control">
                    {new Date(this.props.data.paattyy).toLocaleDateString(
                      "fi-FI",
                      { timeZone: "UTC" }
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Kurssi-info:</th>
                  <td className="table-control">
                    <a target="_BLANK" href={this.props.data.linkki}>
                      Opinto-opas
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button
              id={this.props.data.opintotunnus}
              onClick={event => this.handleCourseUpdate(event)}
              className="btn__bs btn__modal--add grid-2"
            >
              Lisää omiin
            </button>
            <button
              className="btn__bs btn__modal--close grid-2"
              onClick={() => this.closeModal()}
            >
              Takaisin listaan
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

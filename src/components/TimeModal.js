import React, { Component } from "react";
import Modal from "react-modal";

export default class TimeModal extends Component {
  constructor() {
    super();

    this.state = {
      ModalIsOpen: false
    };
  }

  openModal() {
    this.setState({ ModalIsOpen: true }, () => {
      document.body.classList.add("no-overflow");
    });
  }

  componentDidMount() {
    this.setState({
      ModalIsOpen: false
    });
  }

  componentWillReceiveProps() {
    console.log(this.props.openModal);
    this.setState({
      ModalIsOpen: this.props.openModal
    });
  }

  closeModal() {
    this.setState(
      {
        ModalIsOpen: false
      },
      () => {
        document.body.classList.remove("no-overflow");
      }
    );
  }

  render() {
    return (
      <Modal
        isOpen={this.state.ModalIsOpen}
        onRequestClose={this.closeModal}
        contentLabel="Aikataulut"
        // className="CourseModal"
        // overlayClassName="CourseModal--overlay"
      >
        <div className="modal-body" />
        <div className="modal-footer">
          <button
            className="btn__modal--close"
            onClick={() => this.closeModal()}
          >
            Takaisin
          </button>
        </div>
      </Modal>
    );
  }
}

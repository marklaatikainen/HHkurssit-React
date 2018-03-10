import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";

import { Calendar } from "../Calendar";
import { modalActions } from "../../_actions";

Modal.setAppElement("#root");

class TimeModal extends Component {
  render() {
    const { dispatch } = this.props;
    const { time_open, time } = this.props.modal;
    return (
      <Modal
        isOpen={time_open}
        onRequestClose={() => dispatch(modalActions.closeTimeModal())}
        contentLabel="Aikataulut"
        className="modal TimeModal"
        overlayClassName="modal--overlay"
      >
        {time && (
          <div className="modal-body">
            <Calendar calendarData={time} />
          </div>
        )}
        <div className="modal-footer">
          <button
            className="btn__bs btn__modal--close"
            onClick={() => dispatch(modalActions.closeTimeModal())}
          >
            Takaisin
          </button>
        </div>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  const { modal } = state;
  return {
    modal
  };
}

const connectedTimeModal = connect(mapStateToProps)(TimeModal);
export { connectedTimeModal as TimeModal };

import React, { Component } from "react";
import { connect } from "react-redux";
import { FilterModal } from "../_components";
import { modalActions } from "../_actions";

class FilterInput extends Component {
  filterText(e) {
    const input = document.getElementById("search");
    this.props.text(input.value);
  }

  render() {
    const { dispatch } = this.props;
    return (
      <div className="search_container--filter">
        <div className="search_container--filter--group">
          <input
            id="search"
            name="search"
            className="search_container--filter--input"
            onKeyUp={e => this.filterText(e)}
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
    );
  }
}

function mapStateToProps(state) {
  const { course } = state;
  return {
    course
  };
}

const connectedFilterInput = connect(mapStateToProps)(FilterInput);
export { connectedFilterInput as FilterInput };

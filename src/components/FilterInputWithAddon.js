import React, { Component } from "react";

export default class FilterInputWithAddon extends Component {
  handleInput() {
    let input = document.getElementById("search");
    this.props.filterText(input.value);
  }

  handleFilterOpening() {
    this.props.openFilterModal();
  }

  render() {
    return (
      <div className="search_container--filter">
        <div className="search_container--filter--group">
          <input
            id="search"
            name="search"
            className="search_container--filter--input"
            onKeyUp={() => this.handleInput()}
            placeholder="Hae kurssia.."
            type="text"
          />
          <span className="search_container--filter--input-addon">
            <a
              className="filter-open"
              href="#modal"
              onClick={() => this.handleFilterOpening()}
            >
              <i className="fa fa-ellipsis-v" />
            </a>
          </span>
        </div>
        <br />
      </div>
    );
  }
}

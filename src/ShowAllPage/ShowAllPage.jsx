import React, { Component } from "react";

import { CourseModal, DataTable, FilterInput } from "../_components";

export class ShowAllPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      count: 0
    };
  }

  render() {
    return (
      <div>
        <div>
          <FilterInput text={f => this.setState({ text: f })} />
          <small>
            <i>hakuehdoilla löytyi {this.state.count} kurssia</i>
          </small>
          <br />
          <DataTable
            count={c => this.setState({ count: c })}
            fltr={this.state.text}
          />
          <CourseModal />
        </div>
      </div>
    );
  }
}

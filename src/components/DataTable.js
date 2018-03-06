import React, { Component } from "react";

export default class DataTable extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      filteredData: [],
      filterText: "",
      counter: 0
    };
  }

  componentDidMount() {
    this.setData();
  }

  componentWillReceiveProps(nextProps) {
    this.setData();
    if (nextProps !== this.props) {
      this.setFilter();
    }
  }

  setFilter() {
    this.setState(
      {
        filterText: this.props.filterText
      },
      () => {
        this.courseFilter();
      }
    );
  }

  selectCourse(kurssi) {
    this.props.selectCourse(kurssi);
  }

  setData() {
    this.setState(
      {
        filteredData: this.props.data
      },
      () => {
        if (this.state.filteredData !== []) {
          this.setState({
            loading: false
          });
        }
      }
    );
  }

  courseFilter() {
    // Declare variables
    let filter, table, tr, td, i, counter;
    filter = this.state.filterText.toUpperCase();
    table = document.getElementById("filterCoursesTable");
    tr = table.getElementsByTagName("tr");
    counter = 0;
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
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
          this.props.counter(counter);
        }
      );
    }
  }

  render() {
    return (
      <table id="filterCoursesTable" className="table table__data--allcourses">
        <thead>
          <tr>
            <th>Kurssitunnus</th>
            <th>Kurssinimi:</th>
            <th className="hideInMobile">Op</th>
            <th className="hideInMobile">Ohjelma</th>
            <th className="hideInMobile">Toimipiste</th>
            <th className="hideInMobile">Alkaa</th>
          </tr>
        </thead>
        <tbody>
          {this.state.filteredData.map((kurssi, i) => (
            <tr key={i}>
              <td className="nowrap">
                <a href="#moreinfo" onClick={() => this.selectCourse(kurssi)}>
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
    );
  }
}

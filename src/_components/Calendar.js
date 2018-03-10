import React, { Component } from "react";

export class Calendar extends Component {
  componentDidMount() {
    const { calendarData } = this.props;

    createGrid(calendarData);
  }

  render() {
    return <div className="calendar" id="calendarDiv" />;
  }
}

function createGrid(data) {
  // list for weekdays
  let days = [
    "",
    "Maanantai",
    "Tiistai",
    "Keskiviikko",
    "Torstai",
    "Perjantai"
  ];
  // list for times
  let times = [
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00"
  ];

  let doc = document.getElementById("calendarDiv");
  doc.innerHTML = "";
  doc.className = "clearfix";

  // create headers
  let headerRow = document.createElement("div");
  headerRow.className = "headerRow clearfix";

  // create and add header rows with days
  for (let d = 0; d < days.length; d++) {
    let header = document.createElement("div");
    header.className = "day";
    header.innerText = days[d];
    headerRow.appendChild(header);
  }
  doc.appendChild(headerRow);

  let canvas = document.createElement("div");
  canvas.className = "canvas";
  canvas.id = "canvas";

  // create columns
  for (let j = 0; j < 6; j++) {
    let col = document.createElement("div");
    col.className =
      j === 0 ? "column column--time clearfix" : "column clearfix";
    // create cells
    for (let i = 0; i < 13; i++) {
      let cell = document.createElement("div");
      cell.className = "cell";
      // add times to calendar
      if (j === 0) {
        cell.innerHTML = times[i];
        cell.className = "time";
      }
      col.appendChild(cell);
    }
    j === 0 ? doc.appendChild(col) : canvas.appendChild(col);
  }

  doc.appendChild(canvas);
  // get calendar data
  createEvents(data);
}

function createEvents(data) {
  let doc = document.getElementById("canvas");
  // Loop data
  for (let d = 0; d < data.length; d++) {
    if (typeof data[d].str !== "undefined" && data[d].str !== "") {
      let strDiv = document.createElement("div");
      strDiv.className = "strDiv";
      let strcont =
        "<p>" +
        data[d].id +
        "</p><p>" +
        data[d].name +
        "</p><br><i>" +
        data[d].str +
        "</i>";
      strDiv.innerHTML = strcont;
      doc.appendChild(strDiv);
    } else {
      // Loop schedule
      for (let s = 0; s < data[d].time.length; s++) {
        let ev = document.createElement("div");
        ev.className = "event";
        // text content for each event
        let cont =
          "<i>" +
          data[d].id +
          "</i><p>" +
          data[d].name +
          "</p>" +
          data[d].time[s].substring(4, 9) +
          " - " +
          data[d].time[s].substring(10, 15);
        // add content to event div
        ev.innerHTML = cont;
        // get starting position
        ev.style.top = getPosition(data[d].time[s].substring(4, 9)) + "px";
        // get horizontal position of day
        ev.style.left = getDay(data[d].time[s].substring(0, 3)) + "%";
        // get event height
        ev.style.height =
          getDuration(
            data[d].time[s].substring(4, 9),
            data[d].time[s].substring(10, 15)
          ) + "px";
        // add event to the grid
        doc.appendChild(ev);
      }
    }
  }
}

function getPosition(startTime) {
  // at 08:00 vertical position is 0
  let begin = 0;
  let beginDate = new Date();
  beginDate.setHours(8);
  beginDate.setMinutes(0);
  // 34px is height of one hour. Dividing it for minutes.
  let addMinutes = 34 / 60;
  let sDate = new Date();
  let s = startTime.split(":");
  sDate.setHours(s[0]);
  sDate.setMinutes(s[1]);

  // calculate difference between starting time and 08:00
  let elapsed = sDate - beginDate; // time in milliseconds
  // convert result to minutes
  let difference = new Date(Math.floor(elapsed / 60000));

  // calculate event's vertical starting position
  let startPosition = begin + difference * addMinutes;
  return startPosition;
}

function getDay(day) {
  // get event horizontal starting position in % for each day
  if (day === "Mon") {
    return 0;
  } else if (day === "Tue") {
    return 20;
  } else if (day === "Wed") {
    return 40;
  } else if (day === "Thu") {
    return 60;
  } else if (day === "Fri") {
    return 80;
  } else {
    return;
  }
}

function getDuration(startTime, endTime) {
  // height of one cell divided to minutes
  let h = 33 / 60;
  // convert start time to Date()
  let sDate = new Date();
  let s = startTime.split(":");
  sDate.setHours(s[0]);
  sDate.setMinutes(s[1]);
  // same with end time
  let eDate = new Date();
  let e = endTime.split(":");
  eDate.setHours(e[0]);
  eDate.setMinutes(e[1]);

  // calculate time difference in milliseconds
  let elapsed = eDate - sDate; // time in milliseconds
  // convert milliseconds to minutes
  let difference = new Date(Math.floor(elapsed / 60000));
  // multiply minutes by cell height and you get event height
  let duration = difference * h;

  return duration;
}

import { courseService } from "../_services";

export const modalService = {
  filterData
};

function filterData(filters) {
  let filtered = [];

  let res = courseService.getAllCourses().then(
    data => {
      data.map(course => {
        // muokataan vähän tyhjiä kenttiä
        course = premodify(course);
        // lista kursseista, jotka sisältyvät valittuihin periodeihin
        let timedList = timings(filters.selectedTimings, course);

        timedList.map(c => {
          if (
            // haetaan opetuskielet
            (filters.selectedLanguages.includes(c.opetuskieli.toLowerCase()) ||
              c.opetuskieli === "") &&
            // haetaan toimipisteet
            (filters.selectedCampuses.includes(c.toimipiste.toLowerCase()) ||
              c.toimipiste === "") &&
            // haetaan suoritustapa
            filters.selectedMethods.includes(c.suoritustapa.toLowerCase()) &&
            // haetaan koulutusohjelmat
            (filters.selectedPrograms.includes(c.ohjelma) ||
              c.ohjelma === "") &&
            // haetaan valitut kurssityypit
            filters.selectedTypes.includes(c.type)
          ) {
            filtered.push(c);
          }
          return filtered;
        });
        return filtered;
      });
      return filtered;
    },
    error => {
      Promise.reject(error);
    }
  );
  return res;
}

function premodify(course) {
  course.type = course.ilta ? "ilta" : "paiva";
  course.suoritustapa =
    course.suoritustapa === "" ? "lahi" : course.suoritustapa;
  course.suoritustapa =
    course.suoritustapa === "ETÄ" ? "eta" : course.suoritustapa;

  if (
    typeof course.ajoitukset === "string" &&
    course.ajoitukset !== undefined &&
    course.ajoitukset !== null &&
    course.ajoitukset.length > 0
  ) {
    course.ajoitukset = course.ajoitukset.split(",");
    for (var a = 0; a < course.ajoitukset.length; a++) {
      course.ajoitukset[a] = parseInt(course.ajoitukset[a], 0);
    }
  } else if (typeof course.ajoitukset !== "object") {
    course.ajoitukset = [];
  }
  return course;
}

function timings(selectedTimings, course) {
  let list = [];
  // @TODO : Näyttää vain yhden periodin mikäli yksi valittuna
  if (JSON.stringify(selectedTimings) === JSON.stringify([1, 2, 3])) {
    list.push(course);
  } else if (JSON.stringify(selectedTimings) === JSON.stringify([1, 2])) {
    if (
      !course.ajoitukset.includes(3) &&
      !course.ajoitukset.includes(4) &&
      !course.ajoitukset.includes(5) &&
      !course.ajoitukset.includes(6)
    ) {
      list.push(course);
    }
  } else if (JSON.stringify(selectedTimings) === JSON.stringify([3])) {
    if (
      course.ajoitukset.includes(3) ||
      course.ajoitukset.includes(4) ||
      course.ajoitukset.includes(5) ||
      course.ajoitukset.includes(6)
    ) {
      list.push(course);
    }
  } else {
    if (JSON.stringify(selectedTimings) === JSON.stringify([1])) {
      if (course.ajoitukset.includes(1)) {
        list.push(course);
      }
    } else if (JSON.stringify(selectedTimings) === JSON.stringify([2])) {
      if (course.ajoitukset.includes(2)) {
        list.push(course);
      }
    }
  }
  return list;
}

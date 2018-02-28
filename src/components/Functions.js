import decode from "jwt-decode";

export function logout() {
  localStorage.removeItem("authorization_token");
  window.location.replace("/login");
}

export function setToken(authorization_Token) {
  // Saves user token to localStorage
  localStorage.setItem("authorization_token", authorization_Token);
  window.location.replace("/");
}

export function getToken() {
  // Retrieves the user token from localStorage
  return localStorage.getItem("authorization_token");
}

export function getProfile() {
  // Using jwt-decode npm package to decode the token
  return decode(getToken());
}

export function loggedIn() {
  // Checks if there is a saved token and it's still valid
  const token = getToken(); // Getting token from localstorage
  return !!token && !isTokenExpired(token);
}

export function isTokenExpired(token) {
  try {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      // Checking if token is expired.
      localStorage.removeItem("authorization_token");
      return true;
    } else return false;
  } catch (err) {
    return false;
  }
}

export function filterCourses(state) {
  let filtered = [];

  state.data.map(course => {
    // muokataan vähän tyhjiä kenttiä
    course = premodify(course);
    // lista kursseista, jotka sisältyvät valittuihin periodeihin
    let timedList = timings(state.selectedTimings, course);

    timedList.map(c => {
      if (
        // haetaan opetuskielet
        (state.selectedLanguages.includes(c.opetuskieli.toLowerCase()) ||
          c.opetuskieli === "") &&
        // haetaan toimipisteet
        (state.selectedCampuses.includes(c.toimipiste.toLowerCase()) ||
          c.toimipiste === "") &&
        // haetaan suoritustapa
        state.selectedMethods.includes(c.suoritustapa.toLowerCase()) &&
        // haetaan koulutusohjelmat
        (state.selectedPrograms.includes(c.ohjelma) || c.ohjelma === "") &&
        // haetaan valitut kurssityypit
        state.selectedTypes.includes(c.type)
      ) {
        filtered.push(c);
      }
      return filtered;
    });
    return filtered;
  });
  return filtered;
}

export function premodify(course) {
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

export function timings(selectedTimings, course) {
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

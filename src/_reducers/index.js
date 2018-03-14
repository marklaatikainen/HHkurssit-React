import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { users } from "./users.reducer";
import { course } from "./course.reducer";
import { settings } from "./settings.reducer";
import { modal } from "./modal.reducer";
import { filter } from "./filter.reducer";
import { snackbar } from "./snackbar.reducer";
import { time } from "./time.reducer";
import { option } from "./option.reducer";
import { own } from "./own.reducer";

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  course,
  filter,
  modal,
  settings,
  snackbar,
  time,
  option,
  own
});

export default rootReducer;

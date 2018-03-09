import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { users } from "./users.reducer";
import { course } from "./course.reducer";
import { alert } from "./alert.reducer";
import { modal } from "./modal.reducer";
import { filter } from "./filter.reducer";

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  course,
  filter,
  modal,
  alert
});

export default rootReducer;

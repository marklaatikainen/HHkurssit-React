import { filterConstants } from "../_constants";

export const filterActions = {
  setFilterInput
};

function setFilterInput(text) {
  return dispatch => {
    dispatch(setFilter(text));
  };

  function setFilter(text) {
    return { type: filterConstants.SET_FILTER_TEXT, text };
  }
}

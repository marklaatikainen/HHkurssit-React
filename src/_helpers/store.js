import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../_reducers";

const loggerMiddleware = createLogger({
    level: 'error',
});

export const store =
  process.env.NODE_ENV !== "production"
    ? createStore(
        rootReducer,
        applyMiddleware(thunkMiddleware, loggerMiddleware)
      )
    : createStore(rootReducer, applyMiddleware(thunkMiddleware));

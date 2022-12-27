import loadingReducer from "./isLodaing";
import { combineReducers } from "redux";
import propertiesReducer from "./properties";
import importedRows from "./importedRows";
import progress from "./progress";
import clipboard from "./clipboard";
import user from "./user";
import sidebar from "./sidebar";

const rootReducers = combineReducers({
  loading: loadingReducer,
  properties: propertiesReducer,
  importedRows,
  progress,
  clipboard,
  user,
  sidebar,
});

export default rootReducers;

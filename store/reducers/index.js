import { combineReducers } from "redux";
import { reducer as network } from "react-native-offline";

const rootReducer = combineReducers({
  network,
});

export default rootReducer;

import { createStore, applyMiddleware } from "redux";
import { createNetworkMiddleware } from "react-native-offline";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import rootSaga from "./sagas";
import { START_WALK_ACTION_TYPE } from "./actions";

const sagaMiddleware = createSagaMiddleware();
const networkMiddleware = createNetworkMiddleware({
  actionTypes: [START_WALK_ACTION_TYPE],
  queueReleaseThrottle: 200,
});

const store = createStore(
  rootReducer,
  applyMiddleware(networkMiddleware, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
